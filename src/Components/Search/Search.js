import './Search.css'
import Tile from '../Tile/Tile'

export default function Search(props){
    return (
        <>
      <input onChange={props.handleChange} value={props.search} placeholder='Enter Title'/>
      <button onClick={()=>console.log(props.results)}>Click</button>
      {props.filtered.map(result=><div onClick={props.handleClick} key={result.id}>{result.name}</div>)}
      <Tile movie={props.selected}/>
        </>
    )
}