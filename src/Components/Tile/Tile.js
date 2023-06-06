import './Tile.css'
import { useState, useEffect } from 'react'

export default function Tile({ id }) {
    const apiKey = '794aa50d4099c47177386a08691f3ce6'
    const [trailer, setTrailer] = useState('')
    console.log(id, 'id')
    useEffect(() => {
        if (id) {
            fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}&language=en-US`)
                .then(res => res.json())
                .then(res=>setTrailer(res.results.filter(x=>x.name.toLowerCase().includes('trailer'))[0].key))
        }
    }, [id])
    return (
        <>
            <div>
                <iframe src={`https://www.youtube.com/embed/${trailer}?enablejsapi=1`} />
            </div>
        </>
    )
}