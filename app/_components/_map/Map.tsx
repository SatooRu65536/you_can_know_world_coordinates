'use client';

import 'leaflet/dist/leaflet.css';
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from 'react-leaflet';
import styles from './Map.module.scss';
import {
  LatLng,
  icon,
  Marker as MarkerIcon,
  LeafletEventHandlerFnMap,
} from 'leaflet';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import iconImage from 'leaflet/dist/images/marker-icon.png';

const DefaultIcon = icon({
  iconUrl: iconImage.src,
  iconSize: [iconImage.width, iconImage.height],
  iconAnchor: [iconImage.width / 2, iconImage.height],
  popupAnchor: [0, -40],
});
MarkerIcon.prototype.options.icon = DefaultIcon;

export default function CastleMap() {
  const [marker, setMarker] = useState<LatLng | null>(null);

  const eventHandlers: LeafletEventHandlerFnMap = {
    dragend: (e) => setMarker(e.target.getLatLng()),
  };

  const copyToClipboard = (value: string) => {
    navigator.clipboard.writeText(value);
  };

  useEffect(() => {
    if (marker === null) return;
    console.log(marker);
    copyToClipboard(`${marker.lat}, ${marker.lng}`);
  }, [marker]);

  return (
    <MapContainer
      center={new LatLng(35.183372060122736, 137.11430385463038)}
      zoom={17}
      scrollWheelZoom
      doubleClickZoom={false}
      className={styles.map_container}
    >
      <p>{marker && `${marker.lat}, ${marker.lng}`}</p>
      <InnerMapContainer setMarker={setMarker} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {marker && (
        <Marker position={marker} eventHandlers={eventHandlers} draggable>
          <Popup className={styles.popup}>
            {marker && `${marker.lat}, ${marker.lng}`}
          </Popup>
        </Marker>
      )}
    </MapContainer>
  );
}

type InnerMapContainerProps = {
  setMarker: Dispatch<SetStateAction<LatLng | null>>;
};

function InnerMapContainer(props: InnerMapContainerProps) {
  const { setMarker } = props;

  useMapEvents({
    dblclick: (e) => setMarker(e.latlng),
  });

  return <div />;
}
