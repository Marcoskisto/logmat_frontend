import React, { useEffect, useState, FC } from "react";
import { StyleSheet, View, Text, Switch } from "react-native";

import { NavigationProps } from "../components/utils";
import RelacaoMaterial from "./relatorios/relacao_material";
import { Resource } from "../httpService";
import { Searchbar } from "react-native-paper";


const ListaBmp: FC<NavigationProps> = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);


  return (
    <>
      <RelacaoMaterial tipo={Resource.MATERIAL} />
      <View style={style.searchBar}>
        <View style={style.searchOption}>
          <Switch
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
          <Text>Todos Setores</Text>
        </View>
        <Searchbar
          placeholder="Search"
          onChangeText={setSearchQuery}
          value={searchQuery}
        />
      </View>
    </>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1
  },
  searchBar: {
    paddingHorizontal: 10,
    padding: 10
  },
  searchOption: {
    flexDirection: "row-reverse",
    textAlign: "right",
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


})

export default ListaBmp;