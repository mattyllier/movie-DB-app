import './List.css'
import {useRef} from 'react'
import {AiOutlineArrowLeft, AiOutlineArrowRight} from 'react-icons/ai'

export default function Trending({results}){
    let ref = useRef()
    const scroll = (offset)=> {
        ref.current.scrollLeft+=offset
    }
    return (
        <div className='list'>
            <button id='left' className={ref===0 ? 'hidden' : 'button'} onClick={()=>scroll(-20)}>{<AiOutlineArrowLeft className='icon'/>}</button>
            {results.map(x=>x.poster_path!==null ? <div key={x.id}><img className='img' src={`https://image.tmdb.org/t/p/w500${x.poster_path}`}/></div> : x = '')}
            <button id='right' className={ref===2000 ? 'hidden' : 'button'} onClick={()=>scroll(20)}>{<AiOutlineArrowRight className='icon'/>}</button>
        </div>
    )
}

//