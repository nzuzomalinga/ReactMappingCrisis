import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import { Audio } from 'react-loader-spinner'
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import '../Styles/Components/Maps.scss'

export const Map = ({ location }: any) => {
  
const provider = new OpenStreetMapProvider();

const results = provider.search({ query: "postnet johannesburg" });

  return (

    location.loaded ? <MapContainer center={[location.coordinates.lat, location.coordinates.lng]} zoom={20}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[location.coordinates.lat, location.coordinates.lng]}>
        <Popup>
          You are Here. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer> : <div className='loading-screen'>
      <Audio
        height="100"
        width="100"
        color='grey'
        ariaLabel='loading'
      />
    </div>
  )
}