import React, { useEffect, useState } from 'react'
import './watchList.css'
import { db } from '../../config/firebase-config'
import { doc ,getDoc , updateDoc , collection } from 'firebase/firestore'
import { UserAuth } from '../../config/AuthUserContext'

const WatchList = () => { 

  const [movies , setMovies] = useState([])
  const {user} = UserAuth()
  const [clicked , setClicked] = useState(false)
  const userRef = doc(db , "users" , `${user?.email}`)

  const getUserMovies = async() =>{
      try{
          const moviesRef = doc(db , "users" , `${user?.email}`)
          const moviesData = await getDoc(moviesRef)

          if(moviesData.exists()){
            const data = moviesData.data()
            setMovies(data.watchList)
          }
          else{
            console.log("You didn't have any document");
          }
      }
      catch(error){
        console.log(error);
      }
  }


  useEffect(()=>{
      if(user.email){
        getUserMovies()
      }
      else{
        console.log("you have something wrong");
      }
  },[clicked])


  const deleteMovie = async(id) => {
        setClicked(!clicked)

        try{
          const lastMovies = movies.filter((movie)=> movie.savedId !== id)
          await updateDoc(userRef , {
            watchList : lastMovies
          })
        }
        catch(error){
          console.log(error);
        }
  }


  const watchedMovie = async(id) => {
    setClicked(!clicked)

    try{
        const lastMovies = movies.map((movie)=>{

          if(movie.savedId === id){
            movie.watched = true
          }
          return movie

        }) 

        await updateDoc(userRef , {
          watchList : lastMovies
        })

    }catch(error){
      console.log(error);
    }
  }



  return (
    <div className='watch-list '>

      <div className='container pt-5'>
        <h1 className='main-title'>Your Watch List</h1>
        

    {
      movies.length > 0 ? 
      <>
        <h2 className='title-catego'>Didn't Watched Yet</h2>

        <div className='movies-list g-5 mt-3 row'>
            {
                    movies.map((movie)=>(
                      !movie.watched ?
                      <div className='col-lg-3 col-6 movie-container'>
                        <div className='single-movie'>
                          <img src={`https://image.tmdb.org/t/p/original${movie.savedPoster}`}/>
                          <h1>{movie.savedTitle}</h1>
                          <div className='remove-watched-btns'>
                            <button onClick={()=>deleteMovie(movie.savedId)}>Remove</button>
                            <button onClick={()=>watchedMovie(movie.savedId)}>Watched</button>
                          </div>
                          <button className='details-btn'>Details</button>
                        </div>
                      </div>
                      : null
                    ))
                  }
        </div>
                  <span></span>
        <h2 className='title-catego'>Watched</h2>

        <div className='movies-list g-5 mt-3 row'>
            {
                    movies.map((movie)=>(
                      movie.watched ?
                      <div className='col-lg-3 col-6 movie-container'>
                        <div className='single-movie'>
                          <img src={`https://image.tmdb.org/t/p/original${movie.savedPoster}`}/>
                          <h1>{movie.savedTitle}</h1>
                          <div className='remove-watched-btns-two'>
                            <button onClick={()=>deleteMovie(movie.savedId)}>Remove</button>
                          </div>
                          <button className='details-btn'>Details</button>
                        </div>
                      </div>
                      : null
                    ))
                  }
        </div>
        </>
          : <div className='no-savedMovies'>
            <h1>You didn't have any movie in the Watch List</h1>
          </div>
        }

      </div>
      
    </div>
  )
}

export default WatchList