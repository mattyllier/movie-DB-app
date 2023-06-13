import './Tile.css'
import { useState, useEffect } from 'react'
import {GrClose} from 'react-icons/gr'

/* The Tile component shows info about a specific film as well as the trailer when selected. The id of a film saved onClick in the 
List component is used to fetch info about the film and display it in a modal window which appears when a poster in the list is clicked.
The trailer of the film is also fetched, this yields multiple results, hence the displayed trailer is filtered to include the 'trailer'
in the title and only the first result is displayed. useState is implemented for the modalOpen logic, which allows the window to be closed.
The selected state passed from the List component is also reset */

/* Ternaries are used to account for some results not being applicable in the categories that are being display, for example, the
rating category will not appear for films that have not yet been released, as opposed to showing the category empty*/

export default function Tile({ id , setSelected}) {
    const apiKey = process.env.REACT_APP_API_KEY
    const [trailer, setTrailer] = useState('')
    const [modalOpen, setModalOpen] = useState(true)
    const [info, setInfo] = useState([])
    useEffect(() => {
        if (id) {
            fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}&language=en-US`)
                .then(res => res.json())
                .then(res=>setTrailer(res.results.filter(x=>x.name.toLowerCase().includes('trailer'))[0]?.key))
                .then(setModalOpen(true))
        }
    }, [id])
    useEffect(()=>{
        if(id) {
            fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`)
            .then(res=>res.json())
            .then(res=>setInfo(res))
        }
    },[id])
   const handleClick = ()=>{
    setModalOpen(false)
    setSelected(false)
   }
    return (
        <>
            <div className={modalOpen ? 'film' : 'hidden'}>
                <iframe className='iframe' title='trailer' src={`https://www.youtube.com/embed/${trailer}?enablejsapi=1`} />
                <div className='info'>
                    <button className='modalButton' onClick={handleClick}><GrClose className='modalIcon'/></button>
                    <h1>{info.title}</h1>
                    <h3>{info.release_date!=='' ? `Release Date: ${info.release_date}` : 'Release Date: TBA'}</h3>
                    <h3>{info.runtime!== 0 ? `${info.runtime} min` : ''}</h3>
                    <h3>{info.vote_average!== 0 ? `Rating: ${info.vote_average}` : ''}</h3>
                    <h5>{info.overview}</h5>
                    <button className='modalButton' onClick={localStorage.setItem('savedFilm',JSON.stringify(info))}>Save to Watchlist</button>
                </div>
            </div>
        </>
    )
}