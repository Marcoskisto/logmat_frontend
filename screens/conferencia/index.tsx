import React, { useState, useEffect, FC } from "react";
import { Modal, StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import Select from "../../components/select";
import { NavigationProps, createSetorItems, } from "../../components/utils";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Confirmacao from "./confirmacao";
import ScanScreen from "../scanner";
import { Resource } from "../../httpService";
import axios from "axios";

const Stack = createNativeStackNavigator();

const IniciaConferencia: FC<NavigationProps> = ({ route, navigation }) => {

  const [items, setItems] = useState<any>();
  const [setor, setSetor] = useState<any>(null)

  useEffect(() => {
    axios.get(Resource.SETOR)
      .then((response: any) => response.data.results)
      .then((setores) => createSetorItems(setores))
      .then((items) => { setItems(items) })
      .catch((error) => console.error(error))
  }, []);

  return (
    <>
      <View style={style.content}>
        <Text style={style.title}>Em que local você está?</Text>
        <View>
          <Select
            items={items}
            label="localização..."
            onSelect={(setor: string | null) => setSetor(setor)}
          />
        </View>
        <Button contentStyle={{ height: 50 }}
          style={style.buttonContinua}
          mode="contained"
          icon="check"
          onPress={() => navigation.navigate('ScanScreen', { sector: setor })}
          disabled={setor == null} >
          Continuar
        </Button >
      </View>
    </>
  )
}


const style: any = StyleSheet.create({
  content: {
    flex: 1,
    height: "100%",
    alignItems: "center",
    justifyContent: "center"

  },
  title: {
    fontSize: 30,
    marginBottom: 30
  },
  buttonContinua: {
    marginVertical: 30,
    width: "40%"
  },
})

export default IniciaConferencia;