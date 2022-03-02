import { MapContainer, Marker, Popup, TileLayer, } from 'react-leaflet'
import { Audio } from 'react-loader-spinner'
import { OpenStreetMapProvider } from 'leaflet-geosearch'
import '../Styles/Components/Maps.scss'
import { ChangeEvent, useContext, useEffect, useState } from 'react'
import { SearchBar } from './SearchBar'

export const Map = ({ location, logout, user }: any) => {

  const [crisis, setCrisis] = useState( [{}] )
  const [selected, setSelected] = useState( {} )
  const [search, setSearch] = useState( "" )
  const [places, setPlaces] = useState( [{}] )
  const [visible, setVisibility] = useState(false)

  const provider = new OpenStreetMapProvider( )


  useEffect( ( ) => {

    provider.search({ query: search}).then( (res) => {
      setPlaces(res)
      setVisibility(true)
    })
  }, [search] )
  
  
  const places_query = ( e : any ) => {
    setSearch(e.target.value)
  }

  const retrievePlace = ( place : any ) => {
    setSelected( place )
  }


  console.log(selected,)

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
      <SearchBar query={places_query} results={places} retrieve = {retrievePlace} visible={visible} setVisible = {setVisibility}/>
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