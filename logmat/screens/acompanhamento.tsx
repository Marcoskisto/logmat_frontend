import React, { useEffect, useState, FC } from "react";
import { NavigationProps } from "../components/utils";
import { StyleSheet, View, Text } from "react-native";
import { ScrollView } from "react-native";



const Conferencia: FC<NavigationProps> = ({ navigation }) => {
  return (
    <>
      <View style={style.container}>
        <View style={style.list}>
          <ScrollView contentContainerStyle={{ paddingHorizontal: 5 }}>
            <List />
          </ScrollView>
        </View>
      </View>
    </>
  )
}


const style = StyleSheet.create({

  
})