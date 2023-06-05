import './Trending.css'
import {useRef} from 'react'
import {AiOutlineArrowLeft, AiOutlineArrowRight} from 'react-icons/ai'

export default function Trending({results}){
   // const ref = useRef(0)
    const scroll = (offset)=> {
     //   ref.current.scrollLeft+=offset
    }
    return (
        <div className='trending'>
            <h1 className='header'>Trending Now</h1>
            <div className='list'>
                <button id='left' className='button' onClick={()=>scroll(-20)}>{AiOutlineArrowLeft}</button>
                {results.map(x=><div key={x.id}><img className='img' src={`https://image.tmdb.org/t/p/w500${x.poster_path}`}/></div>)}
                <button id='right' className='button' onClick={()=>scroll(20)}>{AiOutlineArrowRight}</button>
            </div>
        </div>
    )
}

//