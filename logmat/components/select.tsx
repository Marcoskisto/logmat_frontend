import React, { FC, useState } from "react";
import { View, StyleSheet } from "react-native"
import { Text, Button, Menu, Divider, MD3Colors } from "react-native-paper";

const Select: FC<any> = () => {

  const [material, setMaterial] = useState<any>();
  const [items, setItems] = useState<any>();

  const [setor, setSetor] = useState<any>({ id: null, sigla: "obrigatório..." });
  const [visible, setVisible] = useState<any>(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <View style={style.selectContainer}>
      <Text>*Onde encontrou este material?</Text>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <>
            <Button
              labelStyle={style.selectLabel}
              style={style.select}
              icon="arrow-down-drop-circle"
              onPress={openMenu}
            >
              {setor.sigla}
            </Button>
          </>
        }>
        {
          items ? items.map((item: any) => {
            return (
              <>
                <Menu.Item
                  key={item.id}
                  title={item.sigla}
                  onPress={() => { setSetor(item); closeMenu() }}
                />
                <Divider />
              </>
            )
          }) : null
        }
      </Menu>
    </View >
  )
}


const style = StyleSheet.create({
  selectContainer: {
    alignItems: "center",
  },
  select: {
    width: 150,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: MD3Colors.neutral70,
  },
  selectLabel: {
    fontWeight: "bold",
  },
})