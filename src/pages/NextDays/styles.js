import styled from 'styled-components';
import { Platform } from 'react-native';
import { purple } from '../../utils/colors';

export const ContainerCard = styled.ImageBackground`
  height: ${Platform.OS === 'android' ? '35%' : '30%'};
  width: ${Platform.OS === 'android' ? '95%' : '90%'};
  border-radius: 80px;
  align-self: center;
  align-items: center;
  background-color: #d3d3d3;
  /* padding: 10px; */
  margin-top: 10px;
`;

export const CardViewItem = styled.View`
  width: 50%;
  justify-content: center;
  align-items: flex-start;
  align-self: center;
`;

export const TextWeatherTitle = styled.Text`
  color: white;
  font-size: 30px;
  margin-top: 20px;
  align-self: center;
`;

export const TextWeatherSubTitle = styled.Text`
  color: white;
  font-size: 18px;
  align-self: center;
`;

export const TextWeatherNumber = styled.Text`
  color: white;
  font-size: 60px;
  margin-top: -10px
`;

export const ViewIcon = styled.View`
  flex-direction: row;
  margin-right: 10px;
`;

export const Container = styled.SafeAreaView`
  flex: 1;
  width: 100%;
`;

export const InformationContainer = styled.View`
  flex-direction: row;
  height: ${Platform.OS === 'android' ? '16%' : '12%'};
  background-color: #fff;
  width: 90%;
  align-self: center;
  border-radius: 20px;
  padding: 10px;
  justify-content: center;
  align-items: center;
  align-self: center;
  align-content: center;
  margin-top: 20px;
`;

export const InformationView = styled.View`
  flex: 1;
  flex-direction: column;
  align-items: center;
`;

export const InformationTitle = styled.Text`
`;

export const InformationSubtitle = styled.Text`
  font-weight: 100;
`;

export const ListWeekView = styled.View`
  width: 100%;
  justify-content: center;
  align-items: flex-start;
  align-self: center;
  align-content: center;
`;

export const RowWeekView = styled.View`
  width: 100%;
  padding-left: 35px;
  padding-right: 35px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  align-self: center;
  align-content: center;
`;

export const DayOfWeekText = styled.Text`
`;

export const ConditionText = styled.Text`
`;

export const NumberDayText = styled.Text``;

export const ViewAlign = styled.View`
  width: 40%;
  flex-direction: row;
  align-content: flex-start;
  align-items: center;
`;