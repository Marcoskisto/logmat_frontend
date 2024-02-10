import React, { FC } from "react";

import { StyleSheet } from "react-native";
import { View } from "react-native";
import { Icon, Text, TouchableRipple } from "react-native-paper";

const Card: FC<any> = ({ navigate, icon, name, detail }) => {
  return (
    < >
      <View style={style.menuCardWrap}>
        <TouchableRipple
          onPress={() => navigate()}
          borderless={true}
          style={style.menuCardRipple}
        >
          <View style={style.cardArea}>
            <View style={style.iconDescription}>
              <Icon size={35} source={icon} />
              <Text>{name}</Text>
            </View>
            <View style={style.information}>
              <View style={style.infoText}>
                <Text style={style.infoValue}>{detail}</Text>
              </View>
            </View>
          </View>
        </TouchableRipple >
      </View>
    </ >
  )
}

const style = StyleSheet.create({
  menuCardWrap: {
    borderRadius: 30,
    margin: 10,
    height: 100,
    backgroundColor: '#cff566a3'
  },
  cardArea: {
    flexDirection: "row",
    marginLeft: 25,
    height: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  menuCardRipple: {
    borderRadius: 30,
  },
  iconDescription: {
    marginEnd: 15,
    alignItems: "center",
  },
  information: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "stretch",
    marginRight: 25,
  },
  infoText: {
    textAlign: "center",
    alignItems: "center",
    marginHorizontal: 5
  },
  infoValue: {
    fontSize: 20
  }
})

export default Card