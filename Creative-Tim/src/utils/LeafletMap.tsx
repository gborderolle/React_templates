// Clase 83: https://www.udemy.com/course/desarrollando-aplicaciones-en-react-y-aspnet-core/learn/lecture/25926740#overview
import {
  MapContainer,
  TileLayer,
  useMapEvent,
  Popup,
  Marker as LeafletMarker,
} from "react-leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useState } from "react";
import { coordinateDTO } from "./coordinateDTO";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconAnchor: [16, 37],
});

L.Marker.prototype.options.icon = DefaultIcon;

export default function LeafletMap(props: leafletMapProps) {
  const [coordinates, setCoordinates] = useState<coordinateDTO[]>(
    props.coordinates
  );

  let init: L.LatLngTuple = [-34.90783547400955, -56.192392002849544];
  if (props.centerInit) {
    init = [
      props.centerInit.latitude,
      props.centerInit.longitude,
    ] as L.LatLngTuple;
  }

  return (
    <MapContainer center={init} zoom={14} style={{ height: props.height }}>
      <TileLayer
        attribution="React películas"
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {props.readOnly ? null : (
        <MapClick
          setPoint={(coordinates) => {
            setCoordinates([coordinates]);
            props.clickMapEvent(coordinates);
          }}
        />
      )}
      {coordinates.map((coord: coordinateDTO) => (
        <MapMarker key={coord.latitude + coord.longitude} {...coord} />
      ))}
    </MapContainer>
  );
}

interface leafletMapProps {
  height: string;
  coordinates: coordinateDTO[];
  clickMapEvent(coordinates: coordinateDTO): void;
  centerInit?: coordinateDTO;
  readOnly: boolean;
}

LeafletMap.defaultProps = {
  height: "500px",
  readOnly: false,
  clickMapEvent: () => {},
};

function MapMarker(props: coordinateDTO) {
  return (
    <LeafletMarker position={[props.latitude, props.longitude]}>
      {props.name ? <Popup>{props.name}</Popup> : null}
    </LeafletMarker>
  );
}

function MapClick(props: mapClickProps) {
  useMapEvent("click", (e) =>
    props.setPoint({ latitude: e.latlng.lat, longitude: e.latlng.lng })
  );
  return null;
}

interface mapClickProps {
  setPoint(coordinates: coordinateDTO): void;
}
