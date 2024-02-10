import React, { FC } from "react";
import { StyleSheet } from "react-native";
import { View } from "react-native";
import Header from '../../components/header';
import Panel from './Panel';
import { NavigationProps } from "../../components/utils";


const Home: FC<NavigationProps> = ({ navigation }) => {

  return (
    <View style={style.container} >
      <View style={style.header}>
        <Header />
      </View>
      <View style={style.tools} >
        <Panel navigation={navigation} />
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
  }
})

export default Home;