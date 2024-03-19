import React, { FC, useEffect, useState } from "react";

import { StyleSheet } from "react-native";
import { View } from "react-native";
import { Icon, Text, TouchableRipple } from "react-native-paper";
import Card from "./card";
import { retrieveSetor } from "../../../components/utils";
import axios from "axios";
import { Resource } from "../../../httpService";

const Panel: FC<any> = ({ navigation }) => {

  const [percentageChecked, setPercentage] = useState<any>(0);
  const [totalItems, setTotalItems] = useState<any>(0);

  useEffect(() => {
    retrieveSetor()
      .then(sector => axios.get(Resource.PANEL+sector))
      .then(result => {
        setPercentage(result.data.percentage_checked);
        setTotalItems(result.data.material_qty);
      })
  }, [])

  const relatorio = {
    navigate: () => navigation.navigate('Relatorios'),
    icon: 'list-status',
    name: 'Relatório',
    detail: percentageChecked+'% conferido'
  }

  const lista = {
    navigate: () => navigation.navigate('ListaBmp'),
    icon: 'clipboard-list-outline',
    name: 'Carga',
    detail: totalItems+' itens'
  }

  const scan = {
    navigate: () => navigation.navigate('Conferencia'),
    icon: 'qrcode',
    name: 'Scan',
    detail: 'Conferir material'
  }

  return (
    < >
      <Card {...lista} />
      <Card {...relatorio} />
      <Card {...scan} />
    </ >
  )
}

export default Panel