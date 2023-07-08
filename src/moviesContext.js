import React , { createContext , useState } from "react";

export const MovieId = createContext()

const defaultId = 94722


export const MoviesProvider = (props) => {

    const [movieId , setMovieId] = useState(defaultId)
    const [mediaType , setMediaType] = useState('tv')


    const movieIdChange = (id) => {
        setMovieId(id)
    }

    const movieType = (type) => {
        setMediaType(type)
    }

    const movieIdValue = {movieIdChange , movieId , movieType , mediaType}


    return(
        <MovieId.Provider value={movieIdValue}>
            {props.children}
        </MovieId.Provider>
    )

}