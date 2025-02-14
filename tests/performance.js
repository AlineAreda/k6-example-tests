/*
Registrar e autenticar um novo usuário

Criterios:
performance test
carga contínua de 10 VUs por 10s

Limites:
requisições com falha inferior a 1%
Duração da requisição  p(95) < 500
Requisição com sucesso superior a 95%
*/

import http from "k6/http";
import { check, sleep } from "k6";


export const options = {
  stages: [{ duration: "10s", target: 10 }],
  thresholds: {
    checks: ["rate>0.95"], 
    http_req_failed: ["rate<0.01"], 
    http_req_duration: ["p(95)<500"], 
  },
};

export default function () {
  const BASE_URL = "https://test-api.k6.io";

  const USER = `${Math.random()}@email.com`; 
  const PASSWORD = "Teste @123";

  console.log(USER + PASSWORD);

  const res = http.post(`${BASE_URL}/user/register/`, {
    username: USER,
    first_name: "Croco",
    last_name: "Dino",
    email: USER,
    password: PASSWORD,
  });

  check(res, {
    "Sucesso ao registrar novo usuário": (r) => r.status === 201,
  });

  sleep(1);
}
