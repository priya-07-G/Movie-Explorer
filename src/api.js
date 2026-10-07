const API_KEY = "44a45420";

export async function searchMovies(movieName) {
    const response = await fetch(
        `https://www.omdbapi.com/?apikey=${API_KEY}&s=${movieName}`
    );

    const data = await response.json();

    if (!data.Search) {
        return [];
    }

    // Get complete details for each movie
    const moviesWithDetails = await Promise.all(
        data.Search.map(async (movie) => {
            const detailsResponse = await fetch(
                `https://www.omdbapi.com/?apikey=${API_KEY}&i=${movie.imdbID}`
            );

            return await detailsResponse.json();
        })
    );

    return moviesWithDetails;
}