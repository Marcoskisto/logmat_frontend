import React, { FC, useEffect, useState } from "react";
import { View, StyleSheet } from "react-native"
import { Text, Button, Menu, MD3Colors, IconButton } from "react-native-paper";

export interface Item {
  key: any,
  title: string
}
interface SelectProps {
  items: Item[],
  label: string,
  defaultTitle: string,
  returnValue: Function,
}

const Select: FC<SelectProps> = ({ items, label, defaultTitle, returnValue }) => {

  const [selected, select] = useState<any>({ id: null, title: defaultTitle });
  const [visible, setVisible] = useState<any>(false);
  const [options, setOptions] = useState([{ key: null, title: '' }])
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  useEffect(() => setOptions(items), [items])

  function getMenuItems(): any {
    const optionsComponent: any[] = [];
    options?.forEach(
      (option) => {
        optionsComponent.push(
          <Menu.Item
            style={style.menu}
            key={option.key}
            title={option.title}
            onPress={() => { select(option); returnValue(option.key); closeMenu() }}
          />
        )
      })
    return optionsComponent
  }

  return (

    <View style={style.container}>
      <Text style={style.selectLabel}>{label}</Text>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <View style={style.anchor}>
            <IconButton style={style.icon} icon="chevron-down"></IconButton>
            <Button
              labelStyle={style.label}
              style={style.field}
              onPress={openMenu}>
              {selected.title}
            </Button>
          </ View>
        }
      >
        {getMenuItems()}
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
    marginBottom: 10
  },
  anchor: {
    flexDirection: "row"
  },
  icon: {
    position: "absolute",
    width: 180,
    alignItems: "flex-end",
    marginLeft: -15
  },

  menu: {
    width: 180
  },
  field: {
    width: 180,
    borderWidth: 2,
    borderRadius: 20,
    borderColor: MD3Colors.neutral70,
  },
  label: {
    fontWeight: "bold",
    textAlign: "left",
    textAlignVertical: "center",
    height: 30,
  },
})

export default Select