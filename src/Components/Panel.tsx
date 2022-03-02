import { OpenStreetMapProvider } from "leaflet-geosearch"
import { useEffect, useState } from "react"
import { SearchBar } from "./SearchBar"
import '../Styles/Components/Panel.scss'

const provider = new OpenStreetMapProvider( )

export const Panel = ( { places, visible,setVisibility,setPlaces } :any ) => {

    const [selected, setSelected] = useState( {} )
    const [search, setSearch] = useState( "" )

    useEffect( ( ) => {

        provider.search({ query: search}).then( (res:any) => {
          setPlaces(res)
          setVisibility(true)
        })
      }, [search] )
      

    const places_query = ( e : any ) => {
        setSearch(e.target.value)
      }
    
      const retrievePlace = ( place : any ) => {
        setSelected( place )
      }

    return (
        <div className="panel">
            <SearchBar query={places_query} results={ places } retrieve = { retrievePlace } visible={visible} setVisible = { setVisibility }/>
            <form>
                <label>Username</label>
                <textarea required></textarea>
                <label>Crisis category</label>
                <input type={"text"} required/>
                
            </form>
        </div>
    )
}