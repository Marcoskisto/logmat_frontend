import React, { FC, useEffect, useState } from "react";
import { StyleSheet, View, Text, Image, Dimensions } from "react-native";
import logo from "../assets/images/fab-logo.png"
import AsyncStorage from "@react-native-async-storage/async-storage";


const width = Dimensions.get('screen').width
const height = Dimensions.get('screen').height


const Header: FC<any> = () => {
  const [setor, setSetor] = useState({ sigla: '', nome: '' })
  const [usuario, setUsuario] = useState({ username: '', id: '' })
  
  const getSessionData = async () => {
    const result = await AsyncStorage.getItem('session')
    const session = JSON.parse(result!)
    setSetor(session.setor)
    setUsuario(session.user)
  }

  
  useEffect(() => {getSessionData()}, [])
  
  return (
    <View style={style.header}>
      <View style={style.icon_box}>
        <Image source={logo} style={style.icon} />
      </View>
      <View style={style.identification}>
        <Text>{usuario?.username}</Text>
        <Text>{setor?.sigla} - {setor?.nome}</Text>
      </View>
    </View>
  )
}

const style = StyleSheet.create({
  header: {
    flexWrap: "wrap",
    alignItems: "flex-start",
    flexDirection: "row",
    verticalAlign: "middle",
    height: "100%"
  },

  icon_box: {
    marginHorizontal: 10,
  },

  icon: {
    flex: 1,
    aspectRatio: 1,
    resizeMode: 'contain',
  },

  identification: {
    flex: 1,
    justifyContent: "center",
    height: "100%",
  }
})

export default Header