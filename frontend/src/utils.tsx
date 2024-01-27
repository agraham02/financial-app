import axios from "axios";

export const API_ENDPOINT = "http://localhost:3001";

export async function getRequest(path: string, edpoint = API_ENDPOINT) {
    const results = await axios.get(`${edpoint}${path}`, {
        withCredentials: true,
    });
    return results;
}

export async function postRequest(
    path: string,
    data: object,
    edpoint = API_ENDPOINT
) {
    const results = await axios.post(`${edpoint}${path}`, data, {
        withCredentials: true,
    });
    return results;
}

export async function deleteRequest(path: string, edpoint = API_ENDPOINT) {
    const results = await axios.delete(`${edpoint}${path}`, {
        withCredentials: true,
    });
    return results;
}

export function formatDate(dateString: string) {
    const date = new Date(dateString);
    let year = date.getFullYear();
    let month = date.getMonth() + 1; // Months are zero-indexed
    let day = date.getDate();

    // Format the month and day to ensure they are two digits
    const monthString = month < 10 ? "0" + month : month;
    const dayString = day < 10 ? "0" + day : day;

    // Combine the parts into a formatted date
    let formattedDate = `${monthString}-${dayString}-${year}`;
    return formattedDate;
}

export function formatMoney(amount: number, currency = "USD") {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currency,
    }).format(amount);
}

export function capitalizeWords(str: string) {
    // Split the string into words using a regular expression that looks for spaces.
    return str
        .split(" ")
        .map((word) => {
            // If the word is empty, return it as is (to handle multiple spaces).
            if (!word) return word;

            // Otherwise, return the word with the first letter capitalized and the rest of the letters in lowercase.
            // This ensures that the function correctly capitalizes words that start with numbers or special characters.
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        })
        .join(" "); // Join the words back into a single string with spaces.
}
