import './Tile.css'
import { useState, useEffect } from 'react'
import {GrClose} from 'react-icons/gr'

export default function Tile({ id , setSelected}) {
    const apiKey = '794aa50d4099c47177386a08691f3ce6'
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
                <iframe className='iframe' src={`https://www.youtube.com/embed/${trailer}?enablejsapi=1`} />
                <div className='info'>
                    <button className='modalButton' onClick={handleClick}><GrClose className='modalIcon'/></button>
                    <h1>{info.title}</h1>
                    <h3>{info.release_date!=='' ? `Release Date: ${info.release_date}` : 'Release Date: TBA'}</h3>
                    <h3>{info.runtime!== 0 ? `${info.runtime} min` : ''}</h3>
                    <h3>{info.vote_average!== 0 ? `Rating: ${info.vote_average}` : ''}</h3>
                    <h5>{info.overview}</h5>
                    <button className='modalButton' onClick={console.log(info)}>Save to Watchlist</button>
                </div>
            </div>
        </>
    )
}