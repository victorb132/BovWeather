import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View, StatusBar } from 'react-native';

import Routes from './routes';

// import { Container } from './styles';

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor="#d1c4e9" />
      <View style={{ flex: 1, backgroundColor: '#d1c4e9' }}>
        <Routes />
      </View>
    </NavigationContainer>
  );
}
