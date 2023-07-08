import React , {useContext} from 'react'
import './movieCard.css'
import undefindeImage from './noImage.png'
import { useNavigate} from 'react-router-dom'
import { MovieId } from '../../moviesContext'
import { UserAuth } from '../../config/AuthUserContext'
import { UpdateData , arrayUnion , doc, updateDoc } from 'firebase/firestore'
import { db } from '../../config/firebase-config'


const MovieCard = ({id,title,poster,date,rate,type}) => {

  const {movieIdChange , movieType} = useContext(MovieId)
  const {user} = UserAuth()

 const userIdRef = doc(db , "users" , `${user?.email}`)

  const navigate = useNavigate()
   
  const cardClick = () => {
    navigate(`/Movie/:${title}`)
    movieIdChange(id)
    movieType(type)
  }

  const longTitle = (parTitle) =>{
    if(parTitle.length > 13) {
      return parTitle.slice(0,12)
    }
    return parTitle
  }


  const saveMovie = async () => {
      if(user?.email){
        await updateDoc(userIdRef,{
          watchList : arrayUnion({
            savedId : id ,
            savedTitle : title ,
            savedPoster : poster ,
            savedType : type ,
            savedRate : rate ,
            watched : false
          })
        })
 
      }
      else{
        navigate('/Signup')
      }
  }
 
  return (
    <div className="col-lg-4 col-6 movie-card">
         <div className='card-content' >
            <div className='poster-movie' onClick={cardClick}>
              {poster ? <img src={`https://image.tmdb.org/t/p/original${poster}`}/> : <img src={undefindeImage}/>  }  
            </div>
            <div className='text-mv'>
             {title.length > 13 ? <h2>{longTitle(title)}...</h2> : <h2>{longTitle(title)}</h2>} 
               
                <div>
                    <p>{date}</p>
                    <p>{rate}</p>
                </div>
                <button onClick={saveMovie}>save</button>
            </div>
         </div>
    </div>
  )
}

export default MovieCard