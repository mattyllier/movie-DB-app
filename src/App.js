import './App.css';
import {useState, useEffect} from 'react';
import Search from './Components/Search/Search'
import Trending from './Components/Trending/Trending'

function App() {
  const [results,setResults] = useState([])
  const [search,setSearch] = useState('')
  const [filtered, setFiltered] = useState([])
  const [selected,setSelected] = useState('')

  const apiKey = '794aa50d4099c47177386a08691f3ce6'
  useEffect(()=>{
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`)
    .then(res=>res.json())
    .then(res=>{
      setResults(res.results)
      console.log(res.results, 'res.results=>', results, 'inUseEffect')
    })
    console.log(results, 'afterUseEffect')

    // fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${selected}`)
    // .then(res=>res.json())
    // .then(res=>setResults(res.results))
  },[])
  const handleChange = (e)=>setFiltered(e.target.value)
  const handleClick = (e)=>setSelected(e.target.value)
  
  return (
    <div className="App">
      <Search filtered={filtered}/>
      <Trending results={results}/>
    </div>
  );
}

export default App;

//fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${apikey}&language=en`)
//fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apikey}&language=en&query=${title}`)
//fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apikey}&language=en&query=${title}`)