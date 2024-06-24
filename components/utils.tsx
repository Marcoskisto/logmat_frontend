import AsyncStorage from "@react-native-async-storage/async-storage";
import { Item } from "./select";
import RNFS from "react-native-fs"
import { Buffer } from "buffer";
import RNBlobUtil from 'react-native-blob-util';
import { PermissionsAndroid, Platform } from "react-native";


export interface NavigationProps {
  navigation?: any,
  route?: any
}

export interface Setor {
  id: number,
  sigla: string,
  nome: string,
}


export function createSetorItems(receivedItems: Setor[]): Item[] {
  const items: Item[] = [];
  receivedItems.forEach(receivedItem => {
    items.push(
      { key: receivedItem.id, title: receivedItem.sigla }
    )
  });
  return items
}

export function retrieveSetor() {
  return AsyncStorage.getItem('session').then(
    (result) => {
      const session = JSON.parse(result!)
      return session.setor.sigla
    }
  )
}

export async function writeFile(
  fileName: string,
  content: any,
  folderPath: string = RNFS.DownloadDirectoryPath
): Promise<string> {
  // Ensure fileName starts with a slash if not empty
  const correctedFileName = fileName.startsWith('/') ? fileName : '/' + fileName;
  const filePath: string = folderPath + correctedFileName;

  const data = Buffer.from(content).toString('base64')
  // Salva o arquivo como binário
  return RNBlobUtil.fs.writeFile(filePath, data, 'base64')
    .then(() => {
      console.log('Arquivo salvo com sucesso!');
      return filePath
    })
    .catch(err => {
      console.error('Erro ao salvar o arquivo:', err);
      throw new Error(err)
    })
}

export async function requestStoragePermission() {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission',
          message: 'This app needs access to your storage to download the report',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the storage');
      } else {
        console.log('Storage permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }
}