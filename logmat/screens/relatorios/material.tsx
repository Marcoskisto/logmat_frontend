import React, { FC } from "react";
import { DataTable } from 'react-native-paper';

const Material: FC<any> = ({ id, bmp, nomenclatura }) => {
  return (
    <DataTable.Row key={id}>
      <DataTable.Cell style={{ flex: 0.3 }}>{bmp}</DataTable.Cell>
      <DataTable.Cell>{nomenclatura}</DataTable.Cell>
    </DataTable.Row>
  )
}

export default Material;