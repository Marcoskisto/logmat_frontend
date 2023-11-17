import React, { FC, useEffect, useState } from "react";
import { View, StyleSheet } from "react-native"
import { Text, Button, Menu, Divider, MD3Colors, PaperProvider } from "react-native-paper";

export interface Item {
  key: any,
  title: string
}
interface SelectProps {
  items: Item[],
  label: string,
  defaultTitle: string
  returnValue: Function,
}

const Select: FC<SelectProps> = ({ items, label, defaultTitle, returnValue }) => {

  const [selected, select] = useState<any>({ id: null, title: defaultTitle });
  const [visible, setVisible] = useState<any>(false);
  const [options, setOptions] = useState([{ key: null, title: '' }])
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  useEffect(() => setOptions(items), [items])

  return (

    <View style={style.container}>
      <Text style={style.selectLabel}>{label}</Text>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <>
            <Button
              labelStyle={style.label}
              style={style.field}
              icon="arrow-down-drop-circle"
              onPress={openMenu}
            >
              {selected.title}
            </Button>
          </>
        }>
        {
          options ? options.map((option: any) => {
            return (
              <Menu.Item
                style={style.menu}
                key={option.key}
                title={option.title}
                onPress={() => { select(option); returnValue(option.key); closeMenu() }}
              />
            )
          }) : null
        }
      </Menu>
    </View >
  )
}

const style = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  selectLabel: {
    fontWeight: "bold",
  },
  menu: {

  },
  field: {
    width: 150,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: MD3Colors.neutral70,
  },
  label: {
    fontWeight: "bold",
  },
})

export default Select