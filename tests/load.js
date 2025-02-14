import http from 'k6/http';
import { check, sleep } from 'k6';
import { SharedArray } from 'k6/data'; 
/*

requisitos não funcionais:
Ramp up: carga de 10 VUs por 10s 
carga de 10 VUs por 10s
Ramp down: desaceleração de 10 VUs por 10s

Limites:
requisições com falha inferior a 1%
Duração da requisição  p(95) < 200
Requisição com sucesso superior a 95%
*/


export const options = {
  stages: [
    { duration: '10s', target: 10 }, 
    { duration: '10s', target: 10 }, 
    { duration: '10s', target: 0 }, 
  ],
  thresholds: { 
    checks: ['rate>0.95'], 
    http_req_duration: ['p(95)<200'], 
  },
};

const data = new SharedArray('Leitura do arquivo JSON', function(){
  return JSON.parse(open('../data/data.json')).crocodilos 
});


export default function(){
  const crocodilo = data[Math.floor(Math.random() * data.length)].id; 
  console.log(crocodilo);

  const BASE_URL = `https://test-api.k6.io/public/crocodiles/${crocodilo}`;

  const res = http.get(BASE_URL);
  
  check(res, {
    'status code is 200': (r) => r.status === 200,
  });

  sleep(1);

}
