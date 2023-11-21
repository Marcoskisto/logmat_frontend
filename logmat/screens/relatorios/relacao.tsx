import React, { FC, useEffect, useState } from "react";
import { DataTable } from 'react-native-paper';
import Material from "./material";
import { ScrollView } from "react-native";
import axios from "axios";
import { Resource } from "../../httpService";

const Relacao: FC<any> = ({ tipo }) => {
  const [items, setItems] = useState<any>([]);
  const [length, setLength] = useState(1);
  const [page, setPage] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState(0)
  const numberOfItemsPerPageList = [15];
  const [numberOfItemsPerPage, onItemsPerPageChange] = React.useState(numberOfItemsPerPageList[0]);

  useEffect(() => {
    const url = `${tipo}?page=${page + 1}`
    axios.get(url)
      .then((resp) => resp.data)
      .then((data) => {
        setLength(data.count);
        setItems(renderItems(data.results));
        setNumberOfPages(Math.ceil(data.count / numberOfItemsPerPage));
      })
      .catch((error) => console.error(error))
  }, [page]);

  function renderItems(items: []): any[] {
    const renderedItems: any[] = [];
    items.forEach((item: any) => {
      let material: any = item;
      console.log(tipo)
      if (tipo !== Resource.NAO_ENCONTRADOS) { material = item.material };
      if (typeof material !== 'undefined') {
        renderedItems.push(
          <Material
            key={material.id}
            id={material.id}
            bmp={material.n_bmp}
            nomenclatura={material.nomenclatura}
          />
        )
      }
    })
    return renderedItems;
  }

  return (
    <ScrollView>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title style={{ flex: 0.3 }}>BMP</DataTable.Title>
          <DataTable.Title>Descrição</DataTable.Title>
        </DataTable.Header>
        {items}
        <DataTable.Pagination
          page={page}
          numberOfPages={numberOfPages}
          onPageChange={(page) => setPage(page)}
          label={`Page ${page + 1}/${numberOfPages} - ${length} Items`}
          showFastPaginationControls
          numberOfItemsPerPageList={numberOfItemsPerPageList}
          numberOfItemsPerPage={numberOfItemsPerPage}
          onItemsPerPageChange={onItemsPerPageChange}
        />
      </DataTable>
    </ScrollView>
  );
};

export default Relacao