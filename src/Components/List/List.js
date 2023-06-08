import './List.css'
import {useState, useEffect, useRef} from 'react'
import {AiOutlineArrowLeft, AiOutlineArrowRight} from 'react-icons/ai'
import Tile from '../Tile/Tile'

export default function List({results}){
    const [selected,setSelected] = useState('')
    const scrollRef = useRef(null)
    const handleLeft = ()=>scrollRef.current.scrollBy({left: -1200, behavior: 'smooth'})
    const handleRight = ()=>scrollRef.current.scrollBy({left: 1200, behavior: 'smooth'})
    const handleClick = (e)=>setSelected(e.target.id)
    return (
        <div className='listContainer'>
            <button id='left' className='button' onClick={handleLeft}>{<AiOutlineArrowLeft className='icon'/>}</button>
            <button id='right' className='button' onClick={handleRight}>{<AiOutlineArrowRight className='icon'/>}</button>
            <div className='list' ref={scrollRef}>
                <div className='buttonWells'>SPACE01</div>
                {results.map(x=>x.poster_path!==null ? <div onClick={handleClick} key={x.id}><img id={x.id} value={x} className='posterTile' src={`https://image.tmdb.org/t/p/w500${x.poster_path}`}/></div> : x = '')}
                <div className='buttonWells'>SPACE02</div>
            </div>
        <div className={selected!=='' ? 'tile' : 'hidden'}>
            <Tile id={selected} setSelected={setSelected}/>
        </div>
        </div>
    )
}

 /*  const handleScroll = ()=>{
    const scrollPosition = scrollRef.current
    const left = scrollPosition.previousElementSibling
    const right = scrollPosition.nextElementSibling
    scrollPosition.scrollLeft === 0 ? left.style.display = 'none' : left.style.display = 'block'
    scrollPosition.scrollLeft + scrollPosition.clientWidth >= scrollPosition.scrollWidth ? right.style.display = 'none' : right.style.display = 'block'
}
useEffect(()=>{
    const scrollPosition = scrollRef.current
    scrollPosition.addEventListener('scroll',handleScroll)
    return ()=>scrollPosition.removeEventListener('scroll',handleScroll)
},[]) */