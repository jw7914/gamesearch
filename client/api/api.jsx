import axios from "axios";

const isLocal = window.location.hostname === "localhost";

export const api = axios.create({
  baseURL: isLocal
    ? "http://localhost:8080" // Local URL
    : "https://game-rho-seven.vercel.app/", // Vercel URL
});

const endpointMap = {
  query: `/games?search_term=`,
  genre: `/genres?genre=`,
  // More maps for future API calls
};

export const fetchGenres = async (setLoading, setGenres, setError) => {
  try {
    setError("");
    setLoading(true);
    const response = await api.get("/genres?genre");
    const data = response.data;
    setGenres(data);
    setLoading(false);
  } catch (error) {
    console.error("Error fetching genres:", error);
    setError("Failed to load genres");
    setLoading(false);
  }
};

export const getSpecificGame = async (
  gameID,
  setLoading,
  setError,
  setGameData
) => {
  try {
    setError("");
    setLoading(true);
    const response = await api.get(`${gameID}`);
    const data = response.data[0];
    setGameData(data);
    setLoading(false);
  } catch (error) {
    console.error("Error fetching game:", error);
    setError("Failed to load game");
    setLoading(false);
  }
};

export const getLatestGames = async (setLoading, setGames, setError) => {
  try {
    setError("");
    setLoading(true);
    const response = await api.get("/");
    const data = response.data;
    setGames(data);
    setLoading(false);
  } catch (error) {
    console.error("Error fetching latest games:", error);
    setError("Failed to load latest games");
    setLoading(false);
  }
};

export const handleGameSearch = async (
  queryTerm,
  type,
  setLoading,
  setGames,
  setError
) => {
  try {
    setLoading(true);
    setError("");

    const endpoint = endpointMap[type];
    if (!endpoint) {
      throw new Error("Invalid search type");
    }

    const response = await api.get(
      `${endpoint}${encodeURIComponent(queryTerm)}`
    );
    const data = response.data;
    const gamesWithDetails = data.map((el) => ({
      id: el.id,
      name: el.name,
      cover: el.cover,
      summary: el.summary,
      release: el.first_release_date ?? "N/A",
      rating: el.total_rating ?? 0,
    }));
    setGames(gamesWithDetails);
    setLoading(false);
  } catch (error) {
    console.error("Error fetching games:", error);
    setError("Failed to load games");
    setLoading(false);
  }
};

export const registerUser = async (userId) => {
  try {
    const response = await api.post(`/register/${userId}`, { userId });

    // Check if the response is successful
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Registration failed");
    }
  } catch (error) {
    console.error("Error during registration:", error);
    throw error;
  }
};
