import React, { useState, useEffect, FC } from "react";
import axios from "axios";
import { Resource } from "../../httpService";
import { View, StyleSheet, Alert, ScrollView } from "react-native";
import { FAB, PaperProvider, Text } from "react-native-paper";
import Select, { Item } from "../../components/select";
import BmpCard from "./bmpCard";

const Confirmacao: FC<any> = (props) => {
  const [material, setMaterial] = useState<any>();

  const [setorId] = useState(props.setor.key)
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
    console.log(conferencia)

    axios.post(Resource.CONFERENCIA, conferencia)
      .then(
        (response) => {
          response.status == 201 ? props.onConfirmEnd() : Alert.alert('Erro', 'Erro ao processar.')
        })
      .catch((error) => console.error(error));
  }

  function updateMaterial(material: any) {
    if (typeof material == 'undefined') {
      Alert.alert('Erro', 'Material não encontrado');
      props.onConfirmEnd();
    } else {
      setMaterial(material)
    }
  }

  useEffect(() => {
    axios.get(Resource.MATERIAL, { params: { n_bmp: props.bmp } })
      .then((response: any) => response.data.results[0])
      .then((material) => updateMaterial(material))
      .catch((error) => console.error(error))
  }, []);

  return (
    <PaperProvider>

      <ScrollView style={style.container}>
        <BmpCard material={material} key={material?.id} />
        <View style={style.selectEstado}>
          <Select
            items={estados}
            label="*Estado do material"
            onSelect={(estado: any) => setEstadoId(estado.key)}
          />
        </View>
        <View style={style.bottonBar}>
          <FAB
            style={style.cancelButton}
            icon="close"
            label=""
            mode="flat"
            onPress={() => { props.onConfirmEnd() }}
          />
          <FAB
            style={style.buttonAvancar}
            icon="check"
            label="CONFIRMA"
            mode="flat"
            onPress={() => pushConferencia()}
            disabled={setorId == null || estadoId == null}
          />
        </View>
      </ScrollView >
    </PaperProvider>
  )
}

const style: any = StyleSheet.create({
  container: {
    height: "100%"
  },
  coverContainer: {
    display: "flex"
  },
  selectEstado: {
    alignItems: "center"
  },
  bottonBar: {
    marginTop: 30,
    marginHorizontal: 20,
    marginBottom: 10,
    flexDirection: "row"
  },
  buttonAvancar: {
    position: "absolute",
    right: 0,
    alignSelf: "flex-end",
  },
  cancelButton: {
    alignSelf: "flex-start"
  },
})

export default Confirmacao