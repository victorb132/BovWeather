import React, { useState, useEffect } from 'react';
import { Animated, Platform, } from 'react-native';
import Lottie from 'lottie-react-native';
import background from '../../assets/background-bov.png'

import { Container, Card, TextWeatherTitle, TextWeatherNumber, CardItem, CardViewItem } from './styles';

const MainCard = ({ currentWeather }) => {
  const [scrollViewWidth, setScrollViewWidth] = useState(0);
  const boxWidth = scrollViewWidth * 0.8;
  const boxDistance = scrollViewWidth - boxWidth;
  const halfBoxDistance = boxDistance / 2;
  const pan = React.useRef(new Animated.ValueXY()).current;

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

  const renderItem = ({ item, index }) => (
    <Animated.View
      style={{
        transform: [
          {
            scale: pan.x.interpolate({
              inputRange: [
                (index - 1) * boxWidth - halfBoxDistance,
                index * boxWidth - halfBoxDistance,
                (index + 1) * boxWidth - halfBoxDistance, // adjust positioning
              ],
              outputRange: [0.8, 1, 0.8], // scale down when out of scope
              extrapolate: 'clamp',
            }),
          },
        ],
        marginLeft: Platform.OS === 'android' && 50
      }}>
      <CardItem boxWidth={boxWidth} source={background} imageStyle={{ borderRadius: 80 }}>
        <CardViewItem>
          <TextWeatherTitle>{item.condition}</TextWeatherTitle>
          <TextWeatherNumber>{item.temperature}Cº</TextWeatherNumber>
        </CardViewItem>
      </CardItem>
      {item.icon ? <Lottie resizeMode="cover" style={{ top: Platform.OS === 'android' ? -60 : -35, left: Platform.OS === 'android' ? 40 : 28 }} autoSize source={dictICons[item.icon]} autoPlay loop /> : <></>}
    </Animated.View>
  );


  return (
    <Container>
      <Card
        horizontal
        data={[currentWeather]}
        style={{ height: 250 }}
        contentContainerStyle={{ paddingVertical: 16 }}
        contentInsetAdjustmentBehavior="never"
        snapToAlignment="center"
        decelerationRate="fast"
        automaticallyAdjustContentInsets={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={1}
        snapToInterval={boxWidth}
        contentInset={{
          left: halfBoxDistance,
          right: halfBoxDistance,
        }}
        contentOffset={{ x: halfBoxDistance * -1, y: 0 }}
        onLayout={(e) => {
          setScrollViewWidth(e.nativeEvent.layout.width);
        }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: pan.x } } }],
          {
            useNativeDriver: false,
          },
        )}
        keyExtractor={(item, index) => `${index}-${item}`}
        renderItem={renderItem}
      />

    </Container>
  );
}

export default MainCard;