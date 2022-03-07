import { useState, useRef } from 'react'
import '../Styles/Components/SearchBar.scss'

export const SearchBar = ({ query, results, retrieve, visible, setVisible }: any) => {

    const [placeHolder, setPlaceHolder] = useState("")
    const reference : any = useRef();

    return (
        <div className="search-bar">

            <input ref={reference} type={"text"}  onChange={query || ''} placeholder={placeHolder} />
           
            <div className={"result-wrapper"}>
                {results && results.map(

                    (place: any) => {
                        return (


                            visible ? <div key={place.raw.place_id} className="result" onClick={() => {
                                retrieve(place)
                                setPlaceHolder(place.label)
                                setVisible(false)
                                reference.current.value = ""
                            }}>
                                {place.label}
                            </div> : ""

                        )
                    }
                )}

            </div>

        </div>
    )
}