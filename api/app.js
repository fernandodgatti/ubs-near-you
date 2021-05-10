const express = require('express')
const cors = require('cors')
const fetch = require("node-fetch")
const app = express()


let UBS = false;
let dataUBS = {};



const getLocation = cep => {
    const headersGoogleMaps = new fetch.Headers()
    const roGoogleMaps = {
        method: 'GET',
        headers: headersGoogleMaps,
        redirect: 'follow'
    };
    return fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${cep}&key=AIzaSyCqTQRxQotPtzLUcLf_as8-weCmJHo6UXs`, roGoogleMaps)
}
const getUBS = () => {
    const headersUBS = new fetch.Headers()
    const roUBS = {
        method: 'GET',
        headers: headersUBS,
        redirect: 'follow'
    };
    headersUBS.append("Content-Type", "application/json")
    headersUBS.append("Authorization", "Bearer 4473dca6b489cc15b867f952c792f5c0")
    return fetch("https://gatewayapi.prodam.sp.gov.br:443/saude/ubs/v1.0/", roUBS)
  }
const haversine = (latUser, lonUser, latUbs, lonUbs) => {
    const deg2rad = 0.017453292519943295;
    let cos = Math.cos;
    latUser *= deg2rad;
    lonUser *= deg2rad;
    latUbs *= deg2rad;
    lonUbs *= deg2rad;
    const diam = 12742;
    const dLat = latUbs - latUser;
    const dLon = lonUbs - lonUser;
    const a = ((1 - cos(dLat)) + (1 - cos(dLon)) * cos(latUser) * cos(latUbs)) / 2;
    return diam * Math.asin(Math.sqrt(a)) * 1000;
};
const filterUBS = (lat, lon) => {
    const arrayMap =  dataUBS.map(ubs => {
        return {
            title: ubs.bairroEnderecoUBS,
            distancia: haversine(lat, lon, ubs.geoLocalizacaoUSB.latitude, ubs.geoLocalizacaoUSB.longitude),
            lat: ubs.geoLocalizacaoUSB.latitude,
            lon: ubs.geoLocalizacaoUSB.longitude
        }
    });
    const arraySort = arrayMap.sort((a,b) => a.distancia < b.distancia ? -1 : (a.distancia > b.distancia) ? 1 : 0);
    const arraySortMap = arraySort.map(a => a.distancia);
    return arraySort.filter(({distancia}, index) => !arraySortMap.includes(distancia, index + 1));
}

app.use(express.json());
app.use(cors());
app.post('/', (req, res) => {
    if(UBS){
        getLocation(req.body.cep)
        .then(response => response.json())
        .then(r => {
            res.send({
                userLatitude: r.results[0].geometry.location.lat,
                userLongitude: r.results[0].geometry.location.lng,
                ubs:[...filterUBS(r.results[0].geometry.location.lat, r.results[0].geometry.location.lng).slice(0,10)]
            });
        })
        .catch(error => {
            console.log(error);
            res.send('CEP NÃO ENCONTRADO')
        });
    } else {
        res.send('UBS API AINDA NÃO ESTABELECEU COMUNICAÇÃO')
    }
});

app.listen(3000, () => {
    console.log('Localizador de UBS - API')
    console.log('INICIANDO COMUNICAÇÃO COM UBS API')
    getUBS()
    .then(response => response.json())
    .then(r => {
        dataUBS = r;
        UBS = true;
        console.log('SUCESSO!')
        console.log('Comunicação estabelecida com UBS API')
    })
    .catch(e => {
        console.log('OCORREU UM PROBLEMA!');
        console.log('Não foi possível estabelecer uma comunicação com UBS API')
        console.log('Lembrando que temos um limite de apenas 3 requisições por minuto')
        console.log(`Detalhes do erro: ${e}`)
    });
});