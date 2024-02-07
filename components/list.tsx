import React, { useEffect, useState, FC } from "react";
import { DataTable } from 'react-native-paper';
import { Resource } from "../httpService";
import axios from "axios";

const ListaDeMateriais: FC<any> = () => {

  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  
  const [length, setLength] = useState(1);
  const numberOfItemsPerPageList = [15];
  const [page, setPage] = React.useState(0);
  const [numberOfItemsPerPage, onItemsPerPageChange] = React.useState(numberOfItemsPerPageList[0]);
  const [numberOfPages, setNumberOfPages] = useState(0)

  useEffect(() => {
    const params = { setor__sigla: 'SDDM', page: page + 1 };
    axios.get(Resource.MATERIAL, { params })
      .then((resp: any) => setItems(resp.data.results))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, [page]);

  return (
    <DataTable>
      <DataTable.Header>
        <DataTable.Title style={{ flex: 0.3 }}>BMP</DataTable.Title>
        <DataTable.Title>Descrição</DataTable.Title>
      </DataTable.Header>

      {items.map((item: any) => (
        <DataTable.Row key={item.n_bmp}>
          <DataTable.Cell style={{ flex: 0.3 }}>{item.n_bmp}</DataTable.Cell>
          <DataTable.Cell>{item.nomenclatura}</DataTable.Cell>
        </DataTable.Row>
      ))}
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
  );
};

export default ListaDeMateriais