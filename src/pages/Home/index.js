import React, { useEffect, useState } from 'react';
import { PermissionsAndroid, AppState } from 'react-native';
import Icon from 'react-native-vector-icons/dist/Ionicons'
import Lottie from 'lottie-react-native';
import Geolocation from 'react-native-geolocation-service';
import { format, parseISO } from 'date-fns';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import pt from 'date-fns/locale/pt';

import { purple } from '../../utils/colors';

import { ViewLoader, Container, InformationContainer, InformationView, InformationTitle, InformationSubtitle, NextDays, NextView } from './styles';

import api from '../../services/api';
import loadBov from '../../animations/bov-loader.json'
import MainCard from '../../components/MainCard';

import { TOKEN } from "@env"

const Home = ({ navigation }) => {
  // Variaveis
  const [currentWeatherData, setCurrentWeatherData] = useState({
    date: new Date(),
    humidity: 0,
    icon: '',
    temperature: 0,
    wind_velocity: 0,
  });
  const [loading, setLoading] = useState(false)
  const [idCity, setIdCity] = useState(0)

  // Função para requisitar as permissões da location

  async function requestPermissions() {
    if (Platform.OS === 'ios') {

      // Utilizando a localização enquanto estiver em uso.
      Geolocation.requestAuthorization("whenInUse");
      Geolocation.getCurrentPosition(
        (position) => {
          getCityById(position.coords);
        },
        (error) => {

        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    }

    if (Platform.OS === 'android') {
      let granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Permissão Bov Weather",
          message: "Bov Weather precisa da sua localização para mostrar a temperatura da sua região.",
        }
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {

        Geolocation.getCurrentPosition(
          (position) => {
            getCityById(position.coords);
          },
          (error) => {

          },
          { enableHighAccuracy: false, timeout: 15000, maximumAge: 10000 }
        );

      } else {

        return

      }

    }
  }

  // Função para armazenar os dados no AsyncStorage
  const storeCurrentWeather = async (value) => {
    try {
      AsyncStorage.removeItem('@currentWeather')
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('@currentWeather', jsonValue)
    } catch (e) {
      return
    }
  }

  // Função para recuperar os dados salvos na AsyncStorage
  const getCurrentWeather = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@currentWeather')
      const parsedData = JSON.parse(jsonValue);
      setCurrentWeatherData(parsedData.data)
      handleTitle(parsedData)
    } catch (e) {
      requestPermissions();
      return
    }
  }

  // Função para mudar o titulo da navigation
  const handleTitle = (infoTitle) => {
    const cityName = infoTitle.name;
    const state = infoTitle.state;

    // Transforma a data no timezone local e transforma o dia em letras (ex: Sábado).
    const date = infoTitle.data.date
    const parsedDate = parseISO(date);
    const formatedDate = format(parsedDate, 'cccc', { locale: pt })

    navigation.setOptions({ title: `${cityName} - ${state} - ${formatedDate}` })
  }

  // Função para pegar o ID da cidade/região da localização
  async function getCityById(coordenates) {
    await api.get(`/api/v1/locale/city?latitude=${coordenates.latitude}&longitude=${coordenates.longitude}&token=${TOKEN}`).then(
      response => {
        // Caso haja sucesso na requisição os id's são repassados nas funções
        currentWeather(response.data.id);
        setIdCity(response.data.id);
      }
    ).catch(function () {
      // Se cair no catch, chamamos a função que está armazenando os últimos dados salvos
      getCurrentWeather();
    })
  }

  // Função para trazer os dados do clima atual
  async function currentWeather(id) {
    await api.get(`/api/v1/weather/locale/${id}/current?token=${TOKEN}`).then(
      response => {
        // Dando certo passamos o data para a função que salva os dados na AsyncStorage
        storeCurrentWeather(response.data)
        // Setamos os dados na state atual
        setCurrentWeatherData(response.data.data)
        // E passamos para o titulo atual
        handleTitle(response.data)
        setLoading(false);
      }
    ).catch(function () {
      // Se cair no catch, chamamos a função que está armazenando os últimos dados salvos
      getCurrentWeather()
    })
  }

  // Função para adicionar um local ao token de acesso a api.
  async function addLocalesToToken(idCity) {
    let data = new URLSearchParams();
    data.append('localeId[]', idCity)

    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }

    await api.put(`api-manager/user-token/${TOKEN}/locales`, data, config).then(
      response => {
        return response.status
      }
    )
  }

  useEffect(() => {
    setLoading(true);
    addLocalesToToken();
    requestPermissions();
  }, [])

  // Atualiza as informações quando abrir a tela.
  useFocusEffect(
    React.useCallback(() => {
      requestPermissions();
    }, [])
  );

  return (
    <Container>
      {
        loading ? (
          <ViewLoader>
            <Lottie resizeMode="contain" autoSize source={loadBov} autoPlay loop />
          </ViewLoader>
        ) : (
          <>
            <MainCard currentWeather={currentWeatherData} icon={currentWeatherData.icon} />
            <InformationContainer>
              <InformationView>
                <Icon name="leaf-outline" size={30} color={purple} />
                <InformationTitle>{currentWeatherData.wind_velocity} km/h</InformationTitle>
                <InformationSubtitle>Vento</InformationSubtitle>
              </InformationView>
              <InformationView>
                <Icon name="water-outline" size={30} color={purple} />
                <InformationTitle>{currentWeatherData.humidity}%</InformationTitle>
                <InformationSubtitle>Humidade</InformationSubtitle>
              </InformationView>
              <InformationView>
                <Icon name="thermometer-outline" size={30} color={purple} />
                <InformationTitle>{currentWeatherData.sensation} Cº</InformationTitle>
                <InformationSubtitle>Sensação térmica</InformationSubtitle>
              </InformationView>
            </InformationContainer>
            <NextView onPress={() => { navigation.navigate('NextDays', idCity) }} >
              <NextDays>Próximos 7 dias </NextDays>
              <Icon name="arrow-forward-outline" size={30} />
            </NextView>
          </>
        )
      }
    </Container>
  )
}

export default Home;
