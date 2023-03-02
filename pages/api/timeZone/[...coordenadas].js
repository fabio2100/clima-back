const axios = require('axios');


export default async function handler(req, res) {
    const coordenadas = req.query.coordenadas;
    const latitud = coordenadas[0];
    const longitud = coordenadas[1];

    const paramsBingMaps = {
        'key' : process.env.BINGMAPS_KEY || '',
        'query' : `${latitud}`+','+`${longitud}`
      };
    
      try {
        const instance = axios.create({
          baseURL: 'https://dev.virtualearth.net/REST/v1/TimeZone/',
          params : paramsBingMaps
        });
        const respuesta = await instance.get();
        const respuestaAEnviar = respuesta.data.resourceSets[0].resources[0].timeZoneAtLocation[0].timeZone[0].convertedTime;
        return res.status(200).json(respuestaAEnviar)
      } catch (error) {
        console.log(error)
        return res.status(200).json([{'localtime':'No definido'}]);
      }

}