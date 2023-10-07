import React, { useEffect, useState, FC } from "react";
import { ScrollView } from "react-native";
import { StyleSheet, View, Text } from "react-native";

import List from "../components/list";

interface NavigationProps {
  navigation: any
}

const ListaBmp: FC<NavigationProps> = ({ navigation }) => {
  return (
    <View style={style.container}>
      <View style={style.list}>
        <ScrollView contentContainerStyle={{ paddingHorizontal: 5 }}>
          <List />
        </ScrollView>
      </View>
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1
  },
  list: {
    flex: 1,
    height: "60%"
  },
  search: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  searchItem: {
    flex: 1,
    marginHorizontal: 5,
    alignItems: "flex-start"

  },
  fab: {
    alignItems: "center",
    marginEnd: 10
  }

})

export default ListaBmp;