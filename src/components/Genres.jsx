import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function Genres() {
  const clientId = import.meta.env.VITE_CLIENT_ID;
  const accessToken = import.meta.env.VITE_ACCESS_TOKEN;
  const [genres, setGenres] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const options = {
    method: 'POST',
    headers: {
        'Client-ID': clientId, // Replace with actual Client-ID
        'Authorization': `Bearer ${accessToken}`, // Replace with actual access token
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: `fields name; limit 500;`,
  };

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch('/api/genres', options); // Update path if needed
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setGenres(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGenres();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <ul>
        {genres.map((el) => (
          <li
            key={el.id}
            className="list-group-item bg-dark"
            style={{
              borderColor: "black",
              borderWidth: "2px",
              marginTop: "0.5rem",
              textAlign: "center",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2), 0 -1px 2px rgba(0, 0, 0, 0.1) inset",
            }}
          >
            <Link to={`/genre-${el.name}`} style={{ color: "white", textDecoration: "none" }}>
              {el.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Genres;
  