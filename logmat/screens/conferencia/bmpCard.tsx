import React, { FC, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Card, IconButton, MD3Colors, Text } from "react-native-paper";
import chairImage from '../../assets/images/chair.jpeg'

const BmpCard: FC<any> = (props) => {
  const [material, setMaterial] = useState(props.material)
  return (
    <Card style={style.card}>
      <View style={style.cover}>
        <Card.Cover source={chairImage} resizeMode={`contain`} />
        <IconButton style={style.shotButton}
          icon="camera" iconColor={MD3Colors.neutralVariant70}
          onPress={() => console.log('Pressed')} />
      </View>
      <Card.Content>
        <Text style={style.label}>
          BMP: <Text>{material?.n_bmp}</Text>
        </Text>
        <Text style={style.label}>
          Descrição: <Text>{material?.nomenclatura} </Text>
        </Text>
        <Text style={style.label}>
          Setor: <Text>{material?.setor.sigla} - {material?.setor.nome}
          </Text>
        </Text>
        <Text style={style.label}>
          Serial Number: <Text>{material?.n_serie}
          </Text>
        </Text>
        <Text style={style.label}>
          Valor líquido: <Text>R$ {material?.vl_liquido}
          </Text>
        </Text>
        <Text style={style.label}>
          Valor atualizado: <Text>R$ {material?.vl_atualizado}
          </Text>
        </Text>
      </Card.Content>
    </Card>
  )
}

const style: any = StyleSheet.create({
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
})

export default BmpCard