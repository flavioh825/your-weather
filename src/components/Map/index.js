import React, {useState, useEffect} from 'react';
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";

function Map({locationInfo}) {  
  const MapGL = ReactMapboxGl({
    accessToken: process.env.REACT_APP_MAPBOX_API_TOKEN
  });

  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
  }, []);

  let mapStyle = { style: 'mapbox://styles/mapbox/streets-v9'}

  let catchLocationInfo = (map, e) => {
    locationInfo(e);
    setLatitude(e.lngLat.lat);
    setLongitude(e.lngLat.lng);
  }
  
  return(
    <>
      <MapGL
        style={mapStyle.style}
        containerStyle={{height: 400, width: 1024}}
        zoom={[10.8]}
        center={[longitude, latitude]}
        onClick={catchLocationInfo}>
        <Layer
          type="symbol"
          id="marker"
          layout={{ "icon-image": "marker-15" }}>
          <Feature coordinates={[longitude, latitude]} />
        </Layer>
      </MapGL>
    </>
  );
}

export default Map;