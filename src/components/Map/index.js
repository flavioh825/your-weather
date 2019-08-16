import React, {useState, useEffect} from 'react';
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";

function Map({parentCallback}) {  
  const MapGL = ReactMapboxGl({
    accessToken: process.env.REACT_APP_MAPBOX_API_TOKEN
  });

  let mapStyle = { style: 'mapbox://styles/mapbox/dark-v9'}

  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
  }, []);

  function onClickMap(map, e) {
    setLatitude(e.lngLat.lat);
    setLongitude(e.lngLat.lng);
  }

  let sendData = (map, e) => {
    parentCallback(e);
  }
  
  return(
    <>
      <p>localização atual: {latitude} - {longitude}</p>
      <MapGL
        style={mapStyle.style}
        containerStyle={{
          height: "100vh",
          width: "100vw"
        }}
        zoom={[10.8]}
        onDblClick={sendData}>
        <Layer
          type="symbol"
          id="marker"
          layout={{ "icon-image": "marker-15" }}>
          <Feature coordinates={[latitude, longitude]} />
        </Layer>
      </MapGL>
    </>
  );
}

export default Map;