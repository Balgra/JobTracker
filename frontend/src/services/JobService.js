import { GetToken } from "./AuthStatus";

const apiUrl = 'https://localhost:7002/api/'

export const AddJob = (jobName, status, companyId, notes, deadline) => {
    return fetch(apiUrl + 'jobs', {
        method: 'POST',
        headers: {'Authorization' : 'Bearer ' + GetToken(), 'Content-Type': 'application/json'},
        body: JSON.stringify({jobName, status, companyId, notes, deadline})
    });
}

export const GetJobs = async () => {
    var response = await fetch(apiUrl + 'jobs', {
        headers: {'Authorization' : 'Bearer ' + GetToken(), 'Content-Type': 'application/json'},
    });
    var body = await response.json();
    return body;
}