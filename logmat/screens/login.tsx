import React, { FC, useEffect, useState, } from "react";
import { Image, StyleSheet, View } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput, Button } from "react-native-paper";
import settings from "../settings";
import { NavigationProps } from "../components/utils";
import axios from 'axios';
import logo from '../assets/images/logo.png';
import { Resource } from '../httpService'
const Login: FC<NavigationProps> = ({ route, navigation }) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  async function login() {
    axios.post(Resource.LOGIN, { username: username, password: password })
      .then((resp) => {
        if (resp.status == 200) {
          axios.defaults.headers.common['Authorization'] = `Token ${resp.data.token}`;
          AsyncStorage.setItem('user', resp.data.user);
          AsyncStorage.setItem('setor', resp.data.setor);
          navigation.navigate('Home');
        }
      })
      .catch((error) => console.error(error))
  }
  return (
    <View style={style.page}>
      <View style={style.content}>
        <Image
          source={logo}
          resizeMode={`contain`}
          style={style.logo}
        />
        <TextInput
          style={style.input}
          label="Usuário"
          value={username}
          mode="outlined"
          onChangeText={username => setUsername(username)}
        />
        <TextInput
          style={style.input}
          label="Senha"
          value={password}
          mode="outlined"
          secureTextEntry
          onChangeText={password => setPassword(password)}
        />
        <Button
          style={style.button}
          contentStyle={style.loginButton}
          icon="login"
          mode="contained"
          onPress={async () => await login()}
        >
          Entrar
        </Button>
      </View>
    </View>
  )
}

export default Login

const style = StyleSheet.create(
  {
    page: {
      backgroundColor: "#ffffff",
      height: "100%",
      width: "100%",
    },
    content: {
      alignItems: "center",
      width: "100%",
      marginVertical: "15%"
    },
    input: {
      width: "60%",
      marginVertical: 5,
      borderRadius: 50
    },
    button: {
      width: "60%",
      marginVertical: 15
    },
    loginButton: {
      width: "100%",
      marginVertical: 5,

    },
    logo: {
      width: 200,
      height: 200,
    },
  }
)
