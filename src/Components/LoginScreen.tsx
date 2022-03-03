import GoogleLogin from 'react-google-login';
import {ImFire} from 'react-icons/im'
import '../Styles/Components/Login.scss'

export const LoginScreen = ( { id, handleLogin, handleFailure } :any ) => {
    
    return (
        <div className={"login-screen"}>

            <h1 className={"first-header"}>Crisis Watch <span><ImFire/></span></h1>

            <GoogleLogin
            clientId={id}
            buttonText="Log in with Google"
            onSuccess={(res) => { handleLogin(res) }}
            onFailure={(res) => { handleFailure(res) }}
            cookiePolicy={'single_host_origin'}></GoogleLogin>
        </div>
    )
}