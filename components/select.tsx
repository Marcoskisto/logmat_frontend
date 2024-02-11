import React, { FC, useEffect, useState } from "react";
import { View, StyleSheet, Modal, Pressable, SectionList, FlatList, ScrollView } from "react-native"
import { Text, Button, Menu, MD3Colors, Icon } from "react-native-paper";

export interface Item {
  key: any,
  title: string
}
interface SelectProps {
  items: Item[],
  label: string,
  onSelect: Function,
}
type ItemProps = { title: string, onPress: Function };

const Item = ({ title, onPress }: ItemProps) => (
  <Pressable style={style.item} onPress={() => { onPress()}} >
    <Text style={style.label}>{title}</Text>
  </Pressable>
);

const Select: FC<SelectProps> = ({ items, label, onSelect }) => {

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedLabel, setSelected] = useState(label)
  
  const afterSelect = (item: any) => {
    onSelect(item);
    setSelected(item.title);
    setModalVisible(!modalVisible);
  }

  return (
    <View>
      <Modal
        visible={modalVisible}
        transparent={true}
        onDismiss={()=> console.log('out')}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={style.backwardModal}>
          <View style={style.modal}>
            <FlatList
              data={items}
              renderItem={({ item }) => <Item title={item.title} onPress={()=> {afterSelect(item)}}/>}
              keyExtractor={item => item.key}
            />
          </View>
        </View>
      </Modal>
      <Pressable
        style={style.buttonSelect}
        onPress={() => setModalVisible(true)}>
        <Text style={style.label}>{selectedLabel}</Text>
        <View style={style.icon}>
        <Icon size={35} source="chevron-down" />
        </View>
      </Pressable>
    </View>
  )
}

const style = StyleSheet.create({
  buttonSelect: {
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: "center",
    borderWidth: 0.5,
    width: "50%"
  },

  backwardModal: {
    height: "100%",
    backgroundColor: "#cfcfcf6e",
    justifyContent: "center",
    alignItems: "center"
  },
  modal: {
    maxHeight: "40%",
    width: "80%",
    backgroundColor: "#ecf0f3",
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  label: {
    flex: 1,
    fontWeight: "bold",
    textAlign: "center",
    textAlignVertical: "center",
    height: 55,
  },
  icon: {
    borderLeftWidth: 0.4
  },
  item: {
    borderBottomColor: "#7575756e",
    borderBottomWidth: 0.5
  }
})

export default Select