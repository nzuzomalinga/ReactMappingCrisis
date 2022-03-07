import { OpenStreetMapProvider } from "leaflet-geosearch"
import { useEffect, useState } from "react"
import { SearchBar } from "./SearchBar"
import '../Styles/Components/Panel.scss'
import {FaSearchLocation} from 'react-icons/fa'

const provider = new OpenStreetMapProvider({
  params: {

    countrycodes: 'za', // limit search results to the Netherlands
  },
})

export const Panel = ({ places, visible, setVisibility,
   setPlaces, addCrisis, panel }: any) => {

  const [phone, setPhone] = useState('');
  const [description, setDescription] = useState('');
  const [tag, setTag] = useState('fire');
  const [place, setSelected] = useState("")
  const [search, setSearch] = useState("")

  useEffect(() => {

    provider.search({ query: search }).then((res: any) => {

      setPlaces(res)
      setVisibility(true)
    })
  }, [search,setVisibility,setPlaces])

  
  const handleSubmit = (e: any) => {

    e.preventDefault();

    const crisis = { phone, description, tag, place };
    
    addCrisis(crisis)
    setPhone('')
    setDescription('')
  }

  const places_query = (e: any) => {
    setSearch(e.target.value)
  }

  const retrievePlace = (place: any) => {
    setSelected(place)
  }

  return (

    <div className={ panel ? "panel" : "hidden-panel" }>
      <h2 className="header-1">Search <span><FaSearchLocation/></span></h2>
      <SearchBar query={places_query} results={places} retrieve={retrievePlace} visible={visible} setVisible={setVisibility} />
      <h2>Report Crisis</h2>

      <form onSubmit={handleSubmit}>
        <label>Phone number:</label>
        <input
          type="text"
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <label>Description:</label>
        <textarea
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <label>Category:</label>
        <select
          value={tag}
          onChange={(e) => setTag(e.target.value)}
        >
          <option value="fire">fire</option>
          <option value="earthquake">earthquake</option>
          <option value="robbery">robbery</option>
          <option value="lightning strike">lightning strike</option>
        </select>
        <input type={"submit"}/>
      </form>
      
    </div>   
  )
}