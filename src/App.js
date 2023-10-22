import './App.css';
import Navbar from './components/navbar/Navbar';
import Home from './pages/home/Home';
import {BrowserRouter as Router , Routes , Route} from 'react-router-dom'
import Movies from './pages/movies/Movies';
import Series from './pages/series/Series';
import Search from './pages/search/Search';
import MovieDetails from './pages/movieDetails/MovieDetails';
import { MoviesProvider } from './moviesContext';
import Login from './components/login/Login';
import Signup from './components/signup/Signup';
import { AuthConextProvider } from './config/AuthUserContext';
import WatchList from './pages/watchList/WatchList';
import Undefinde from './components/page404/Undefinde';

function App() {
  return (
    <div className="App">
      <AuthConextProvider>
      <MoviesProvider>
      <Router>
      <Navbar/>
        <Routes>
          <Route index path='/' element={<Home/>}/>
          <Route path='/Movies' element={<Movies/>}/>
          <Route path='/Series' element={<Series/>}/>
          <Route path='/Search' element={<Search/>}/>
          <Route path='/Movie/:movieName' element={<MovieDetails/>}/>
          <Route path='/Login' element={<Login/>}/>
          <Route path='/Signup' element={<Signup/>}/>
          <Route path='/WatchList' element={<WatchList/>}/>
          <Route path='*' element={<Undefinde/>}/>
        </Routes>
      </Router>
      </MoviesProvider>
      </AuthConextProvider>
      
    </div>
  );
}

export default App;
