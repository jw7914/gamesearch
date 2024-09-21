import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8080",
});

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

export const handleSearch = async (
  search_term,
  setLoading,
  setGames,
  setCovers,
  setError
) => {
  try {
    setLoading(true);
    setError("");
    const response = await api.get(
      `/games?search_term=${encodeURIComponent(search_term)}`
    );
    const data = response.data;
    const gameNames = data.map((el) => el.name);
    const gameCovers = data.map((el) => el.cover);
    setGames(gameNames);
    setCovers(gameCovers);
    setLoading(false);
  } catch (error) {
    console.error("Error fetching games:", error);
    setError("Failed to load games");
    setLoading(false);
  }
};

export const handleGenreSearch = async (
  genre,
  setLoading,
  setGames,
  setCovers,
  setError
) => {
  try {
    setLoading(true);
    setError("");
    const response = await api.get(
      `/genres?genre=${encodeURIComponent(genre)}`
    );
    const data = response.data;
    const gameNames = data.map((el) => el.name);
    const gameCovers = data.map((el) => el.cover);
    setGames(gameNames);
    setCovers(gameCovers);
    setLoading(false);
  } catch (error) {
    console.error("Error fetching games:", error);
    setError("Failed to load games");
    setLoading(false);
  }
};