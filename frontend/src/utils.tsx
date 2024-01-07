import axios from "axios";

export const API_ENDPOINT = "http://localhost:3001";

export async function getRequest(path, edpoint = API_ENDPOINT) {
    const response = await axios.get(`${edpoint}${path}`);
    return response;
}

export async function postRequest(path, data, edpoint = API_ENDPOINT) {
    const response = await axios.post(`${edpoint}${path}`, data);
    return response;
}

export async function deleteRequest(path, edpoint = API_ENDPOINT) {
    const response = await axios.delete(`${edpoint}${path}`);
    return response;
}
