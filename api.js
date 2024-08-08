import fetch from "node-fetch";
import 'dotenv/config'
const clientID = process.env.clientID;
const accessToken = process.env.accessToken;
const base_url = "https://api.igdb.com/v4";

const fetchGames = async (searchTerm) => {
    const options = {
        method: 'POST',
        headers: {
            'Client-ID': clientID,
            'Authorization': `Bearer ${accessToken}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: 
        `fields id, name, cover; search "${searchTerm}";`
  
    };

    const response = await fetch(`${base_url}/games`, options);
    const games = await response.json();
    return games;
};


const games = await fetchGames("zelda");
console.log(games);

games.map((el, index)=> {
  console.log(el.id, index);
})