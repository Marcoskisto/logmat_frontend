import React, { useState, useEffect } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { Text, Button, Card, IconButton, MD3Colors, Menu, Divider } from "react-native-paper";

import chairImage from '../assets/chair.jpeg';
import settings from '../settings';

export default function Conferencia({ route, navigation }) {

  const { bmp } = route.params;
  const [material, setMaterial] = useState();
  const [items, setItems] = useState();

  const [setor, setSetor] = useState({ id: null, sigla: "obrigatório..." });
  const [visible, setVisible] = React.useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);


  const urlMaterial = `${settings.BASE_URL}/material/?n_bmp=${bmp}`
  useEffect(() => {
    fetch(urlMaterial)
      .then((resp) => resp.json())
      .then((json) => setMaterial(json.results[0]))
      .catch((error) => console.error(error))
  }, []);

  const urlSetor = `${settings.BASE_URL}/setor/`
  useEffect(() => {
    fetch(urlSetor)
      .then((resp) => resp.json())
      .then((json) => setItems(json.results))
      .catch((error) => console.error(error))
  }, []);

  if (material) {
    return (
      <View style={style.container}>
        <Card style={style.card}>
          <View sytle={style.cover}>
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
        <View style={style.selectContainer}>
          <Text>*Onde encontrou este material?</Text>
          <Menu
            visible={visible}
            onDismiss={closeMenu}
            anchor={
              <>
                <Button 
                  labelStyle={style.selectLabel} 
                  style={style.select}
                  icon="arrow-down-drop-circle"
                  onPress={openMenu}
                >
                  {setor.sigla}
                </Button>
              </>
            }>
            {items ? items.map((item) => {
              return (
                <>
                  <Menu.Item 
                    key={item.id} 
                    title={item.sigla} 
                    onPress={() => { setSetor(item); closeMenu() }}
                  />
                  <Divider />
                </>
              )
            }) : null}

          </Menu>
        </View >
        <View style={style.buttonAvancar}>
          <Button contentStyle={{height: 50 }}
            mode="contained" 
            icon="check" 
            onPress={() => console.log('Pressed')}
            disabled={setor.id == null}
          >
            Confirma
          </Button >
        </View>
      </View >
    )
  }
}

const style = StyleSheet.create({
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
  selectContainer: {
    alignItems: "center",
  },
  select: {
    width: 150,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: MD3Colors.neutral70,
  },
  selectLabel: {
    fontWeight: "bold",
  },
  buttonAvancar: {
    position: "absolute",
    bottom: 20,
    right: 20,
    alignSelf: "flex-end",
  },
})