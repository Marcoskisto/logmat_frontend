import React, { useState, useEffect, FC } from "react";
import { Modal, StyleSheet, View } from "react-native";
import { Button, PaperProvider, Text } from "react-native-paper";
import Select from "../../components/select";
import settings from "../../settings";
import { NavigationProps, createSetorItems, retrieveHttpHeader } from "../../components/utils";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Confirmacao from "./confirmacao";
import ScanScreen from "../scanner";

const Stack = createNativeStackNavigator();

const IniciaConferencia: FC<NavigationProps> = ({ route, navigation }) => {

  const [items, setItems] = useState<any>();
  const [setorId, setSetorId] = useState<string | null>(null)
  const [bmp, setBmp] = useState<string | null>(null)
  const [scanner, showScanner] = useState<boolean>(false)
  const [confirmacao, showConfirmacao] = useState<boolean>(false)

  const urlSetor = `${settings.BASE_URL}/setor/`
  useEffect(() => {
    retrieveHttpHeader('GET')
      .then((header: any) => {
        fetch(urlSetor, header)
          .then((resp) => resp.json())
          .then((json) => json.results)
          .then((setores) => createSetorItems(setores))
          .then((items) => setItems(items))
          .catch((error) => console.error(error))
      })
  }, []);

  function switchModal() {
    const shift: boolean = scanner
    showScanner(!shift);
    showConfirmacao(shift);
  }

  function closeModals() {
    showScanner(false);
    showConfirmacao(false);
  }

  function startConferencia(bmp: string) {
    setBmp(bmp);
    switchModal();
  }

  return (
    <>
      <View style={style.content}>
        <Text style={style.title}>Em que local você está?</Text>
        <Select
          items={items}
          label="Localização física dos materiais?"
          defaultTitle="localização..."
          returnValue={(setorId: string | null) => setSetorId(setorId)}
        />
        <Button contentStyle={{ height: 50 }}
          style={style.buttonContinua}
          mode="contained"
          icon="check"
          onPress={() => switchModal()}
          disabled={setorId == null} >
          Continuar
        </Button >
      </View>
      <Modal visible={scanner}>
        <ScanScreen
          onScan={(bmp: string) => { startConferencia(bmp) }}
          onPressClose={() => closeModals()}
        />
      </Modal>

      <Modal visible={confirmacao}>
        <Confirmacao
          onPressClose={() => closeModals()}
          localId={setorId}
          bmp={bmp}
        />
      </Modal>
    </>
  )
}


const style: any = StyleSheet.create({
  content: {
    flex: 1,
    height: "100%",
    alignItems: "center",
    justifyContent: "center"

  },
  title: {
    fontSize: 30,
    marginBottom: 30
  },
  buttonContinua: {
    marginVertical: 30,
    width: "40%"
  }
})

export default IniciaConferencia;