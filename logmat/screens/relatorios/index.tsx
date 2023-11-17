import React, { FC } from 'react';
import { View, useWindowDimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { NavigationProps } from '../../components/utils';
import Relacao from './relacao';
import { Route } from '../../httpService';

const Relatorios: FC<NavigationProps> = ({ navigation }) => {

  const renderScene = (data: any) => {
    switch (data.route.key) {
      case Route.CONFERIDOS:
        return <Relacao jumpTo={data.jumpTo} tipo={data.route.key} />;

      case Route.ENCONTRADOS:
        return <Relacao jumpTo={data.jumpTo} tipo={data.route.key} />;

      case Route.NAO_ENCONTRADOS:
        return <Relacao jumpTo={data.jumpTo} tipo={data.route.key} />;
    }
  };
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: Route.CONFERIDOS, title: 'Conferidos' },
    { key: Route.ENCONTRADOS, title: 'Encontrados' },
    { key: Route.NAO_ENCONTRADOS, title: 'Pendentes' },
    
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