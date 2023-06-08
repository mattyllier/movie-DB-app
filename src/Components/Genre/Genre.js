import './Genre.css'
import {useState,useEffect} from 'react'
import List from '../List/List'

export default function Genre({apiKey}){
    const [genres,setGenres] = useState([])
    const [selectedGenre, setSelectedGenre] = useState('')
    // const [selectedName, setSelectedName] = useState('')
    const [genreResults, setGenreResults] = useState([])
    useEffect(()=>{
        fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`)
        .then(res=>res.json())
        .then(res=>setGenres(res.genres))
    },[])
    useEffect(()=>{
        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&with_genres=${selectedGenre}`)
        .then(res=>res.json())
        .then(res=>setGenreResults(res.results))
    },[selectedGenre])

    const handleChange = (e)=>{
        e.preventDefault()
        setSelectedGenre(e.target.value);
    }
   console.log(selectedGenre)
    return (
        <>
        <select className='searchGenre' value={selectedGenre} onChange={handleChange}>
            <option defaultValue>Search Genre</option>
            {genres.map(genre=><option className='genre' value={genre.id} key={genre.id}>{genre.name}</option>)}
        </select>
        <div className={selectedGenre!=='' ? 'visible' : 'hidden'}>
            <List results={genreResults}/>
         </div>
        </>

    )
}