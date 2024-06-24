import React, { FC, useEffect, useState } from "react";
import { Card, Icon } from 'react-native-paper';
import { FlatList, StyleSheet, Text } from "react-native";
import axios from "axios";
import { retrieveSetor } from "../../components/utils";

const RelacaoMaterial: FC<any> = ({ tipo, allSectors, searchQuery }) => {
  const [items, setItems] = useState<any>([]);
  const [page, setPage] = useState(1);
  const [showAllSectors, setShowAllSectors] = useState(false)
  const [searchCriteria, setCriteria] = useState(null)

  useEffect(() => {
    if (allSectors != showAllSectors) {
      setItems([]);
      setShowAllSectors(allSectors);
      setPage(1);
    }
    if (searchQuery != searchCriteria) {
      setItems([]);
      setCriteria(searchQuery);
    }
  }, [allSectors, searchQuery])

  useEffect(() => {
    retrieveSetor()
      .then(sector => showAllSectors ? null : sector)
      .then(
        sector => {
          const params = { page: page, setor__sigla: sector, search: searchCriteria };
          axios.get(tipo, { params })
            .then((resp) => resp.data)
            .then((data) => { setItems([...items, ...data.results]) })
            .catch((error) => console.info("No more items on server"))
        })
  }, [page, showAllSectors, searchCriteria]);

  function renderItem(item: any): any {
    const setor = item.setor == undefined ? "" : " - " + item.setor.sigla
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
      onEndReached={() => setPage(page + 1)}
    />
  );
};

const style = StyleSheet.create({
  marginCard: {
    marginVertical: 6,
    marginHorizontal: 10
  },
  title: {
    fontWeight: "bold"
  }
})
export default RelacaoMaterial