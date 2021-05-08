# Vue + Google API + Ubs API

Exibe as UBS's da cidade de São Paulo, onde o usuário pode inserir o CEP e conseguirá visualizar as UBSs mais próximas da sua região.

## Instalação
 * Instale o [Node.js](https://nodejs.org/en/), todas as dependências do projetos são baixados via NPM.


Abra a pasta **app** no terminal e execute o seguinte comando para baixar as dependências do front-end:
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
