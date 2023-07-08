import React , {useContext , useEffect , useState} from 'react'
import './movieDetails.css'
import { MovieId } from '../../moviesContext'
import axios from 'axios'
import Actors from '../../components/actors/Actors'
import noPoster from './noImage.png'


const MovieDetails = () => {

    const {movieId , mediaType} = useContext(MovieId)
    const [movie , setMovie] = useState([])
    const [genres , setGenres] = useState([])

    useEffect(() => {
      axios.get(`https://api.themoviedb.org/3/${mediaType}/${movieId}?api_key=c4981004f0ff967c246d1ca6da9de1dd&language=en-US`)
      .then((response) => {
          setMovie(response.data)
          setGenres(response.data.genres)
          
      })
    },[])

    const width = movie.vote_average * 30

  return (
    <div>
    <div className='movieDetails'>
        <div className='movieDetails-bg'>
            <img src={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`}/>
        </div>
        <div className='movieDetails-text pt-5'>
            <div className='container pt-5'>
                <div className='Info-One'>
                  <h1>{movie.title || movie.name}</h1>
                  <div className='d-flex time-date-info'>
                  <h5 className='me-5'>{movie?.release_date || movie?.first_air_date}</h5>
                  <p className='text-secondary'>Run Time {movie?.runtime} min</p>
                  </div>
                </div>

                <div className='row'>
                  <div class="col-lg-4 col-12">
                      <div className='poster-mv'>
                      { movie.poster_path != null
                       ?<img className='img-fluid' src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt={movie.title || movie.name}/> 
                      :<img src={noPoster}/>}
                      </div>
                  </div>
                  <div class="col-lg-4 col-12 text-info-place">
                      <p>{movie.overview}</p>
                      <div className='genres'>
                         {genres.map((g)=>(
                        <div key={g.id}>{g?.name}</div>
                         ))}
                      </div>
                      <a><button>Trailer</button></a>
                  </div> 
                  <div className="col-lg-4 col-12 rate-parnet">
                        <h3>Rate</h3>
                        <div className='rate-bar-text'>
                            <div className='rate-bar'>
                                <div className='front-red-div' style={{width:`${width}px`}}></div>
                                <div className='back-white-div'></div>
                            </div>
                            <p className='ms-2 opacity-75'>{movie?.vote_average}/10</p>
                        </div>
                        <p>Total Votes : {movie?.vote_count}</p>
                        
                  </div>
                </div>

            </div>
        </div>


        
    </div>
    {/* ------------------------ */}
    <div className='part-two-info'>
        <Actors id={movie.id} />
    </div>
    {/* ------------------------ */}
    </div>
 )
}

export default MovieDetails