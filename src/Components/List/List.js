import './List.css'
import {useState, useEffect, useRef} from 'react'
import {AiOutlineArrowLeft, AiOutlineArrowRight} from 'react-icons/ai'
import Tile from '../Tile/Tile'

/* The List Component is the horizontal container of clickable film posters, 20 in length for each
 This component receives an array of objects {results} as a prop from the App component to populate featured sections, 
 the Search component for listing results, and the Genre component for displaying a list based on selection*/

 /*This component utilizes three React hooks, useEffect for instance, for setting which clickable poster has been selected
 in order for that film's id to be sent to the Tile component for displaying an individual film's info,
 the useRef hook is utilized to capture the container's scroll position, having a hidden x-overflow, ref.current.scrollBy gives the
 custom buttons on either side their functionality in place of the removed default scroll bar
 useEffect is put into action for the purpose of implementing the auto-scroll interval, in the interval function, 
 the list of films scrolls ahead 1200px every 20 seconds, and automatically resets to the beginning of the container upon reaching the end
 This interval mounts and then clears each iteration, and has an empty dependency array, instead of watching the state of an element
 state is used within the useEffect to set the interval of the auto-scroll*/

 /*Space was added on either side of the container so that the custom buttons do not block the left or rightmost film at either end
 When a poster in the list is clicked, the Tile component is made visible, with the targets film's id sent to it*/

export default function List({results}){
    const [selected,setSelected] = useState('')
    const [scrollInterval, setScrollInterval] = useState(null)
    const scrollRef = useRef(null)
    const handleLeft = ()=>scrollRef.current.scrollBy({left: -1200, behavior: 'smooth'})
    const handleRight = ()=>scrollRef.current.scrollBy({left: 1200, behavior: 'smooth'})
    const handleClick = (e)=>setSelected(e.target.id)

    useEffect (()=>{
        const scroll = scrollRef.current
        const offset = scroll.offsetWidth
        const content = scroll.scrollWidth
        const amount = 1200
        const interval = setInterval(()=>{
            scroll.scrollLeft + offset > content ? scroll.scrollLeft = 0 : scroll.scrollLeft += amount
        },20000)
        setScrollInterval(interval)
        return ()=> clearInterval(interval)
    },[])
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