const axios = require('axios')

export default async function handler(req, res) {
    
    const coordenadas = req.query.coordenadas;
    const latitud = coordenadas[0];
    const longitud = coordenadas[1];

    const paramsOpenWeather = {
        'appid':process.env.OPENWEATHER_KEY || '',
        'lat':`${latitud}`,
        'lon':`${longitud}`,
        'units':'metric',
        'lang':'es'
      }
    
      try {
        const instance = axios.create({
          baseURL: 'https://api.openweathermap.org/data/2.5/weather',
          params: paramsOpenWeather
        })
        const respuesta = await instance.get();
        const {weather,main,wind,name} = respuesta.data;
        const resultado = {
          desc: weather[0].description,
          min: main.temp_min,
          max: main.temp_max,
          temp: main.temp,
          humedad: main.humidity,
          presion: main.pressure,
          nivelDelMar: main.sea_level,
          viento: wind.speed,
          nombre: name
        };
        return res.status(200).send(resultado)
      } catch (error) {
        console.log(error)
        return res.status(503).json({'error':`Servicio no disponible - Api Weather`});
      }
}