import './Search.css'
import {useState,useEffect} from 'react'
//import Tile from '../Tile/Tile'
import List from '../List/List'

export default function Search(props){
    const [search,setSearch] = useState('')
    const [filtered,setFiltered] = useState([])
    //const [selected,setSelected] = useState('')
    const [searchIsActive,setSearchIsActive] = useState(false)
    const handleChange = (e)=>{
        setSearch(e.target.value)
        e.target.value !== '' ? setSearchIsActive(true) : setSearchIsActive(false)
    }
    //const handleTileClick = (e)=>setSelected(e.target.value)

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
    console.log(filtered)
    return (
        <>
      <input onChange={handleChange} value={search} placeholder='Enter Title' className='searchBar'/>
      <div className={searchIsActive ? 'searchResults' : 'hidden'}>
        <h1>{`Results for ${search}`}</h1>
        {filtered.length>0 ? <List results={filtered}/> : <h1>No results found.</h1>}
      </div>
        </>
    )
}