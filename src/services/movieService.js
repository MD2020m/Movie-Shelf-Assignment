const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_URL = import.meta.env.VITE_TMDP_BASE_URL;

async function getPopularMovies() {
    const response = await fetch(`${API_URL}/movie/popular?api_key=${API_KEY}`,
        {method: 'GET', headers: {accept: 'application/json'}}
    );

    const data = await response.json();
    return data.results;
}

async function searchMovies(query) {
    const response = await fetch(`${API_URL}/search/movie?api_key=${API_KEY}&query=${query}`,
        {method: 'GET', headers: {accept: 'application/json'}}
    );

    const data = await response.json();
    return data.results;

}


export { getPopularMovies, searchMovies };

