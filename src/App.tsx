import './Styles/App.scss'
import useGeoLocation from './Hooks/useGeolocation';
import { Map } from './Components/Map';
import { createContext, useState } from 'react'
import { LoginScreen } from './Components/LoginScreen';

const loginItem: string = localStorage.getItem('loginData') as string

const key: string | undefined = process.env.REACT_APP_CLIENT_ID

export const App = () => {

  const [loginData, setLoginData] = useState(
    loginItem
      ? JSON.parse(loginItem)
      : null
  );

    
  const location = useGeoLocation()

  const handleFailure = (result: any) => {
    alert("Failed to Log in, Please choose a valid Gmail Account");
  };

  const handleLogin = async (googleData: any) => {
    const res = await fetch('/api/google-login', {
      method: 'POST',
      body: JSON.stringify({
        token: googleData.tokenId,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await res.json();
    setLoginData(data);
    localStorage.setItem('loginData', JSON.stringify(data));
  };
  const handleLogout = () => {
    localStorage.removeItem('loginData');
    setLoginData(null);
  };

  return (
    
      loginData ?
        
          <Map location={location} logout= {handleLogout} user={loginData} /> 
        :

        <LoginScreen id={key} handleFailure={handleFailure} handleLogin={handleLogin}/>
  );
}