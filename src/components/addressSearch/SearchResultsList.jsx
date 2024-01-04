import React from 'react'
import "./Search.css"
import SearchResult from './SearchResult'

const SearchResultsList = ({results, setSelectedAddress}) => {
  return (
    <div className='results-list'>
        {results[0] && results.map((address) => {
            return < SearchResult result={address} key={address.id} setSelectedAddress={setSelectedAddress}/> 
        })}
    </div>
  )
}

export default SearchResultsList