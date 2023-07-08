import React , {useState , useEffect , useContext} from 'react'
import axios from 'axios'
import './actors.css'
import { MovieId } from '../../moviesContext'
import Carousel from 'react-elastic-carousel'
import noProfile from './noImage.png'


const Actors = () => {

    const {mediaType , movieId} = useContext(MovieId)
    const [actors , setAcors] = useState([])

    useEffect(()=>{
        axios.get(`https://api.themoviedb.org/3/${mediaType}/${movieId}/credits?api_key=c4981004f0ff967c246d1ca6da9de1dd&language=en-US`)
        .then((response)=>{
            setAcors(response.data.cast)
        }).catch(()=>{
            console.log('something wrong');
        })
    },[])


    const breakPoints = [
        {width : 1 , itemsToShow : 1},
        {width : 550 , itemsToShow : 2},
        {width : 768 , itemsToShow : 4},
        {width : 1200 , itemsToShow : 4},
    ]


  return (
    <div className='container'>
     <h1 className='mb-5'>Actors</h1>

    <Carousel breakPoints={breakPoints} pagination={false}>
        {
             actors.map((actor)=>(
                <div className='actor'>
                  {actor.profile_path != null ? <img src={`https://image.tmdb.org/t/p/original${actor.profile_path}`}/> : <img src={noProfile}/> }  
                    <div>
                        <h3>{actor.name}</h3>
                        <p>{`( ${actor.character} )`}</p>
                    </div>
                </div>
            ))
        }
    </Carousel>

    </div>
  )
}

export default Actors


