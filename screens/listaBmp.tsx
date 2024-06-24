import React, { useEffect, useState, FC } from "react";
import { StyleSheet, View, Text, Switch, GestureResponderEvent, NativeSyntheticEvent, EnterKeyHintType, TextInputKeyPressEventData, TextInputFocusEventData } from "react-native";

import { NavigationProps } from "../components/utils";
import RelacaoMaterial from "./relatorios/relacao_material";
import { Resource } from "../httpService";
import { Searchbar } from "react-native-paper";


const ListaBmp: FC<NavigationProps> = ({ navigation }) => {
  const [searchValue, setSearchValue] = React.useState('');
  const [searchQuery, setSearchQuery] = React.useState('')
  const [allSectors, setAllSectors] = useState(false);
  const toggleSwitch = () => setAllSectors(previousState => !previousState);


  return (
    <>
      <RelacaoMaterial tipo={Resource.LISTA_MATERIAIS} allSectors={allSectors} searchQuery={searchQuery} />
      <View style={style.searchBar}>
        <View style={style.searchOption}>
          <Switch
            onValueChange={toggleSwitch}
            value={allSectors}
          />
          <Text>Todos Setores</Text>
        </View>
        <Searchbar
          placeholder="Search"
          onChangeText={setSearchValue}
          value={searchValue}
          onIconPress={(e: GestureResponderEvent) => setSearchQuery(searchValue)}
          onTraileringIconPress={(e: GestureResponderEvent) => setSearchQuery(searchValue)}
          onBlur={(e: NativeSyntheticEvent<TextInputFocusEventData>) => {setSearchQuery(searchValue)}}
          onClearIconPress={(e: GestureResponderEvent) => setSearchQuery('')}
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