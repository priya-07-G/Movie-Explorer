import { Link } from "react-router-dom";
function MovieCard({ movie }) {
    return (
        <div className="movie-card">

            <img
                src={
                    movie.Poster !== "N/A"
                        ? movie.Poster
                        : "https://via.placeholder.com/300x450?text=No+Poster"
                }
                alt={movie.Title}
            />

            <div className="movie-info">
                <h2>{movie.Title}</h2>

                <p>📅 {movie.Year}</p>

                <p>🎭 {movie.Genre || "Genre unavailable"}</p>

                <p>⭐ Rating: {movie.imdbRating || "N/A"}</p>

                <Link to={`/movie/${movie.imdbID}`}>
                    View Details
                </Link>
            </div>

        </div>
    );
}

export default MovieCard;