import axios from 'axios'


export enum Resource {
  LOGIN = '/login/',
  MATERIAL = '/material/',
  CONFERENCIA = '/conferencia/',
  CONFERIDOS = '/conferidos/',
  ENCONTRADOS = '/encontrados/',
  NAO_ENCONTRADOS = '/nao-encontrados/',
  SETOR = '/setor/'
}

axios.defaults.baseURL = 'http://192.168.15.18:8000';
axios.defaults.timeout = 500;
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common.Accept = 'application/json'

