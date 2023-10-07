
import React, { FC } from 'react';

import {
  StyleSheet,
  Text,
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';

interface NavigationProps {
  navigation: any
}

const ScanScreen: FC<NavigationProps> = ({ navigation }) => {
  const onSuccess = (e:any) => {
    navigation.navigate('Conferencia', { bmp: e.data })
  };
  return (
    <QRCodeScanner
      onRead={onSuccess}
      flashMode={RNCamera.Constants.FlashMode.off}
      topContent={
        <Text style={styles.centerText}>
          Aponte para uma etiqueta de BMP
        </Text>
      }
    />
  );
}

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
    fontWeight: '500',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)'
  },
  buttonTouchable: {
    padding: 16
  }
});

export default ScanScreen