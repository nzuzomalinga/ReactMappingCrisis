import './Styles/App.scss'
import useGeoLocation from './Hooks/useGeolocation';
import { Map } from './Components/Map';
import { createContext, useState } from 'react'
import { LoginScreen } from './Components/LoginScreen';

let loginItem: string = localStorage.getItem('loginData') as string
const UserContext = createContext(null)

export const App = () => {

  const [loginData, setLoginData] = useState(
    loginItem
      ? JSON.parse(loginItem)
      : null
  );

  

  const id: string = "33851024663-ovd2n28igfo9kpp2s92hq47bqjjlgjs2.apps.googleusercontent.com"
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
  <UserContext.Provider value={loginData}>
    {
      loginData ?

        
          <Map location={location} logout= {handleLogout} user={loginData} />
        
        
        :

        <LoginScreen id={id} handleFailure={handleFailure} handleLogin={handleLogin}/>
    }
    </UserContext.Provider>
  
  );
}