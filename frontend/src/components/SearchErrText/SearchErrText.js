import React from "react"
import "./SearchErrText.css"

function SearchErrText({ errorText }) {
  return <p className="search__error-text">{errorText}</p>
}

export default SearchErrText
