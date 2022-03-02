import { useState } from 'react'
import '../Styles/Components/SearchBar.scss'

export const SearchBar = ( { query, results, retrieve,visible,setVisible } : any ) => {

    const [placeHolder, setPlaceHolder] = useState("")

    return (
        <div className="search-bar">

            <input type={"text"} onChange={query || ''} placeholder={placeHolder}/>

            {results && results.map(

                ( place : any ) => {
                    return (
                       
                        
                           visible ? <div key={place.raw.place_id} className="result" onClick = { ( ) => { 
                                retrieve(place)
                                setPlaceHolder(place.label)
                                setVisible(false)
                                }}>
                                 {place.label}
                                 </div> : ""
                       
                    )
                }
            )}
        </div>
    )
}