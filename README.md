# 🚀 Exemplo de Testes de Performance com K6

## 📌 Sobre o Projeto

Este projeto utiliza **K6** para realizar testes de carga, estresse e desempenho em uma API. O objetivo é validar a escalabilidade e estabilidade dos endpoints, garantindo que o sistema suporte altos volumes de requisições.

**API alvo dos testes:**  https://test-api.k6.io/

## 🛠 Tecnologias Utilizadas

-   [K6](https://k6.io/) - Ferramenta de teste de carga
    
-   JavaScript - Para scripts de teste
    
-   [PapaParse](https://www.papaparse.com/) - Manipulação de arquivos CSV    

    
-   Grafana K6 Cloud - Para monitoramento na nuvem
    

## 📂 Estrutura do Projeto

```
📦 k6-example-curso
 ┣ 📂 data
 ┃ ┣ 📜 data.json  # Arquivo JSON com dados de teste
 ┃ ┣ 📜 user.csv   # Usuários para autenticação
 ┣ 📂 tests
 ┃ ┣ 📜 cloud.js       # Teste com Grafana K6 Cloud
 ┃ ┣ 📜 load.js        # Teste de carga
 ┃ ┣ 📜 stress.js      # Teste de estresse
 ┃ ┣ 📜 performance.js # Teste de desempenho
 ┃ ┣ 📜 scenarios.js   # Cenários combinados de teste
 ┃ ┣ 📜 smoke.js       # Teste de fumaça
 ┣ 📜 README.md
 ┣ 📜 report.html
 ┣ 📜 reporter_k6.html
```

## 🚀 Como Executar os Testes

### 1️⃣ **Instalar o K6**

#### Linux/macOS:

```
brew install k6  # Para usuários do Homebrew
```

#### Windows (PowerShell):

```
choco install k6  # Para usuários do Chocolatey
```

Ou baixe diretamente através da documentação do [K6]( https://grafana.com/docs/k6/latest/) 

### 2️⃣ **Executar os Testes**

#### 🔹 **Teste de carga**

```
k6 run tests/load.js
```

#### 🔹 **Teste de estresse**

```
k6 run tests/stress.js
```

#### 🔹 **Teste de performance**

```
k6 run tests/performance.js
```

#### 🔹 **Execução com variáveis de ambiente**

```
k6 run tests/scenarios.js -e URL=https://test-api.k6.io/public
```
### 3️⃣ **Gerar o Dashboard**

#### Opção 1: Com saída para dashboard interativo

```
k6 run --out dashboard tests/scenarios.js
```

#### Opção 2: Com variável de ambiente (Linux/macOS)

```
export K6_WEB_DASHBOARD=true k6 run tests/scenarios.js
```

#### Opção 3: Com variável de ambiente (Windows PowerShell)

```
$env:K6_WEB_DASHBOARD="true" k6 run tests/scenarios.js
```

  
### 📊 Relatórios Gerados Os relatórios podem ser acessados diretamente nos arquivos HTML: 

- **Relatório Geral:** [report.html](./report.html) 
- **Relatório K6:** [reporter_k6.html](./reporter_k6.html)



### 4️⃣ **Executar Testes na Nuvem com Grafana K6 Cloud**

#### 🔹 Criar conta no **Grafana K6 Cloud**

Cadastre-se gratuitamente em: https://grafana.com/products/cloud/k6/

Você precisará do **ID do projeto** e do **seu token de usuário** para rodar os testes na nuvem.

  #### 🔹 **Autenticação no terminal antes da execução**

```
k6 login cloud --token <TOKEN>
```


#### 🔹 **Executar teste diretamente na nuvem**

```
k6 cloud tests/cloud.js
```

#### 🔹 **Executar localmente e enviar resultados para a nuvem**

```
k6 run --out cloud tests/cloud.js
```


## 📊 Analisando os Resultados

### 🔹 Métricas principais

-   `**http_req_duration**`: Tempo médio de resposta da API.
    
-   `**http_req_failed**`: Percentual de requisições com falha.
    
-   `**vus**`: Número de usuários virtuais simultâneos.
    
-   `**http_reqs**`: Total de requisições enviadas.
    
-   `**data_received**` **e** `**data_sent**`: Taxa de transferência de dados.    
