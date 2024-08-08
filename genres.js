import fetch from 'node-fetch';
import 'dotenv/config';

const clientID = process.env.clientID;
const accessToken = process.env.accessToken;
const base_url = "https://api.igdb.com/v4";

export const fetchGenres = async () => {
    const options = {
        method: 'POST',
        headers: {
            'Client-ID': clientID,
            'Authorization': `Bearer ${accessToken}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: `fields name; limit 500;`,
    };

    try {
        const response = await fetch(`${base_url}/genres`, options);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const genres = await response.json();
        return genres;
    } catch (error) {
        console.error('Error fetching genres:', error);
        return []; // Return an empty array if there is an error
    }

};

fetchGenres().then(genres => {
    console.log(genres);
});
