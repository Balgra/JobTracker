import GoogleLogin from 'react-google-login';
import {useState} from "react";

const LoginPage = () => {
	
	const [loginData, setLoginData] = useState(
		localStorage.getItem('loginData')
		? JSON.parse(localStorage.getItem('loginData')) : null
	);
	const handleFailure= (result) =>{
		alert(result);
	};
	
	// const handleLogin = (googleData) =>{
	// 	console.log(googleData);
	// };
	
	function parseJwt (token) {
		var base64Url = token.split('.')[1];
		var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
		var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
			return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
		}).join(''));
		
		return JSON.parse(jsonPayload);
	};
	
	const handleLogin = async (googleData) =>{
		await fetch ('https://localhost:7002/api/users', {
			method: 'POST',
			headers:{
				'Content-Type':'application/json',
				'Authorization':'Bearer '+ googleData.tokenId
			},
		});
		
		const data = parseJwt(googleData.tokenId)
		data.token = googleData.tokenId
		setLoginData(data);
		localStorage.setItem('loginData', JSON.stringify(data));
	};
	
	const handleLogout = () =>{
		localStorage.removeItem('loginData');
		setLoginData(null);
	}
	
	// noinspection CheckTagEmptyBody
	return (
		<div className="App">
			<header className="App-header">
				
				<h1> React Google Login App</h1>
				<div>
					{
							loginData ?(
								<div>
									<h3>You logged in as {loginData.email}</h3>
									<button onClick={handleLogout}>Logout</button>
								</div>
							)
							:(
								<GoogleLogin
									clientId={process.env.REACT_APP_GOOGLE_CLIENT_I}
									buttonText="Log in with Google"
									onSuccess={handleLogin}
									onFailure={handleFailure}
									cookiePolicy={'single_host_origin'}
								></GoogleLogin>
							)
					}
				</div>
			</header>
			
		</div>
		
	);
}

export default LoginPage;
