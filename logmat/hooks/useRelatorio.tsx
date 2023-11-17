import { useEffect, useState } from "react";
import settings from "../settings";
import { retrieveHttpHeader } from "../components/utils";
import { tipoRelatorio } from "../screens/relatorios";


// export function useRelatorio2(tipo: tipoRelatorio, page: number): any {
//   let items: any, length: any;
//   const url = `${settings.BASE_URL}/${tipo}/?page=${page}`
//   useEffect(() => {
//     fetch(url, retrieveHttpHeader('GET'))
//       .then((resp) => resp.json())
//       .then((json) => { items = json.results; length = json.count })
//       .catch((error) => console.error(error))
//   }, [page]);

//   return { items: items, length: length };
// }


export function useRelatorio(tipoRelatorio: string, pageRequested: number) {
  const [items, setItems] = useState([]);
  const [length, setLength] = useState(1);
  
  useEffect(() => {
    const url = `${settings.BASE_URL}/${tipoRelatorio}/?page=${pageRequested + 1}`
    fetch(url, retrieveHttpHeader('GET'))
      .then((resp) => resp.json())
      .then((json) => {
        setItems(json.results);
        setLength(json.count);
      })
      .catch((error) => console.error(error))
  }, [pageRequested]);
  
  return async () => { 
    return {items: items, length: length};
  }
}