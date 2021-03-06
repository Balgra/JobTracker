

export const IsAuthenticated = () => {
	const storage = localStorage.getItem("loginData");
	if(storage) {
		const session = JSON.parse(storage);
		if(!(session && session.token))
			return false;
		if (Date.now() >= new Date(session?.exp * 1000)) {

			return false;
		}
		return true;
	}
	return false;
}

export const Logout = () =>{
	localStorage.removeItem('loginData');
}

export const GetToken = () => {
	if (IsAuthenticated())
	{
		var payload = JSON.parse(localStorage.getItem("loginData"))
		return payload.token;
	}
	return undefined;
} 