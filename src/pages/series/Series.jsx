import React from 'react'
import backgroundImage from './bg.jpg'
import './series.css'
import { useState , useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import MovieCard from '../../components/movieCard/MovieCard'
import Footer from '../../components/footer/Footer'


const Series = () => {

    const [movies , setMovies] = useState([])
    const [numPage , setNumPage] = useState(1)
    const navigate = useNavigate()


    useEffect(() => {

      axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=c4981004f0ff967c246d1ca6da9de1dd&include_adult=false&include_null_first_air_dates=false&language=en-US&page=${numPage}&sort_by=popularity.desc`)
      .then((response)=>{
        setMovies(response.data.results)
      })

    },[numPage])

 

  const back = () => {
    window.scrollTo(0,0)
   numPage > 1 ? setNumPage(numPage-1) : setNumPage(1)
}

const next = () => {
    window.scrollTo(0,0)
   numPage < 500 ? setNumPage(numPage+1) : setNumPage(500)
}
    
const search = () => {
    navigate('/Search')
}

  return (
    <div className='movies-page'>
        <div className='movies-bg'>
            <img src={backgroundImage}/>
        </div>
        <div className='movies-text'>
            <div className='container'>
                <h2>Thousands of TV Series of All Geners From All Over The World</h2>
                <button onClick={search}>Search</button>
            </div>
        </div>

        <div className='movies-list'>
            <h1>TV Series</h1>
            <div className='container'>
                <div className='gy-5 row moviespage-cards'>
                    {
                       movies.map((movie)=>(
                        <MovieCard 
                            id={movie.id}
                            key={movie.id} 
                            title={movie?.name} 
                            poster={movie?.poster_path} 
                            date={movie?.first_air_date} 
                            rate={movie?.vote_average} 
                            type={'tv'}
                        />
                        
                    ))
                    }
                </div>
            </div>
            
        <div className='btns-pages'>
                <button onClick={back}>Back</button>
                <div>{numPage}</div>
                <button onClick={next}>Next</button>
            </div>
        </div>

        <Footer/>
    </div>
  )
}

export default Series

