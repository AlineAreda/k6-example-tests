/*
Critérios
Realizar consulta à API de listagem de crocodilos e busca por id de crocodilos.
É esperado um RPS de 200 REQ/S para a API de listagem de crocodilos durante 30 segundos.
Para a busca por ID, o sistema deve atender 50 usuários, onde cada usuário realiza até 20 solicitações em até 1 minuto.
Usuários pares devem realizar busca ao crocodilo de ID 2.
Usuários ímpares devem realizar busca ao crocodilo de ID 1.
Ambos os testes devem ser executados simultaneamente.3

*/


import http from "k6/http";
import { check, sleep } from "k6";
import { SharedArray } from "k6/data"; 
import paparse from "https://jslib.k6.io/papaparse/5.1.1/index.js"; 


export const options = {
  scenarios: {
    listar: {
      executor: 'constant-arrival-rate', 
      exec: 'listar',
      duration: '30s',
      rate: 200,
      timeUnit: '1s',
      preAllocatedVUs: 150,
      gracefulStop: '10s',
      tags: { test_type: 'listagem_de_crocodilos' }
    },
    buscar: {
      executor: 'per-vu-iterations',
      exec: 'buscar',
      vus: 50,
      iterations: 20,
      maxDuration: '1m',
      gracefulStop: '10s',
      tags: { test_type: 'busca_de_crocodilos' },
    },
  },

};

export function listar(){
  http.get(__ENV.URL+'crocodiles');
};

export function buscar(){
  if(__VU % 2 == 0){
    http.get(__ENV.URL+'/crocodiles/2')}
  else{
      http.get(__ENV.URL+'/crocodiles/1')};
};
  