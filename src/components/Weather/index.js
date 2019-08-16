import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Map from '../Map';

function Weather() {
  const [location, setLocation] = useState(false);
  const [weather, setWeather] = useState(false);

  let getWeather = async (latitude, longitude) => {
    let res = await axios.get('http://api.openweathermap.org/data/2.5/weather', {
      params: {
        lat: latitude,
        lon: longitude,
        appid: process.env.REACT_APP_OPEN_WEATHER_KEY,
        lang: 'pt',
        units: 'metric'
      }
    });
    setWeather(res.data);
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      getWeather(position.coords.latitude, position.coords.longitude);
      setLocation(true);
    });
  }, []);

  function callbackFunction(cb) {
      console.log(cb);
      getWeather(cb.lngLat.lat, cb.lngLat.lng);
  }

  if (location === false) {
    return(
      <>
        <h3>Você precisa habilitar a Localização no browser para continuar.</h3>
      </>
    );
  } else if (weather === false) {
    return (
      <>
        <h3>Carregando clima...</h3>
      </>
    )
  } else {
    return (
      <>
        <h3>Clima nas suas coordenadas ({weather['weather'][0]['description']})</h3>
        <hr />
        <ul>
          <li>Temperatura atual: {weather['main']['temp']}º</li>
          <li>Temperatura máxima: {weather['main']['temp_max']}º</li>
          <li>Temperatura mínima: {weather['main']['temp_min']}º</li>
          <li>Pressão: {weather['main']['pressure']} hpa</li> 
          <li>Umidade: {weather['main']['humidity']}%</li>
        </ul>        
        <Map parentCallback={callbackFunction} />
      </>
    );
  }
}

export default Weather;