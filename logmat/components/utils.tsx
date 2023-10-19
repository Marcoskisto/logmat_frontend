import AsyncStorage from "@react-native-async-storage/async-storage";

export interface NavigationProps {
  navigation?: any,
  route?: any
}

export const retrieveToken = async () => {
  AsyncStorage.getItem('token')
    .then((token) => { return token })
};

function generateHttpHeader(method: string, token: any) {
  return {
    method: method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    }
  }
};

export function retrieveHttpHeader(method: string): any {
  retrieveToken()
    .then(
      (token): any => {
        return generateHttpHeader(method, token)
      }
    )
}



