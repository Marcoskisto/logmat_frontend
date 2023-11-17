import AsyncStorage from "@react-native-async-storage/async-storage";
import { Item } from "./select";

export interface NavigationProps {
  navigation?: any,
  route?: any
}

export interface Setor {
  id: number,
  sigla: string,
  nome: string,
}

export enum HttpMethod {
  POST = 'POST',
  GET = 'GET',
}

export function retrieveHttpHeader(method: string): any {
  return AsyncStorage.getItem('token')
    .then(
      (token): any => {
        return {
          method: method,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Token ${token}`,
          }
        }
      }
    )
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



