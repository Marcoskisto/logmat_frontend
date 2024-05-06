import React, { FC } from 'react';
import { useWindowDimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { NavigationProps } from '../../components/utils';
import { Resource } from '../../httpService';
import RelacaoMaterial from './relacao_material';
import RelacaoConferido from './relacao_conferido';

const Relatorios: FC<NavigationProps> = ({ navigation }) => {

  
  const renderScene = (data: any) => {
    switch (data.route.key) {
      case Resource.CONFERIDOS:
        return <RelacaoConferido tipo={data.route.key} />;

      case Resource.NAO_ENCONTRADOS:
        return <RelacaoMaterial tipo={data.route.key} />;
    }
  };
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: Resource.CONFERIDOS, title: 'Conferidos' },
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