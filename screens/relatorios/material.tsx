import React, { FC } from "react";
import { DataTable, Icon } from 'react-native-paper';

const Material: FC<any> = ({ id, bmp, nomenclatura, isPending }) => {
  return (
    <DataTable.Row key={id}>
      <DataTable.Cell style={{ flex: 0.3 }}>
        {bmp}
        {isPending && <Icon source="alert-outline" size={18} color="#ff0f1f" />}
      </DataTable.Cell>
      <DataTable.Cell>
        {nomenclatura}
      </DataTable.Cell>
    </DataTable.Row>
  )
}

export default Material;