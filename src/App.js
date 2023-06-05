import './App.css';
import {useState, useEffect} from 'react';
import Search from './Components/Search/Search'
import List from './Components/List/List'

function App() {
  const [results,setResults] = useState([])
  //const [search,setSearch] = useState('')
  //const [filtered, setFiltered] = useState([])
  const [selected,setSelected] = useState('')
  const [actionResults, setActionResults] = useState([])

  const apiKey = '794aa50d4099c47177386a08691f3ce6'
  const genreId = 8;

  //default - trending
  useEffect(()=>{
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`)
    .then(res=>res.json())
    .then(res=>{
      setResults(res.results)
    })
  },[])

  useEffect(()=>{
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&with_genres=${genreId}`)
    .then(res=>res.json())
    .then(res=>setActionResults(res.results))
  },[])

  //const handleClick = (e)=>setSelected(e.target.value)
  
  return (
    <div className="App">
      <Search apiKey={apiKey}/>
      <h1 className='header'>Trending Now</h1>
      <List results={results}/>
      <h1 className='header'>Action</h1>
      <List results={actionResults}/>
    </div>
  );
}

export default App;

//fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${apikey}&language=en`)
//fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apikey}&language=en&query=${title}`)
//fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apikey}&language=en&query=${title}`)