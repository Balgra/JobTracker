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
    let response = await fetch(apiUrl + 'jobs', {
        headers: {'Authorization' : 'Bearer ' + GetToken(), 'Content-Type': 'application/json'},
    });
    let body = await response.json();
    return body;
}

export const GetJobById = async (id) => {
    let response = await fetch(apiUrl + 'jobs?id=' + id, {
        headers: {'Authorization' : 'Bearer ' + GetToken(), 'Content-Type': 'application/json'},
    })
    let body = await response.json();
    return body;
}