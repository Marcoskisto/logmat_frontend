import React, { FC, useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";

import Card from "./card";
import { retrieveSetor } from "../../../components/utils";
import axios from "axios";
import { Resource } from "../../../httpService";

const Panel: FC<any> = ({ navigation }) => {

  const [percentageChecked, setPercentage] = useState<any>(0);
  const [totalItems, setTotalItems] = useState<any>(0);
  const isFocused = useIsFocused()

  useEffect(() => {
    if(isFocused){
      retrieveSetor()
        .then(sector => axios.get(Resource.PANEL+sector))
        .then(result => {
          setPercentage(result.data.percentage_checked);
          setTotalItems(result.data.material_qty);
        })
    }
  }, [isFocused])

  const relatorio = {
    navigate: () => navigation.navigate('Relatorios'),
    icon: 'list-status',
    name: 'Relatório',
    detail: percentageChecked+'% conferido'
  }

  const lista = {
    navigate: () => navigation.navigate('Lista'),
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