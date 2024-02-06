import React, { FC } from "react";

import { StyleSheet, Touchable } from "react-native";
import { View } from "react-native";
import { Avatar, Button, Card, FAB, IconButton, Text, TouchableRipple } from "react-native-paper";
import { green100 } from "react-native-paper/lib/typescript/styles/themes/v2/colors";

const Toolbar: FC<any> = ({ navigation }) => {
  return (
    < >
      <View style={style.bar}>
        <View style={style.fab}>
          <FAB icon="clipboard-list-outline"
            size="large"
            mode="flat"
            onPress={() => navigation.navigate('ListaBmp')} />
          <Text>Listar</Text>
        </View>
        <View style={style.fab}>
          <FAB icon="format-list-checks"
            size="large"
            mode="flat"
            onPress={() => navigation.navigate('Conferencia')} />
          <Text>Conferir</Text>
        </View>
        <View style={style.fab}>
          <FAB icon="format-list-checks"
            size="large"
            mode="flat"
            onPress={() => navigation.navigate('Relatorios')} />
          <Text>Acompanhar</Text>
        </View>
        <View >
          <TouchableRipple
            onPress={() => console.log('Pressed')}
            rippleColor="rgba(0, 0, 0, .32)"
          >
            <Card.Title title="Card Title" subtitle="Card Subtitle" />

          </TouchableRipple >
        </View>

      </View >
    </ >
  )
}

const style = StyleSheet.create({
  bar: {
  },
  option: {
    borderRadius: 20,
    margin: 10,
    height: 100,
    backgroundColor: '#aaaabb'

  },
  fab: {
    margin: 10,
  }
})

export default Toolbar