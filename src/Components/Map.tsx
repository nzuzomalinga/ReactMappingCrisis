import { MapContainer, Marker, Popup, TileLayer, } from 'react-leaflet'
import { Audio } from 'react-loader-spinner'
import { OpenStreetMapProvider } from 'leaflet-geosearch'
import '../Styles/Components/Maps.scss'
import { useContext, useState } from 'react'
import { SearchBar } from './SearchBar'

export const Map = ({ location, logout, user }: any) => {

  const [results, setResults] = useState([{}])

  //const provider = new OpenStreetMapProvider()
  //const result = provider.search({ query: "postnet johannesburg" })

  console.log(user.picture)

  return (

    location.loaded ? <>

      <MapContainer center={[location.coordinates.lat, location.coordinates.lng]} zoom={20}>

        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={[location.coordinates.lat, location.coordinates.lng]}>
          <Popup>
            <b>Your current location</b>
             <br /> 
             <img src={user.picture} style={{paddingLeft:"10px"}}/>.
          </Popup>
        </Marker>
      </MapContainer>

      <button id='logout-btn' onClick={logout}>Logout</button>
    </>
      : <div className='loading-screen'>
        <Audio
          height="100"
          width="100"
          color='grey'
          ariaLabel='loading'
        />
      </div>
  )
}