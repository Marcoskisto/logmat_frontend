import React from "react";

import { StyleSheet } from "react-native";
import { View } from "react-native";
import { FAB, Button, Text } from "react-native-paper";

export default function Toolbar({ navigation }) {
  return (
    < >
      <View style={style.bar}>
        <View style={style.fab}>
          <FAB icon="clipboard-list-outline" size="large"
            onPress={() => navigation.navigate('ListaBmp')} />
          <Text>Listar</Text>
        </View>
        <View style={style.fab}>
          <FAB icon="qrcode-scan"
            size="large"
            onPress={() => navigation.navigate('ScanScreen')} />
          <Text>Conferir</Text>
        </View>
        <View style={style.fab}>
          <FAB icon="format-list-checks" size="large" onPress={() => navigation.navigate('Scanner')} />
          <Text>Acompanhar</Text>
        </View>
      </View>
    </ >
  )
}

const style = StyleSheet.create({
  bar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

  },
  fab: {
    alignItems: "center",
    margin: 10
  }
})  