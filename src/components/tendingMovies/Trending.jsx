import React, { useEffect, useRef, useState } from 'react'
import './Trending.css'
import axios from 'axios'
import MovieCard from '../movieCard/MovieCard'

const Trending = () => {

    const [movies , setMovies] = useState([])
    const [numPage , setNumPage] = useState(1)
    const [typeMd , setTypeMd] = useState('movie')
    const btns = useRef()


    useEffect(()=>{
        axios.get(`https://api.themoviedb.org/3/${typeMd}/popular?api_key=c4981004f0ff967c246d1ca6da9de1dd&language=en-US&page=${numPage}`)
        .then((respnse) => {
            setMovies(respnse.data.results)
        })
    },[numPage , typeMd])


    const back = () => {
        window.scrollTo(0,0)
       numPage > 1 ? setNumPage(numPage-1) : setNumPage(1)
    }
    
    const next = () => {
        window.scrollTo(0,0)
       numPage < 500 ? setNumPage(numPage+1) : setNumPage(500)
    }

    const mediaType = (type) => {
            if(type==='movie'){
                btns.current.childNodes[0].className = 'active'
                btns.current.childNodes[1].className = ''
            }
            else if(type==='tv'){
                btns.current.childNodes[0].className = ''
                btns.current.childNodes[1].className = 'active'
            }

            setTypeMd(type)
    }

   

  return (
    <div className='trending'>
        <h1 className='title-page'>Trending</h1>
        <div className='filter-trend-btns' ref={btns}>
            <button onClick={() => mediaType('movie')} className='active'>Movies</button>
            <button onClick={() => mediaType('tv')}>Tv Series</button>
        </div>
        <div className='container'>
            <div className='gy-5 row trending-cards'>
            { 
                movies.map((movie)=>(
                    <MovieCard 
                        id={movie.id}
                        key={movie.id} 
                        title={movie?.title || movie?.name} 
                        poster={movie?.poster_path} 
                        date={movie?.release_date || movie?.first_air_date} 
                        rate={movie?.vote_average} 
                        type={typeMd}
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
  )
}

export default Trending