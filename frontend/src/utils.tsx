import axios from "axios";

export const API_ENDPOINT = "http://localhost:3001";

export async function getRequest(path: string, edpoint = API_ENDPOINT) {
    const results = await axios.get(`${edpoint}${path}`, {withCredentials: true});
    return results;
}

export async function postRequest(
    path: string,
    data: object,
    edpoint = API_ENDPOINT
) {
    const results = await axios.post(`${edpoint}${path}`, data, {withCredentials: true});
    return results;
}

export async function deleteRequest(path: string, edpoint = API_ENDPOINT) {
    const results = await axios.delete(`${edpoint}${path}`, {withCredentials: true});
    return results;
}
