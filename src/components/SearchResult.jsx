import React from "react"
import './SearchResult.css'

function SearchResult({city}) {
    return  (
        <div className="search-result">
            <h2>Search Result:</h2>
            <p className="city-name">{city}</p>
        </div>
    )
}

export default SearchResult