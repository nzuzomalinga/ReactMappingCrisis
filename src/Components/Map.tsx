import { MapContainer, Marker, Popup, TileLayer, Polyline, Pane, Circle } from 'react-leaflet'
import { Audio } from 'react-loader-spinner'
import '../Styles/Components/Maps.scss'
import { useState } from 'react'
import { Panel } from './Panel'
import { ImFire } from 'react-icons/im'
import { AiOutlineLogout } from 'react-icons/ai'



export const Map = ({ location, logout, user }: any) => {

  const [crisis, setCrisis] = useState([{}])
  const [places, setPlaces] = useState([{}])
  const [visible, setVisibility] = useState(false)
  const [panel, setPanel] = useState(true)

  const [duplicate, setDuplicate] = useState(false)

  const addCrisis = (newCrisis: any) => {
    setCrisis([...crisis, newCrisis])
  }

  const polyline: any = [
    [51.505, -0.09],
    [51.51, -0.1],
    [51.51, -0.12],
  ]
  const limeOptions = { color: 'lime' }

  const getDistanceFromLatLonInKm = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    //REFRENECE: https://en.wikipedia.org/wiki/Haversine_formula

    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1);  // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2)
      ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return Math.round(d);
  }

  const deg2rad = (deg: number) => {

    return deg * (Math.PI / 180)
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
        <Pane name="orange-circle" style={{ zIndex: 500 }}>

          <Circle
            center={[location.coordinates.lat, location.coordinates.lng]}
            radius={10000}
            pathOptions={{ color: "orange" }}
          />
        </Pane>

        {crisis && crisis.map(
          (incident: any, index: number) => {
            if (!incident.phone) return

            const distance = getDistanceFromLatLonInKm(incident.place.y, incident.place.x, location.coordinates.lat, location.coordinates.lng)

            return (

              <Marker position={[incident.place.y, incident.place.x]}

                eventHandlers={{ click: () => { } }} >
                <Popup>
                  <h2>Reported Crisis: <span><b>{incident.tag}</b></span></h2>
                  <br />
                  <p>{incident.description}</p>
                  <h3>Reported by: {user.name}</h3>
                  <br />
                  <h4>Displacement in Km: {distance}</h4>

                </Popup>
              </Marker>

            )

          }
        )}

      </MapContainer>

      <button id='hide-btn' onClick={() => setPanel(!panel)}>Menu
        <span style={{ marginLeft: "0.5rem" }}><ImFire /></span>
      </button>

      <button id='logout-btn' onClick={logout}>Logout <span>
        <AiOutlineLogout style={{ margin: "-2px" }} />
      </span></button>

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