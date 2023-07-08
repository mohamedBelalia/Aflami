import React from 'react'
import backgroundImage from './bg.jpg'
import { useRef , useState , useEffect } from 'react'
import searchIcon from './search.png'
import './search.css'
import axios from 'axios'
import MovieCard from '../../components/movieCard/MovieCard'

const Search = () => {

    const [movies , setMovies] = useState([])
    const [numPage , setNumPage] = useState(1)
    const [type , setType] = useState('movie')
    const [searchValue , setSearchValue] = useState('')
    const [resultPages , setResultPages] = useState()
    const [value , setValue] = useState('')
    const [intialState , setIntialState ] = useState(false)
    const btns = useRef()



    useEffect(() => {

        axios.get(`https://api.themoviedb.org/3/search/${type}?api_key=c4981004f0ff967c246d1ca6da9de1dd&language=en-US&query=${searchValue}&page=${numPage}&include_adult=false`)
        .then((response)=>{
            setMovies(response.data.results)
            setResultPages(response.data.total_pages)
        })
    
    },[type , numPage , searchValue , intialState])

    

    const mediaType = (type) => {
        if(type==='movie'){
            btns.current.childNodes[0].className = 'active'
            btns.current.childNodes[1].className = ''
        }
        else if(type==='tv'){
            btns.current.childNodes[0].className = ''
            btns.current.childNodes[1].className = 'active'
        }

        setType(type)  
}

    const searchBtn = () => {
        setSearchValue(value)
        setIntialState(true)
    }

    const back = () => {
        window.scrollTo(0,0)
       numPage > 1 ? setNumPage(numPage-1) : setNumPage(1)
    }
    
    const next = () => {
        window.scrollTo(0,0)
       numPage < resultPages ? setNumPage(numPage+1) : setNumPage(resultPages)
    }

  return (
    <div className='serach-page'>
        <div className='movies-bg'>
            <img src={backgroundImage}/>
        </div>
        <div className='search-text'>
            <div className='container'>
            <div className='row ms-auto me-auto'>
                <div className="col-lg-8 col-12">
                    <input className='search-input' type='text' placeholder='Search ...' onChange={(v) => setValue(v.target.value)} />
                    
                </div>
                <div className="col-lg-4 col-12">
                    <button className='search-btn' onClick={searchBtn}>
                        <img src={searchIcon} alt='search-icon'/>
                    </button>
                </div>
            </div>


            <div className='filter-btns' ref={btns}>
                <button onClick={() => mediaType('movie')} className='active'>Movies</button>
                <button onClick={() => mediaType('tv')}>Tv Series</button>
            </div>


            </div>
        </div>


    {intialState ?  
        <div className='movies-list'>

        {movies.length > 0 ? 

            <>
            <h1>Result</h1>
            <div className='container'>
                <div className='gy-5 row moviespage-cards'>
                    {
                       movies.map((movie)=>(
                        <MovieCard 
                            id={movie.id}
                            key={movie.id} 
                            title={movie?.name || movie?.title } 
                            poster={movie?.poster_path} 
                            date={movie?.first_air_date || movie?.release_date} 
                            rate={movie?.vote_average} 
                            type={type}
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

            </>

            : 
            <div className='no-movie-result'>
                <p>{`Sorry There's any ${type} with "${searchValue}" name `}</p>
            </div>}
            </div>

        : 
        <div className='initial-state'>
            <p>Search for your Movie or Tv serie</p>
        </div>
        }

    </div>
  )
}

export default Search