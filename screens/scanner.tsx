
import { useIsFocused } from '@react-navigation/native';
import React, { FC, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Camera, CameraDevice, CodeScanner, useCameraDevice } from 'react-native-vision-camera';

const ScanScreen: FC<any> = ({ route, navigation }) => {
  const isFocused = useIsFocused()

  const sector: any = route.params.sector
  const device: CameraDevice | undefined = useCameraDevice('back')
  const [isActive, activate] = useState(true)

  const codeScanner: CodeScanner = {
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: (codes) => {
      activate(false)
      if(isFocused){
        navigation.push('Confirmacao', { sector: sector, bmp: codes[0].value })
        console.log(codes[0].value)
      }
    }
  }

  useEffect(() => {
    if (device) {
      Camera.requestCameraPermission()
        .then(result => {
          console.log('requestCameraPermission: ', Camera.getCameraPermissionStatus());
        })
        .catch(err => {
          console.log('requestCameraPermission Err: ', err);
        });
    }
  }, [device]);

  useEffect(() => {
    // Atualiza isActive com base no foco da tela
    if (isFocused) {
      activate(true);
    } else {
      activate(false);
    }
  }, [isFocused]);

  if (device == null || Camera.getCameraPermissionStatus() != 'granted') return <View></View>
  return (
    <Camera
      style={StyleSheet.absoluteFill}
      device={device}
      isActive={isActive && isFocused}
      codeScanner={codeScanner}
      onError={(error) => console.log(error)}
    />
  );
}

const styles = StyleSheet.create({
  scan: {
    height: "100%"
  },
});

export default ScanScreen