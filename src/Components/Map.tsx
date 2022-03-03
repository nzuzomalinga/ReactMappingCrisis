import { MapContainer, Marker, Popup, TileLayer, Polyline} from 'react-leaflet'
import { Audio } from 'react-loader-spinner'
import '../Styles/Components/Maps.scss'
import { useState } from 'react'
import { Panel } from './Panel'
import {ImFire} from 'react-icons/im'
import { Draggable } from 'leaflet'


export const Map = ({ location, logout, user }: any) => {

  const [crisis, setCrisis] = useState([{}])
  const [places, setPlaces] = useState([{}])
  const [visible, setVisibility] = useState(false)
  const [panel, setPanel] = useState(true)

  const addCrisis = (newCrisis: any) => {
    setCrisis([...crisis, newCrisis])
  }

  const polyline :any = [
    [51.505, -0.09],
    [51.51, -0.1],
    [51.51, -0.12],
  ]
  const limeOptions = { color: 'lime' }

  const getDistanceFromLatLonInKm = (lat1:number, lon1:number, lat2:number, lon2:number) => {
    //REFRENECE: https://en.wikipedia.org/wiki/Haversine_formula

    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return Math.round(d);
  }
  
  const deg2rad = (deg:number) => {

    return deg * (Math.PI/180)
  }


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
            <img src={user.picture} style={{ paddingLeft: "10px" }} />.
          </Popup>
        </Marker>
        <Polyline pathOptions={limeOptions} positions={polyline} />

        {crisis && crisis.map(
          (crisis: any, index: number) => {

            if (!crisis.phone) return

            return (
              
              <Marker position={[crisis.place.y, crisis.place.x] }
          
              eventHandlers={{click: ()=>{}}} >
                <Popup>
                  <b>{crisis.tag}</b>
                  <br />
                  <p>{crisis.description}</p>
                  <p>Reported by {user.name}</p>
                  <br />
                  <p>Displacement in KM: {getDistanceFromLatLonInKm(crisis.place.y, crisis.place.x,location.coordinates.lat, location.coordinates.lng)}</p>
                  
                </Popup>
              </Marker>
              
            )

          }
        )}

      </MapContainer>

      <button id='hide-btn' onClick={() => setPanel(!panel)}><ImFire/></button>

      <button id='logout-btn' onClick={logout}>Logout</button>

      <Panel places={places} panel={panel} visible={visible}
        setVisibility={setVisibility} setPlaces={setPlaces} addCrisis={addCrisis} />
    </>
      : 
      <div className='loading-screen'>
        <Audio
          height="100"
          width="100"
          color='grey'
          ariaLabel='loading'
        />
      </div>

  )
}