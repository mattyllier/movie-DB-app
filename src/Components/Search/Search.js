import './Search.css'
import {useState,useEffect} from 'react'
import List from '../List/List'

/* The Search component enables the user to search the database based on a query string. The useState hook is implemented to set the
search query type into the input bar. The useEffect then watches for that state to update and with each keystroke, fetches a new list
of films that sends them to the List component for rendering. This component remains inactive if there is no text in the input bar,
the searchIsActive state is used to show or hide the list generated as a result of this component */

export default function Search(props){
    const [search,setSearch] = useState('')
    const [filtered,setFiltered] = useState([])
    const [searchIsActive,setSearchIsActive] = useState(false)
    const handleChange = (e)=>{
        setSearch(e.target.value)
        e.target.value !== '' ? setSearchIsActive(true) : setSearchIsActive(false)
    }
    useEffect(()=>{
        if(search===''){
            setFiltered([])
            return
        }
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=${props.apiKey}&language=en-US&query=${search}`)
        .then(res=>res.json())
        .then(res=>setFiltered(res.results) || [])
        .catch((error)=>{
            console.error('Error fetching movie data', error)
            setFiltered([])
        })
    },[search,props.apiKey])
    return (
    <>
        <input onChange={handleChange} value={search} placeholder='Enter Title' className='searchBar'/>
        <div className={searchIsActive ? 'searchResults' : 'hidden'}>
            <h1>{`Results for '${search}'`}</h1>
            {filtered.length>0 ? <List results={filtered}/> : <h1>No results found.</h1>}
        </div>
    </>
    )
}