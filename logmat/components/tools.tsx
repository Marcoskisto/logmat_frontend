import React, { FC } from "react";

import { StyleSheet } from "react-native";
import { View } from "react-native";
import { FAB, Text } from "react-native-paper";
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
          <FAB icon="qrcode-scan"
               size="large"
               mode="flat"
               variant="primary"
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
    margin: 10,
  }
})  

export default Toolbar