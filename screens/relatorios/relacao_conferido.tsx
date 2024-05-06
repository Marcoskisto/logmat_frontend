import React, { FC, useEffect, useState } from "react";
import { Card, Icon } from 'react-native-paper';
import { FlatList, StyleSheet, Text, View } from "react-native";
import axios from "axios";
import { retrieveSetor } from "../../components/utils";

const RelacaoConferido: FC<any> = ({ tipo }) => {
  const [items, setItems] = useState<any>([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    retrieveSetor()
      .then(
        setor => {
          const params = { page: page + 1, setor: setor }
          axios.get(tipo, { params })
            .then((resp) => resp.data)
            .then((data) => {setItems([...items, ...data.results])})
            .catch((error) => console.info("No more items on server"))
        })
  }, [page]);

  function renderItem(item: any): any {
    return <>
      <Card style={style.marginCard}>
        <Card.Content>
          <View style={style.title}>
            <Text style={style.bold}>{item.material.n_bmp} {!item.is_owner && <Icon source="alert-outline" size={18} color="#ff0f1f" />}</Text>
            <Text style={style.bold}><Icon source="account-outline" size={18} />{item.conferente.username}</Text>
            <Text style={style.bold}><Icon source="map-marker-radius-outline" size={18} />{item.localizacao.sigla}</Text>
          </View>
          <Text numberOfLines={2}>
            {item.material.nomenclatura}
          </Text>
        </Card.Content>
      </Card>
    </>
  }

  return (
    <FlatList
      data={items}
      renderItem={({ item }) => renderItem(item)}
      keyExtractor={items.id}
      onEndReached={() => setPage(page+1)}
    />
  );
}

const style = StyleSheet.create({
  marginCard: {
    marginVertical: 5,
    marginHorizontal: 7
  },
  title: {
    fontWeight: "bold",
    flexDirection: "row",
    gap: 25,
    marginBottom: 5
  },
  bold: {
    fontWeight: "bold"
  }
})
export default RelacaoConferido