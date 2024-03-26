import React, { useState, useEffect, FC } from "react";
import axios from "axios";
import { Resource } from "../../httpService";
import { View, StyleSheet, Alert, ScrollView } from "react-native";
import { FAB, PaperProvider } from "react-native-paper";
import Select, { Item } from "../../components/select";
import BmpCard from "./bmpCard";

const Confirmacao: FC<any> = ({ route, navigation }) => {
  const bmp: any = route.params.bmp
  const [material, setMaterial] = useState<any>();
  const [setorId] = useState(route.params.sector.key)
  const [estadoId, setEstadoId] = useState<string | null>(null)

  const estados: Item[] = [
    { key: 1, title: "Em Uso" },
    { key: 2, title: "Ocioso" },
    { key: 3, title: "Inservível" }
  ]

  function pushConferencia() {
    const conferencia = {
      localizacao: setorId,
      material: material.id,
      estado: estadoId,
      observacao: "n/a"
    }

    axios.post(Resource.CONFERENCIA, conferencia)
      .then(
        (response) => {
          navigation.navigate('Conferencia')
        })
      .catch((error) => console.error(error));
  }

  function updateMaterial(material: any) {
    if (typeof material == 'undefined') {
      Alert.alert('Erro', 'Material não encontrado');
    } else {
      setMaterial(material)
    }
  }

  useEffect(() => {
    axios.get(Resource.MATERIAL, { params: { n_bmp: bmp } })
      .then((response: any) => response.data.results[0])
      .then((material) => updateMaterial(material))
      .catch((error) => console.error(error))
  }, []);

  return (
    <PaperProvider>

      <ScrollView style={style.container}>
        <BmpCard material={material} key={material?.id} />
      </ScrollView >
      <View style={style.select}>
        <Select
          items={estados}
          label="*Estado do material"
          onSelect={(estado: any) => setEstadoId(estado.key)}
        />
      </View>
      <View style={style.bottonBar}>
        <FAB
          icon="check"
          label="CONFIRMA"
          mode="flat"
          onPress={() => pushConferencia()}
          disabled={setorId == null || estadoId == null}
        />
      </View>
    </PaperProvider>
  )
}

const style: any = StyleSheet.create({
  container: {
    height: "100%"
  },
  select: {
    alignSelf: "center",
  },

  bottonBar: {
    alignSelf: "center",
    marginTop: 10,
    marginHorizontal: 20,
    marginBottom: 10,
  },

})

export default Confirmacao