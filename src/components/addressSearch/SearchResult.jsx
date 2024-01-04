import React from 'react'
import "./Search.css"

const SearchResult = ({result, setSelectedAddress}) => {


  const selected = () => {
    setSelectedAddress({id: result.place_id, name: result.display_place, addressString: result.display_address})
  }
  console.log(result.name);
  return (
    <div 
      className='search-result' 
      onClick={selected}>
        {result.display_name}
    </div>
  )
}

export default SearchResult