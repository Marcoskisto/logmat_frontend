import React, { FC, useEffect, useState, } from "react";
import { StyleSheet, View } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput, Button } from "react-native-paper";
import settings from "../settings";
import { NavigationProps } from "../components/utils";

const Login: FC<NavigationProps> = ({ route, navigation }) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const urlLogin = `${settings.BASE_URL}/auth/login/`

  async function login() {

    fetch(urlLogin, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        
      },
      body: JSON.stringify({ username: username, password: password }),
    })
      .then((resp) => {
        if (resp.ok) {
          resp.json()
            .then((json) => { AsyncStorage.setItem('token', json.token) })
            .then(() => console.log('Login success'))
            .then(navigation.navigate('Home'))
        }
      })
      .catch((error) => console.error(error))
  }
  return (
    <View style={style.login}>
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
        style={style.loginButton}
        icon="login"
        mode="contained"
        onPress={async () => await login()}
      >
        Entrar
      </Button>
    </View>
  )
}

export default Login

const style = StyleSheet.create(
  {
    login: {
      alignItems: "center",
      marginVertical: "50%"
    },
    input: {
      width: "50%",
      marginVertical: 5
    },
    loginButton: {
      width: 100,
      marginVertical: 25
    }
  }
)
