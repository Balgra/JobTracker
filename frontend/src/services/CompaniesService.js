import { GetToken } from "./AuthStatus";


const apiUrl = 'https://localhost:7002/'

export const GetCompanies = async () => {
    var response = await fetch(apiUrl + 'companies', {
        headers: {'Authorization' : 'Bearer ' + GetToken(), 'Content-Type': 'application/json'},
    });
    var body = await response.json();
    return body;
}