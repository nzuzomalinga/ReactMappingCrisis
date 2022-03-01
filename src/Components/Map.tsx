import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import '../Styles/Components/Maps.scss'


export const Map = ( {location} :any) => {
  return (
    <MapContainer center={[location.lat,location.lng]}zoom={20}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[location.lat,location.lng]}>
        <Popup>
          You are Here. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  )
}