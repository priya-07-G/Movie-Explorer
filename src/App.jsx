import { useState } from "react";
import { searchMovies } from "./api";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MovieCard from "./components/Moviecard";
import MovieDetails from "./components/MovieDetails";

function Home() {
    const [movies, setMovies] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [category, setCategory] = useState("All");

    async function handleSearch() {
        if (search.trim() === "") {
            setError("Please enter a movie name.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const results = await searchMovies(search);

            if (results.length === 0) {
                setError("Movie not found.");
                setMovies([]);
            } else {
                setMovies(results);
            }
        } catch (err) {
            setError("Something went wrong. Please try again.");
            setMovies([]);
        }

        setLoading(false);
    }

    // Filter movies by genre
    const filteredMovies =
        category === "All"
            ? movies
            : movies.filter(
                (movie) =>
                    movie.Genre &&
                    movie.Genre.toLowerCase().includes(
                        category.toLowerCase()
                    )
            );

    return (
        <div>
            <h1>🎬 Movie Explorer</h1>

            <input
                type="text"
                placeholder="Search movie..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <button onClick={handleSearch}>
                Search
            </button>

            <div className="filters">

                <button onClick={() => setCategory("All")}>
                    All
                </button>

                <button onClick={() => setCategory("Action")}>
                    Action
                </button>

                <button onClick={() => setCategory("Comedy")}>
                    Comedy
                </button>

                <button onClick={() => setCategory("Drama")}>
                    Drama
                </button>

                <button onClick={() => setCategory("Horror")}>
                    Horror
                </button>

            </div>

            {loading && <p>⏳ Loading movies...</p>}

            {error && <p>{error}</p>}

            <div>
                {filteredMovies.map((movie) => (
                    <MovieCard
                        key={movie.imdbID}
                        movie={movie}
                    />
                ))}
            </div>
        </div>
    );
}

function App() {
    return (
        <BrowserRouter>
            <Routes>

                <Route
                    path="/"
                    element={<Home />}
                />

                <Route
                    path="/movie/:id"
                    element={<MovieDetails />}
                />

            </Routes>
        </BrowserRouter>
    );
}

export default App;