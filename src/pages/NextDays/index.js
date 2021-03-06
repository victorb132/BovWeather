import React, { useState, useEffect } from 'react';
import Lottie from 'lottie-react-native';
import Icon from 'react-native-vector-icons/dist/Ionicons'
import { ScrollView } from 'react-native'
import { format, getHours, parseISO } from 'date-fns'
import pt from 'date-fns/locale/pt';
import ptBr from 'date-fns/locale/pt-BR';
import AsyncStorage from '@react-native-async-storage/async-storage';

import api from '../../services/api';
import { purple } from '../../utils/colors';

import {
  Container, CardViewItem, TextWeatherTitle, TextWeatherSubTitle,
  TextWeatherNumber, ContainerCard, ViewIcon, InformationContainer, InformationTitle, InformationSubtitle,
  InformationView, ListWeekView, NumberDayText, DayOfWeekText, ConditionText, RowWeekView, ViewAlign
} from './styles';

import background from '../../assets/background-bov.png'

import { TOKEN } from "@env"

const NextDays = ({ route }) => {
  const [weatherSevenDays, setWeatherSevenDays] = useState([])
  const currentHour = getHours(Date.now());

  // Objeto para mostrar dinamicamente a animação no Lottie
  const dictICons = {
    '1': require('../../animations/1'),
    '1n': require('../../animations/1n'),

    '2': require('../../animations/2'),
    '2n': require('../../animations/2n'),
    '2r': require('../../animations/2r'),
    '2rn': require('../../animations/2rn'),

    '3': require('../../animations/3'),
    '3n': require('../../animations/3n'),

    '4': require('../../animations/4'),
    '4n': require('../../animations/4n'),
    '4r': require('../../animations/4'),
    '4rn': require('../../animations/4n'),
    '4t': require('../../animations/4t'),
    '4tn': require('../../animations/4tn'),

    '5': require('../../animations/3'),
    '5n': require('../../animations/3n'),

    '6': require('../../animations/4t'),
    '6n': require('../../animations/4tn'),

    '7': require('../../animations/8'),
    '7n': require('../../animations/8n'),

    '8': require('../../animations/8'),
    '8n': require('../../animations/8n'),

    '9': require('../../animations/9'),
    '9n': require('../../animations/9n'),
  }

  // Variavel para reconhecer o momento do dia.
  let iconDictionary = ''

  if (currentHour >= 1 && currentHour < 6) {
    iconDictionary = "dawn";
  } else if (currentHour >= 6 && currentHour < 15) {
    iconDictionary = "afternoon";
  } else if (currentHour >= 15 && currentHour < 18) {
    iconDictionary = "day";
  } else if (currentHour >= 18) {
    iconDictionary = "night";
  }

  // Função para receber os dados de 7 dias do clima.
  async function geoReferenced() {
    await api.get(`/api/v1/forecast/locale/${route.params}/days/15?token=${TOKEN}`).then(
      response => {
        // Repassa os dados para a função para salvar no AsyncStorage
        StoreSevenDaysWeather(response.data.data)
      }
    ).catch(function () {
      // Se cair no catch, chamamos a função que está armazenando os últimos dados salvos
      getSevenDaysWeather();
    })

  }

  // Função para armazenar os dados no AsyncStorage
  const StoreSevenDaysWeather = async (value) => {
    try {
      AsyncStorage.removeItem('@sevenDaysWeather')
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('@sevenDaysWeather', jsonValue)
      getSevenDaysWeather();
    } catch (e) {
      return
    }
  }

  // Função para recuperar os dados salvos na AsyncStorage
  const getSevenDaysWeather = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@sevenDaysWeather')
      const parsedData = JSON.parse(jsonValue);
      setWeatherSevenDays(parsedData)
    } catch (e) {
      return
    }
  }


  useEffect(() => {
    geoReferenced();
  }, [])

  return (
    <Container>
      <ContainerCard source={background} imageStyle={{ borderRadius: 80 }}>
        <ViewIcon>
          {weatherSevenDays.length !== 0 && <Lottie resizeMode="cover" autoSize source={dictICons[weatherSevenDays[0].text_icon.icon[iconDictionary]]} autoPlay loop />}
          <CardViewItem>
            {weatherSevenDays.length !== 0 && <TextWeatherTitle>{format(new Date(parseISO(weatherSevenDays[0].date)), 'cccc', { locale: ptBr })}</TextWeatherTitle>}
            {weatherSevenDays.length !== 0 && <TextWeatherNumber>{weatherSevenDays[0].temperature.min}/{weatherSevenDays[0].temperature.max}º</TextWeatherNumber>}
            {weatherSevenDays.length !== 0 && <TextWeatherSubTitle>{weatherSevenDays[0].text_icon.text.pt}</TextWeatherSubTitle>}
          </CardViewItem>
        </ViewIcon>
      </ContainerCard>
      <InformationContainer>
        <InformationView>
          <Icon name="leaf-outline" size={30} color={purple} />
          {weatherSevenDays.length !== 0 && <InformationTitle>{weatherSevenDays[0].wind.velocity_max} km/h</InformationTitle>}
          <InformationSubtitle>Vento</InformationSubtitle>
        </InformationView>
        <InformationView>
          <Icon name="eye-outline" size={30} color={purple} />
          {weatherSevenDays.length !== 0 && <InformationTitle>{weatherSevenDays[0].humidity.max} %</InformationTitle>}
          <InformationSubtitle>Humidade</InformationSubtitle>
        </InformationView>
        <InformationView>
          <Icon name="thermometer-outline" size={30} color={purple} />
          {weatherSevenDays.length !== 0 && <InformationTitle>{weatherSevenDays[0].temperature.max} Cº</InformationTitle>}
          <InformationSubtitle>Sensação térmica</InformationSubtitle>
        </InformationView>
      </InformationContainer>

      <ScrollView>
        {weatherSevenDays.length !== 0 && weatherSevenDays.map(
          (item, index) => {
            const dateParsed = parseISO(item.date)
            const date = format(new Date(dateParsed), 'ccc', { locale: pt })

            return (
              <ListWeekView key={index}>
                <RowWeekView>
                  <DayOfWeekText>{date}</DayOfWeekText>
                  <ViewAlign>
                    <Lottie resizeMode="cover" style={{ height: 60, width: 60 }} autoSize source={dictICons[item.text_icon.icon[iconDictionary]]} autoPlay loop />
                    <ConditionText>{item.text_icon.text.pt}</ConditionText>
                  </ViewAlign>
                  <NumberDayText>{item.temperature.min}/{item.temperature.max}º</NumberDayText>
                </RowWeekView>
              </ListWeekView>
            )
          }
        )}
      </ScrollView>
    </Container>
  )
}

export default NextDays;