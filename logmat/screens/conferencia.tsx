import React, { useState, useEffect, FC } from "react";
import { View, StyleSheet } from "react-native";
import { Text, Button, Card, IconButton, MD3Colors, Menu, Divider } from "react-native-paper";
import AsyncStorage from '@react-native-async-storage/async-storage';

import chairImage from '../assets/images/chair.jpeg';
import settings from '../settings';
import Select, { Item } from "../components/select";
import { NavigationProps } from "../components/utils";


interface Setor {
  id: number,
  sigla: string,
  nome: string,
}

function createSetorItems(receivedItems: Setor[]): Item[] {
  const items: Item[] = [];
  receivedItems.forEach(receivedItem => {
    items.push(
      { key: receivedItem.id, title: receivedItem.sigla }
    )
  });
  return items
}


const Conferencia: FC<NavigationProps> = ({ route, navigation }) => {

  const { bmp } = route.params;
  const [material, setMaterial] = useState<any>();
  const [items, setItems] = useState<any>();

  const [setorId, setSetorId] = useState<string | null>(null)
  const [estadoId, setEstadoId] = useState<string | null>(null)

  const estados: any = [
    { key: "1", title: "Em Uso" },
    { key: "2", title: "Em Manutenção" },
    { key: "3", title: "Invervível" }
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
    });
    navigation.navigate('Home')

  }


  const urlMaterial = `${settings.BASE_URL}/material/?n_bmp=${bmp}`
  useEffect(() => {
    
    fetch(urlMaterial, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((resp) => resp.json())
      .then(json => {console.log(json); return json})
      .then((json) => setMaterial(json.results[0]))
      .catch((error) => console.error(error))
  }, []);

  const urlSetor = `${settings.BASE_URL}/setor/`
  useEffect(() => {
    fetch(urlSetor, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((resp) => resp.json())
      .then((json) => json.results)
      .then((setores) => createSetorItems(setores))
      .then((items) => setItems(items))
      .catch((error) => console.error(error))
  }, []);
  if (material) {
    return (
      <View style={style.container}>
        <Card style={style.card}>
          <View style={style.cover}>
            <Card.Cover source={chairImage} resizeMode={`contain`} />
            <IconButton style={style.shotButton}
              icon="camera" iconColor={MD3Colors.neutralVariant70}
              onPress={() => console.log('Pressed')} />
          </View>
          <Card.Content>
            <Text style={style.label}>
              BMP: <Text>{material.n_bmp}</Text>
            </Text>
            <Text style={style.label}>
              Descrição: <Text>{material.nomenclatura} </Text>
            </Text>
            <Text style={style.label}>
              Setor: <Text>{material.setor.sigla} - {material.setor.nome}
              </Text>
            </Text>
            <Text style={style.label}>
              Serial Number: <Text>{material.n_serie}
              </Text>
            </Text>
            <Text style={style.label}>
              Valor líquido: <Text>R$ {material.vl_liquido}
              </Text>
            </Text>
            <Text style={style.label}>
              Valor atualizado: <Text>R$ {material.vl_atualizado}
              </Text>
            </Text>
          </Card.Content>
        </Card>
        <View style={style.selects}>

          <View style={style.select}>
            <Select
              items={estados}
              label="*Estado do material:"
              defaultTitle="estado..."
              returnValue={(estadoId: string | null) => setEstadoId(estadoId)}
            />
          </View>
          <View style={style.select}>
            <Select
              items={items}
              label="*Localizado em:"
              defaultTitle="localização..."
              returnValue={(setorId: string | null) => setSetorId(setorId)}
            />
          </View>
        </View>
        <View style={style.buttonAvancar}>
          <Button contentStyle={{ height: 50 }}
            mode="contained"
            icon="check"
            onPress={() => pushConferencia()}
            disabled={setorId == null || estadoId == null}
          >
            Confirma
          </Button >
        </View>
      </View >
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
  label: {
    fontWeight: "bold",
    marginVertical: 5,
    fontSize: 15
  },
  shotButton: {
    position: "absolute",
    margin: 5
  },

  card: {
    marginHorizontal: 20,
    marginVertical: 20,
  },
  selects: {
    flexDirection: "row",
    alignSelf: "center",
  },
  select: {
    marginHorizontal: 5,
  },
  buttonAvancar: {
    position: "absolute",
    bottom: 20,
    right: 20,
    alignSelf: "flex-end",
  },
})

export default Conferencia