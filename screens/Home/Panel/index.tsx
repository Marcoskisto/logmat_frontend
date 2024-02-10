import React, { FC } from "react";

import { StyleSheet } from "react-native";
import { View } from "react-native";
import { Icon, Text, TouchableRipple } from "react-native-paper";
import Card from "./card";

const Panel: FC<any> = ({ navigation }) => {
  const relatorio = {
    navigate: () => navigation.navigate('Relatorios'),
    icon: 'list-status',
    name: 'Relatório',
    detail: '80% conferido'
  }

  const lista = {
    navigate: () => navigation.navigate('ListaBmp'),
    icon: 'clipboard-list-outline',
    name: 'Carga',
    detail: '2143 itens'
  }

  const scan = {
    navigate: () => navigation.navigate('Conferencia'),
    icon: 'qrcode',
    name: 'Scan',
    detail: 'Conferir material'
  }

  return (
    < >
      <Card {...lista}/>
      <Card {...relatorio}/>
      <Card {...scan} />
    </ >
  )
}

export default Panel