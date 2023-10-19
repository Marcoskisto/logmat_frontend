import React, { FC } from "react";
import { StyleSheet } from "react-native";
import { View } from "react-native";
import Header from '../components/header';
import Tools from '../components/tools';
import { NavigationProps, retrieveToken } from "../components/utils";


const Home: FC<NavigationProps> = ({ navigation }) => {

  return (
    <View style={style.container} >
      <View style={style.header}>
        <Header />
      </View>
      <View style={style.tools} >
        <Tools navigation={navigation} />
      </View>
    </View >
  )
}

const style = StyleSheet.create({
  container: {
    flexDirection: "column",
    height: "100%",
  },

  header: {
    height: "10%",
    marginVertical: 5
  },

  body: {
    flex: 1
  },

  tools: {
    width: "100%",
    position: "absolute",
    bottom: 0,
  }
})

export default Home;