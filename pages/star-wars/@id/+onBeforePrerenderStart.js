
function minimize(movies) {
    return movies.map((movie) => {
        const { title, release_date, id } = movie;
        return { title, release_date, id };
    });
}

export async function onBeforePrerenderStart() {
    const moviesResponse = await fetch("https://brillout.github.io/star-wars/api/films.json");
    const moviesData = (await moviesResponse.json());
    const movies = minimize(moviesData);

    const moviePageURLs = movies.map(movie => '/star-wars/' + movie.id)
    return moviePageURLs
}
