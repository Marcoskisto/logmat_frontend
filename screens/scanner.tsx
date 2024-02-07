
import React, { FC } from 'react';

import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import { FAB } from 'react-native-paper';

const ScanScreen: FC<any> = (props: any) => {

  const onSuccess = (e: any) => props.onScan(e.data);
  return (
    <View style={styles.scan}>
      <QRCodeScanner
        showMarker={true}
        vibrate={true}
        onRead={onSuccess}
        flashMode={RNCamera.Constants.FlashMode.off}
        topContent={
          <View style={styles.topContent}>
            <Text style={styles.centerText}>
              Aponte para uma etiqueta de BMP
            </Text>
          </View>
        }
      />
    <FAB 
      onPress={() => props.onPressClose()}
      style={styles.cancelButton} 
      icon="close"/>
    </View>
  );
}

const styles = StyleSheet.create({
  scan: {
    height: "100%"
  },
  cancelButton: {
    position: 'absolute',
    bottom: 15,
    left: 15,
  },
  topContent: {
    height: "100%"
  },
  centerText: {
    fontSize: 18,
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