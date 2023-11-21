import React, { useState, useEffect, FC } from "react";
import axios from "axios";
import { Resource } from "../../httpService";
import { View, StyleSheet, Alert } from "react-native";
import { FAB, PaperProvider, Text } from "react-native-paper";
import Select, { Item } from "../../components/select";
import BmpCard from "./bmpCard";

const Confirmacao: FC<any> = (props) => {
  const [material, setMaterial] = useState<any>();
  
  const [setorId] = useState(props.localId)
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
      <View style={style.container}>
        <BmpCard material={material} key={material?.id}/>
        <Select
          
          items={estados}
          label="*Estado do material:"
          defaultTitle="estado..."
          returnValue={(estadoId: string | null) => setEstadoId(estadoId)}
        />
        
        <FAB
          style={style.cancelButton}
          icon="close"
          onPress={() => { props.onConfirmEnd() }}
        />
        <FAB
          style={style.buttonAvancar}
          icon="check"
          label="Confirma"
          onPress={() => pushConferencia()}
          disabled={setorId == null || estadoId == null}
        />
      </View >
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
  buttonAvancar: {
    position: "absolute",
    bottom: 15,
    right: 15,
    alignSelf: "flex-end",
  },
  cancelButton: {
    position: 'absolute',
    bottom: 15,
    left: 15,
  },
})

export default Confirmacao