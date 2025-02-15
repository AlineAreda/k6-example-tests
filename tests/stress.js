/*
Stress Testing
login com um novo usuário
criterios:
Ramp up:  5 VUs em 5s
carga: 5 VUs por 5s
Ramp up:  50 VUs em 2s
carga: 50 VUs por 2s
Ramp down: 0 VUs em 5s

Limites:
requisições com falha inferior a 1%

*/

import http from "k6/http";
import { check, sleep } from "k6";
import { SharedArray } from "k6/data"; 
import paparse from "https://jslib.k6.io/papaparse/5.1.1/index.js"; 

import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";


export const options = {
  stages: [
    { duration: "10s", target: 10 }, //carga de 10 VUs por 10s
    { duration: "5s", target: 5 }, //carga de 5 VUs por 5s
    { duration: "2s", target: 50 }, //carga de 50 VUs por 2s
    { duration: "5s", target: 0 }, //Ramp down: 0 VUs em 5s
  ],
  thresholds: {
    http_req_failed: ["rate<0.01"], 
  },
};

const csvData = new SharedArray("Ler dados", function () {
  return paparse.parse(open("../data/users.csv"), { header: true }).data;
});

export default function () {
  const BASE_URL = "https://test-api.k6.io";

  const USER = csvData[Math.floor(Math.random() * csvData.length)].email; 

  console.log(USER);

  const res = http.post(`${BASE_URL}/auth/token/login/`, {
    username: USER,
    password: PASSWORD,
  });

  check(res, {
    "Sucesso Login": (r) => r.status === 200,
    "Token gerado": (r) => r.json("acess") !== "",
  });

  sleep(1);
}

export function handleSummary(data) {
  return {
    "reporter_k6.html": htmlReport(data),
  };
}

