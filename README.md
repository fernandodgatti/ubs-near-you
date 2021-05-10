# Vue + Google API + Ubs API

Exibe as UBS's da cidade de São Paulo, onde o usuário pode inserir o CEP e conseguirá visualizar as UBSs mais próximas da sua região.

## Instalação
 * Instale o [Node.js](https://nodejs.org/en/), todas as dependências do projetos são baixados via NPM.


Abra a pasta **app** no terminal e execute o seguinte comando para baixar as dependências do front-end:
```bash
npm i 
```

Abra a pasta **api** no terminal e execute o seguinte comando para baixar as dependências da api:
```bash
npm i 
```

## Executar o projeto

### Front-end
O projeto será executado em:
[http://localhost:8080](http://localhost:8080)

Use os seguintes comando dentro da pasta **app** para:

#### Ambiente de desenvolvimento
```
npm run serve
```

#### Build para produção
```
npm# run build
```

#### Lint 
```
npm run lint
```

### Back-end
O projeto será executado em:
[http://localhost:3000](http://localhost:3000)

Use os seguintes comando dentro da pasta **api** para:
#### Inicializar API
```
node app.js
```
## Documentação
Não optamos pelo uso do swagger, já que o projeto possui apenas **um endpoint**.
Assim que API é iniciada, realizamos uma consulta na UBS API, mantemos os dados em memória.
O usuário insere o valor CEP, consultamos a latitude e longitude no Google API, convertemos a posição das UBS's em um único valor usando a fórmula de haversine, usando como base  os dados retornados do Google API. Depois retornamos as **10** unidades mais próximas do usuário.

### POST - Enviar CEP
Endpoint
```
http://localhost:3000/
```
Body
```
{
  "cep": "05520200"
}
```

Reponse
```
{
    "userLatitude": -23.5970754,
    "userLongitude": -46.7401426,
    "ubs": [
        {
            "title": "VL  SONIA",
            "distancia": 547.5722734888624,
            "lat": -23.597638,
            "lon": -46.734804
        },
        {
            "title": "JD JAQUELINE",
            "distancia": 1213.5993891947915,
            "lat": -23.594884,
            "lon": -46.75181
        },
        {
            "title": "JARDIM COLOMBO",
            "distancia": 1350.2510952730204,
            "lat": -23.601797,
            "lon": -46.727934
        },
        {
            "title": "JD PERI PERI",
            "distancia": 1423.5329831274612,
            "lat": -23.5866,
            "lon": -46.732112
        },
        {
            "title": "JD PINHEIROS",
            "distancia": 1449.3248178764934,
            "lat": -23.584118,
            "lon": -46.738602
        },
        {
            "title": "PARAISÓPOLIS",
            "distancia": 2192.897757492695,
            "lat": -23.612094,
            "lon": -46.726194
        },
        {
            "title": "VL  GOMES",
            "distancia": 2318.260646587322,
            "lat": -23.577004,
            "lon": -46.733989
        },
        {
            "title": "VL  PRAIA",
            "distancia": 2319.526418075506,
            "lat": -23.617277,
            "lon": -46.745817
        },
        {
            "title": "JD PREVIDÊNCIA",
            "distancia": 2434.992555755682,
            "lat": -23.579407,
            "lon": -46.726026
        },
        {
            "title": "PARAISOPOLIS",
            "distancia": 2444.7330814215097,
            "lat": -23.613973,
            "lon": -46.724792
        }
    ]
}
```


##
### APIs usadas no projeto
Optamos por usar duas APIs no nosso projeto, a API de UBS disponibilizada pelo governo, retorna todas as UBS's da cidade de São Paulo com suas respectivas lagitude e longitude, posteriormente usamos a APIs Maps do google passando todas as longitudes e latitudes recebidas e marcando no mapa, o usuário pode incluir seu endereço para exibir o Markdown de onde ele está no momento, conseguindo visualizar as UBSs mais próximas de sua localização.

### Documentação API Google Maps
```
https://developers.google.com/maps/documentation?hl=pt-br
```

### Documentação API UBS
```
https://api.prodam.sp.gov.br/store/apis/info?name=UBS&version=v1.0&provider=admin&
```
