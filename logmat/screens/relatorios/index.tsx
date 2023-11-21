import React, { FC } from 'react';
import { View, useWindowDimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { NavigationProps } from '../../components/utils';
import Relacao from './relacao';
import { Resource } from '../../httpService';

const Relatorios: FC<NavigationProps> = ({ navigation }) => {

  const renderScene = (data: any) => {
    switch (data.route.key) {
      case Resource.CONFERIDOS:
        return <Relacao jumpTo={data.jumpTo} tipo={data.route.key} />;

      case Resource.ENCONTRADOS:
        return <Relacao jumpTo={data.jumpTo} tipo={data.route.key} />;

      case Resource.NAO_ENCONTRADOS:
        return <Relacao jumpTo={data.jumpTo} tipo={data.route.key} />;
    }
  };
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: Resource.CONFERIDOS, title: 'Conferidos' },
    { key: Resource.ENCONTRADOS, title: 'Encontrados' },
    { key: Resource.NAO_ENCONTRADOS, title: 'Pendentes' },
    
  ]);

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  );
}

export default Relatorios