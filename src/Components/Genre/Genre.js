import './Genre.css'
import {useState,useEffect} from 'react'
import List from '../List/List'

/*The function of the Genre component is to provide a list of options for the user to select a specific genre and see that list
at the top of the page. This component receives the apiKey is a prop and utilizes the useEffect hook twice, 
the first time to fetch and mount the list of genres as options within a select bar, this could have been hardcoded but that would not be
dynamic for the application if the list were to be changed on the API's end. The second useEffect watches the state of the selectedGenre
variable, when an option is clicked and the value of the select bar changes, that genre becomes selectedGenre and it's id is used to fetch
the array of films bearing that genre id, which is sent to the List component to be displayed on the front end*/

/*A collapse section button was added to remove the added section from the display, and with the select tag's default behavior, 
only one extra genre list can be displayed at a time, as to keep the page concise and not have it overpopulated with past selections*/

export default function Genre({apiKey}){
    const [genres,setGenres] = useState([])
    const [selectedGenre, setSelectedGenre] = useState('')
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
    return (
        <>
        <select className='searchGenre' value={selectedGenre} onChange={handleChange}>
            <option defaultValue>Search Genre</option>
            {genres.map(genre=><option className='genre' value={genre.id} key={genre.id}>{genre.name}</option>)}
        </select>
        <div className={selectedGenre!=='' ? 'visible' : 'hidden'}>
            <div className='genreButtonContainer'>
                <button className='genreButton' onClick={()=>setSelectedGenre('')}>Collapse Section</button>
            </div>
            <List results={genreResults}/>
         </div>
        </>

    )
}