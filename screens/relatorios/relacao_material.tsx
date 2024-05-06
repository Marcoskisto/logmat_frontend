import React, { FC, useEffect, useState } from "react";
import { Card, Icon } from 'react-native-paper';
import { FlatList, StyleSheet, Text } from "react-native";
import axios from "axios";
import { retrieveSetor } from "../../components/utils";

const RelacaoMaterial: FC<any> = ({ tipo }) => {
  const [items, setItems] = useState<any>([]);
  const [page, setPage] = useState(0);
  const [setor, setSetor] = useState()

  useEffect(() => {
    retrieveSetor()
      .then(
        setor => {
          const params = { page: page + 1, setor_sigla: setor }
          axios.get(tipo, { params })
            .then((resp) => resp.data)
            .then((data) => {setItems([...items, ...data.results])})
            .catch((error) => console.info("No more items on server"))
        })
  }, [page]);

  function renderItem(item: any): any {
    const setor = item.setor == undefined? "": " - "+ item.setor.sigla
    return <>
      <Card style={style.marginCard}>
        <Card.Content>
          <Text style={style.title}>{item.n_bmp}{setor}</Text>
          <Text numberOfLines={2}>
            {item.nomenclatura}
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
};

const style = StyleSheet.create({
  marginCard: {
    marginVertical: 5,
    marginHorizontal: 7
  },
  title: {
    fontWeight: "bold"
  }
})
export default RelacaoMaterial