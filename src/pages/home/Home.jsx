import React from 'react'
import './Home.css'
import LandingPage from '../../components/landingPage/LandingPage'
import Trending from '../../components/tendingMovies/Trending'
import Footer from '../../components/footer/Footer'

const Home = () => {
  return (
    <div className="home-page">
        <LandingPage/>
        <Trending/>
        <Footer/>
    </div>
  )
}

export default Home