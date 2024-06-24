import React, { FC, useEffect } from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';
import { TabView } from 'react-native-tab-view';
import { NavigationProps, requestStoragePermission, retrieveSetor, writeFile } from '../../components/utils';
import { Resource } from '../../httpService';
import RelacaoMaterial from './relacao_material';
import RelacaoConferido from './relacao_conferido';
import axios, { AxiosRequestConfig } from 'axios';
import { FAB } from 'react-native-paper';
import Share from 'react-native-share'

const Relatorios: FC<NavigationProps> = ({ navigation }) => {

  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: Resource.CONFERIDOS, title: 'Conferidos' },
    { key: Resource.NAO_ENCONTRADOS, title: 'Pendentes' },
  ]);

  const renderScene = (data: any) => {
    let relatorio: any;
    switch (data.route.key) {
      case Resource.CONFERIDOS:
        return <RelacaoConferido tipo={data.route.key} />;

      case Resource.NAO_ENCONTRADOS:
        return <RelacaoMaterial tipo={data.route.key} allSectors={false} />;
    }
  };

  const downloadReport = () => {
    retrieveSetor()
      .then((sector) => {
        const config: AxiosRequestConfig = {
          params: { setor__sigla: sector },
          responseType: 'arraybuffer',
          headers: {
            'Authorization': axios.defaults.headers.common['Authorization'],
          }
        };

        return axios.get(Resource.DOWNLOAD, config)
      })
      .then((result) => result.data)
      .then((contentFile) => writeFile('relatorio_'+Date.now()+'.xlsx', contentFile))
      .then((filePath) => { console.log(filePath); return Share.open({ title: 'test', url: 'file://' + filePath, type: 'application/xlsx' }) })
      .then(() => console.log('Arquivo compartilhado'))
      .catch(err => console.log('Erro ao baixar e compartilhar'))
  }

  useEffect(() => {
    requestStoragePermission();
  }, []);

  return (
    <>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
      />
      <FAB
        icon="file-download-outline"
        style={style.fab}
        onPress={() => downloadReport()}
      />
    </>
  );
}

const style = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 20,
    right: 0,
    bottom: 0,
  },
})
export default Relatorios
