const key = 'c4981004f0ff967c246d1ca6da9de1dd'

const requests = {
    requestPopular : `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=2`,
    requestTopRated : `https://api.themoviedb.org/3/movie/top_rated?api_key=${key}&language=en-US&page=1`,
    requestUpcoming : `https://api.themoviedb.org/3/movie/upcoming?api_key=${key}&language=en-US&page=1`,
    requestTranding : `https://api.themoviedb.org/3/trending/movie/day?api_key=${key}&language=en-US'`,
    requestHorror : `https://api.themoviedb.org/3/search/movie?api_key=${key}&include_adult=false&language=en-US&page=1`
}

export default requests 