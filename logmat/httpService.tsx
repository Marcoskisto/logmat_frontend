import axios from 'axios'

export enum Route {
  LOGIN = '/login/',
  MATERIAL = '/material/',
  CONFERENCIA = '/conferencia/',
  CONFERIDOS = '/conferidos/',
  ENCONTRADOS = '/encontrados/',
  NAO_ENCONTRADOS = '/nao-encontrados/'
}

axios.defaults.baseURL = 'http://192.168.75.93:8000';
axios.defaults.timeout = 500;
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common.Accept = 'application/json'
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

