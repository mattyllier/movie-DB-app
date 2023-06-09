import './App.css';
import {useState, useEffect} from 'react';
import Search from './Components/Search/Search'
import List from './Components/List/List'
import Genre from './Components/Genre/Genre'
import TheaterGraphic from './TheaterGraphic.png'
import TheaterLights from './TheaterLights.gif'

function App() {
  const [trending,setTrending] = useState([])
  const [topAction, setTopAction] = useState([])
  const [topSciFi, setTopSciFi] = useState([])
  const [topFamily, setTopFamily] = useState([])
  const [topDocs, setTopDocs] = useState([])
  const [topComedy, setTopComedy] = useState([])
  const [topHorror, setTopHorror] = useState([]) 
  const apiKey = process.env.REACT_APP_API_KEY

  /* The App component serves as the parent for the other components. Several fetches are made in tandem with useState in order to
  retrieve film posters to populate featured sections. The search, genre filter, and featured sections are all individual List components
  within the App. An api key is used to fetch these results from the site The Movie Database */

  useEffect(()=>{
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`)
    .then(res=>res.json())
    .then(res=>setTrending(res.results))
  },[])
  useEffect(()=>{
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&with_genres=28`)
    .then(res=>res.json())
    .then(res=>setTopAction(res.results))
  },[])
  useEffect(()=>{
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&with_genres=878`)
    .then(res=>res.json())
    .then(res=>setTopSciFi(res.results))
  },[])
  useEffect(()=>{
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&with_genres=10751`)
    .then(res=>res.json())
    .then(res=>setTopFamily(res.results))
  },[])
  useEffect(()=>{
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&with_genres=99`)
    .then(res=>res.json())
    .then(res=>setTopDocs(res.results))
  },[])
  useEffect(()=>{
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&with_genres=35`)
    .then(res=>res.json())
    .then(res=>setTopComedy(res.results))
  },[])
  useEffect(()=>{
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&with_genres=27`)
    .then(res=>res.json())
    .then(res=>setTopHorror(res.results))
  },[])
  return (
    <div className="App">
      <img className='theaterGraphic' alt='graphic' src={TheaterGraphic}></img>
      <img className='theaterLights' alt='graphic' src={TheaterLights}></img>
      <h1 className='top'>GITFLIX</h1>
      <div>
        <Search apiKey={apiKey}/>
        <Genre apiKey={apiKey}/>
      </div>
      <h1 className='header'>Trending Now</h1>
      <List results={trending}/>
      <h1 className='header'>Top Action</h1>
      <List results={topAction}/>
      <h1 className='header'>Top Science Fiction</h1>
      <List results={topSciFi}/>
      <h1 className='header'>Top Family</h1>
      <List results={topFamily}/>
      <h1 className='header'>Top Documentaries</h1>
      <List results={topDocs}/>
      <h1 className='header'>Top Comedy</h1>
      <List results={topComedy}/>
      <h1 className='header'>Top Horror</h1>
      <List results={topHorror}/>
    </div>
  );
}

export default App;