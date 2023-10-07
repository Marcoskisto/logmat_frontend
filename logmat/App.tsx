/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  StatusBar,
  StyleSheet,
} from 'react-native';


import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './screens/home';
import ScanScreen from './screens/scanner';
import ListaBmp from './screens/listaBmp';
import Conferencia from './screens/conferencia';

const Stack = createNativeStackNavigator();

// library.add(fab, faSearch, faQrcode)

function App(): JSX.Element {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Stack.Screen name="ScanScreen" component={ScanScreen} />
      <Stack.Screen name="ListaBmp" component={ListaBmp} />
      <Stack.Screen name="Conferencia" component={Conferencia} />
    </Stack.Navigator>
    <StatusBar />
  </NavigationContainer>
  );
}

const styles = StyleSheet.create({

});

export default App;
