import React, { useCallback, useState, useEffect } from 'react';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
} from 'react-google-maps';
import Geocode from 'react-geocode';
import { googleMapKey } from 'config/env';
import isEmpty from 'lodash-es/isEmpty';

function Map({ setFieldValue, markedPos, draggable }) {
  const [isOpen, setOpen] = useState(false);
  const [address, setAddress] = useState(null);
  const [currentPos, setCurrentPos] = useState(null);

  useEffect(() => {
    Geocode.setApiKey(googleMapKey);
    if (!isEmpty(markedPos)) {
      setCurrentPos(markedPos);
      if (!currentPos) {
        getLocation(markedPos.lat, markedPos.lng);
      }
    }
  }, [markedPos, setCurrentPos, currentPos]);

  const onMapClick = useCallback(
    (e) => {
      if (draggable) {
        getLocation(e.lat(), e.lng());
        setFieldValue('latitude', e.lat());
        setFieldValue('longitude', e.lng());
        setCurrentPos({ lat: e.lat(), lng: e.lng() });
      }
    },
    [setFieldValue, draggable],
  );

  const getLocation = (lat, lng) => {
    Geocode.fromLatLng(lat, lng).then(
      (response) => {
        const address = response.results[0].formatted_address;
        setAddress(address);
      },
      (error) => {
        console.error(error);
      },
    );
  };

  return (
    <GoogleMap
      defaultZoom={11}
      defaultCenter={{ lat: 9.6801489, lng: 80.0941793 }}
      onClick={(e) => onMapClick(e.latLng)}>
      <Marker
        draggable={draggable}
        position={currentPos}
        onClick={() => setOpen(true)}>
        {isOpen && (
          <InfoWindow onCloseClick={() => setOpen(false)}>
            <p style={{ fontSize: '13px' }}>{address}</p>
          </InfoWindow>
        )}
      </Marker>
    </GoogleMap>
  );
}

export default withScriptjs(withGoogleMap(Map));
