import GoogleLogin from 'react-google-login';

export const LoginScreen = ( { id, handleLogin, handleFailure } :any ) => {
    
    return (
        <div className={"login-screen"}>

            <h1>Please login with your gmail account</h1>

            <GoogleLogin
            clientId={id}
            buttonText="Log in with Google"
            onSuccess={(res) => { handleLogin(res) }}
            onFailure={(res) => { handleFailure(res) }}
            cookiePolicy={'single_host_origin'}></GoogleLogin>
        </div>
    )
}