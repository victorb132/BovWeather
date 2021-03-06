import styled, { css, keyframes } from 'styled-components';
import { Platform } from 'react-native';

export const Container = styled.View`
  flex: 1;
  max-height: ${Platform.OS === 'android' ? '70%' : '50%'};
`;

export const Card = styled.FlatList``;

export const CardItem = styled.ImageBackground`
  height: ${Platform.OS === 'android' ? '70%' : '70%'};
  width: ${props => props.boxWidth};
  border-radius: 80px;
  align-self: center;
  align-items: center;
  background-color: whitesmoke;
`;

export const CardViewItem = styled.View`
  justify-content: center;
  align-items: center;
  align-self: center;
`;

export const TextWeatherTitle = styled.Text`
  color: white;
  font-size: 30px;
  margin-top: 20px;
`;

export const TextWeatherNumber = styled.Text`
  color: white;
  font-size: 140px;
  margin-top: -20px
`;