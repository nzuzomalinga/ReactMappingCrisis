import './Styles/App.scss'
import useGeoLocation from './Hooks/useGeolocation';
import { Map } from './Components/Map';


export const App = ( ) => {

  const location = useGeoLocation()

  return (
  
    <Map location={location.coordinates} />

  );
}
