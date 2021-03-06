import styled from 'styled-components';
import { Platform } from 'react-native'

export const Container = styled.SafeAreaView`
  flex: 1;
  width: 100%;
`;

export const RefreshView = styled.ScrollView`
`;

export const InformationContainer = styled.View`
  flex-direction: row;
  height: ${Platform.OS === 'android' ? '16%' : '12%'};
  margin-top: ${Platform.OS === 'android' ? '-10%' : '0%'};
  background-color: #fff;
  width: 90%;
  align-self: center;
  border-radius: 20px;
  padding: 10px;
  justify-content: center;
  align-items: center;
  align-self: center;
  align-content: center;
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

export const NextView = styled.TouchableOpacity`
  flex-direction: row;
  align-self: center;
  align-items: center;
  margin-top: 30px;
`;

export const NextDays = styled.Text`
  font-size: 30px;
  color: black;
  font-weight: 300;
`;

export const ViewLoader = styled.View`
  margin-top: 100px;
  align-items: center;
`;