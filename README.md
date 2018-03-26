# extract_queries_service

## Synopsis
***
#### Servei que extreu queries d'un log

## Dependències

Servei basat amb [NodeJs](https://nodejs.org/en/)

## Installation
***
Provat en un Ubuntu 16 LTS xenia

##### Configuració Node

    git clone http://montmajor.icc.local/m.ortega/extract_queries.git
    npm install
    node extract_queries.js

## Tests
***
##### Executar aplicació Test
  <http://172.30.28.32/extract_queries/test/index.html>.

## API REST
  ***
  * http://172.30.28.32/zoomvt/:scale/:dpi/:lat
    * Què? obtener un zoom level según escala, dpis y latitud
    * Metode: GET
    * Paràmetres:
      * scale: escala
      * dpi: dpis impressió
      * lat: latitud
    * Exemple: http://172.30.28.32/zoomvt/5000/72/41.5461
               http://172.30.28.32/zoomvt/?scale=25000&dpi=72&lat=42
 

### GIT deploy en el servior

## Per fer pull GIT
```
cd /dades/html/extract_queries

sudo git pull

pm2 restart extract_queries.js
```

### Posar a producció aplicació NodeExpress JS amb PM
http://expressjs.com/en/advanced/pm.html#pm2

```
      sudo npm install pm2 -g
      cd /dades/html/extract_queries
      pm2 start extract_queries.js
```
#### List all running processes:
```
pm2 list
```
#### Stop an app:
```
pm2 stop extract_queries.js
```
#### Restart an app:
```
pm2 restart extract_queries.js
```

#### To view detailed information about an app:
```
pm2 show extract_queries.js
```
#### To remove an app from PM2’s registry:
```
pm2 delete extract_queries.js
```


## Contributors
***
Desenvolupat per GEOSTART

*Fet amb el millor gust possible*

Institut Cartogràfic i Geològic de Catalunya (ICGC) Maig 2017

Barcelona - Catalunya

[http://betaportal.icgc.cat](http://betaportal.icgc.cat) - Betaportal

[http://www.icgc.cat](http://www.icgc.cat) - ICGC


## License
***

MIT
