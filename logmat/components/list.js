import React, { useEffect, useState } from "react";
import { DataTable } from 'react-native-paper';
import settings from '../settings'

export default function listaDeMateriais() {

  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);

  const url = `${settings.BASE_URL}/material/`
  useEffect(() => {
    fetch(url)
      .then((resp) => resp.json())
      .then((json) => setItems(json.results))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  const numberOfItemsPerPageList = [15, 30, 50];
  const [page, setPage] = React.useState(0);
  const [numberOfItemsPerPage, onItemsPerPageChange] = React.useState(numberOfItemsPerPageList[0]);
  const from = page * numberOfItemsPerPage;
  const to = Math.min((page + 1) * numberOfItemsPerPage, items.length);

  return (
    <DataTable>
      <DataTable.Header>
        <DataTable.Title style={{ flex: 0.2 }}>SETOR</DataTable.Title>
        <DataTable.Title style={{ flex: 0.3 }}>BMP</DataTable.Title>
        <DataTable.Title>Descrição</DataTable.Title>
      </DataTable.Header>

      {items.map((item) => (
        <DataTable.Row key={item.n_bmp}>
          <DataTable.Cell style={{ flex: 0.2 }}>{item.setor.sigla}</DataTable.Cell>
          <DataTable.Cell style={{ flex: 0.3 }}>{item.n_bmp}</DataTable.Cell>
          <DataTable.Cell>{item.nomenclatura}</DataTable.Cell>
        </DataTable.Row>
      ))}
      <DataTable.Pagination
        page={page}
        numberOfPages={Math.ceil(items.length / numberOfItemsPerPage)}
        onPageChange={page => setPage(page)}
        label={`${from + 1}-${to}/${items.length}`}
        showFastPaginationControls
        numberOfItemsPerPageList={numberOfItemsPerPageList}
        numberOfItemsPerPage={numberOfItemsPerPage}
        onItemsPerPageChange={onItemsPerPageChange}
      />
    </DataTable>
  );
};