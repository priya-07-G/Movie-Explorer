import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function MovieDetails() {

    const { id } = useParams();

    const [movie, setMovie] = useState(null);

    useEffect(() => {

        async function getMovie() {

            const response = await fetch(
                `https://www.omdbapi.com/?apikey=44a45420
&i=${id}&plot=full`
            );

            const data = await response.json();

            setMovie(data);
        }

        getMovie();

    }, [id]);

    if (!movie) {
        return <p>Loading movie details...</p>;
    }

    return (
        <div>

            <h1>{movie.Title}</h1>

            <img
                src={movie.Poster}
                alt={movie.Title}
                width="250"
            />

            <p>⭐ Rating: {movie.imdbRating}</p>

            <p>📅 Year: {movie.Year}</p>

            <p>🎭 Genre: {movie.Genre}</p>

            <p>🎬 Director: {movie.Director}</p>

            <p>{movie.Plot}</p>

        </div>
    );
}

export default MovieDetails;