import React, { useState, useEffect, FC } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Button, FAB, PaperProvider, Text } from "react-native-paper";

import settings from '../../settings';
import Select, { Item } from "../../components/select";
import BmpCard from "./bmpCard";

const Confirmacao: FC<any> = (props) => {
  const [material, setMaterial] = useState<any>();

  const [setorId, setSetorId] = useState(props.localId)
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
      conferente: 1,
      observacao: "n/a"
    }

    fetch(`${settings.BASE_URL}/conferencia/`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(conferencia),
    })
    .then(
      (response) => {
       response.ok? null: Alert.alert('Erro', 'Erro ao processar.')
      })
    .catch((error) => console.error(error));
  }

  const urlMaterial = `${settings.BASE_URL}/material/?n_bmp=${props.bmp}`
  useEffect(() => {
    fetch(urlMaterial, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    })
      .then((resp) => resp.json())
      .then((json) => setMaterial(json.results[0]))
      .catch((error) => console.error(error))
  }, []);

  if (material) {
    return (
      <PaperProvider>
        <View style={style.container}>
          
          <BmpCard material={material} />

          <View>
            <Select
              items={estados}
              label="*Estado do material:"
              defaultTitle="estado..."
              returnValue={(estadoId: string | null) => setEstadoId(estadoId)}
            />
          </View>
          <FAB 
            style={style.cancelButton} 
            icon="close"
            onPress={() => {props.onPressClose()}}
          />
          <View style={style.buttonAvancar}>
            
            <FAB
              icon="check"
              label="Confirma"
              onPress={() => pushConferencia()}
              disabled={setorId == null || estadoId == null}
            />
          </View>
        </View >
      </PaperProvider>
    )
  } else {
    return(
      <Text>Material não encontrado.</Text>
    )
  }
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