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

import Login from './screens/login'
import Home from './screens/Home';
import ScanScreen from './screens/scanner';
import ListaBmp from './screens/listaBmp';
import Relatorios from './screens/relatorios';
import Conferencia from './screens/conferencia';

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" options={{headerShown: false}} component={Login} />
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="ScanScreen" component={ScanScreen} />
        <Stack.Screen name="Conferencia" component={Conferencia} />
        <Stack.Screen name="ListaBmp" component={ListaBmp} />
        <Stack.Screen name="Relatorios" component={Relatorios} />
      </Stack.Navigator>
      <StatusBar />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({

});

export default App;
