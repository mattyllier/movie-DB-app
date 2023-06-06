import './List.css'
import {useState, useRef} from 'react'
import {AiOutlineArrowLeft, AiOutlineArrowRight} from 'react-icons/ai'
import Tile from '../Tile/Tile'

export default function List({results}){
    const scrollRef = useRef(null)
    const handleLeft = ()=>scrollRef.current.scrollBy({left: -1400, behavior: 'smooth'})
    const handleRight = ()=>scrollRef.current.scrollBy({left: 1400, behavior: 'smooth'})
    const [selected,setSelected] = useState('')
    const handleClick = (e)=>{
        setSelected(e.target.id)
      //  console.log(selected)
    }
    return (
        <div>
        <div className='list' ref={scrollRef}>
            <button id='left' className='button' onClick={handleLeft}>{<AiOutlineArrowLeft className='icon'/>}</button>
            {results.map(x=>x.poster_path!==null ? <div onClick={handleClick} key={x.id}><img id={x.id} value={x} className='posterTile' src={`https://image.tmdb.org/t/p/w500${x.poster_path}`}/></div> : x = '')}
            <button id='right' className='button' onClick={handleRight}>{<AiOutlineArrowRight className='icon'/>}</button>
        </div>
        <div className={selected!=='' ? 'tile' : 'hidden'}>
            <Tile id={selected}/>
        </div>
        </div>
    )
}

//