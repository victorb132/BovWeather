import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { purple_light, white } from '../utils/colors'

import HomePage from '../pages/Home';
import NextDays from '../pages/NextDays';

const App = createStackNavigator();

const AppRoutes = () => (
  <App.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: purple_light, shadowColor: 'transparent', shadowRadius: 0, shadowOffset: {
          height: 0,
        }, elevation: 0
      },
      headerTintColor: white,
      headerTitleStyle: {
        fontSize: 25,
        alignSelf: 'center'
      },
      cardStyle: { backgroundColor: purple_light },
    }}>
    <App.Screen name="HomePage" options={{ title: 'Bov Weather' }} component={HomePage} />
    <App.Screen name="NextDays" options={{ title: 'Próximos 7 dias' }} component={NextDays} />
  </App.Navigator>
);

export default AppRoutes;
