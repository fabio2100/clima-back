const axios = require('axios')

export default async function handler(req, res) {
    
    const ciudad = req.query.city;
    const params = {
        'access_token':process.env.MAPBOX_KEY || '',
        'limit': 8,
        'language':'es'
    };

    try {
        const instance = axios.create({
          baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${ ciudad }.json`,
          params: params
        })
        const respuesta = await instance.get();
        const ver = respuesta.data.features.map(lugar => ({
          id:lugar.id,
          nombre:lugar.place_name_es,
          lat: lugar.center[1],
          longi: lugar.center[0]
        }));
        return res.status(200).send(ver)
      } catch (error) {
          console.log(error)
          console.log('Ciudad no encontrada')
          return [];
      }
}