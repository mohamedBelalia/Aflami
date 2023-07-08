import React, { useState , useEffect , useContext } from 'react'
import { MovieId } from '../../moviesContext'
import { useNavigate } from 'react-router-dom'
import './landingPage.css'
import axios from 'axios'

const LandingPage = () => {

    const[movies , setMovies] = useState([])
    const movie = movies[Math.floor(Math.random() * movies.length )]
    const navigate = useNavigate()
    const {movieIdChange , movieType} = useContext(MovieId)

    useEffect(()=> {
        axios.get('https://api.themoviedb.org/3/movie/popular?api_key=c4981004f0ff967c246d1ca6da9de1dd&language=en-US&page=1')
        .then((response)=> {
            setMovies(response.data.results)
        })
    },[])

    const text = movie?.overview.slice(0,100)

    const details = () =>{
        navigate(`/Movie/:${movie?.title}`)
        movieIdChange(movie?.id)
        movieType('movie')
    }

  return (
    <div className='landing-page'>
        <div className='landing-bg'>
            <img src={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`}/>
        </div>
        <div className='landing-text'>
            <div>
                <h1>{movie?.original_title}</h1>
                <span>Realise in {movie?.release_date}</span>
                <span>Rate {movie?.vote_average}/10</span>
                <p>{text}...</p>
                <button onClick={details}>Details</button>
            </div>
        </div>
    </div>
  )
}

export default LandingPage