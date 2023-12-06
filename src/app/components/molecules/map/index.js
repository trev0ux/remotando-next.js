import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

const OpenStreetMap = ({ location }) => {
  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={13}
      scrollWheelZoom={false}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {location && (
        <Marker position={location}>
          <Popup>{location.display_name}</Popup>
        </Marker>
      )}
    </MapContainer>
  );
};

export default OpenStreetMap;
