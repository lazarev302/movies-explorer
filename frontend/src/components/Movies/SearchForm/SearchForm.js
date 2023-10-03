import React, { useState, useEffect } from "react"
import FilterCheckbox from "../../FilterCheckbox/FilterCheckbox"
import "./SearchForm.css"
import { useLocation } from "react-router-dom"
import { ERROR_TEXT_THREE } from "../../../utils/constants"

function SearchForm({ getSearchValuesQuery, onFilterMovies, isShortMovies }) {
  const [query, setQuery] = useState("")
  const [isQueryErr, setIsQueryErr] = useState(false)
  const location = useLocation()

  function getUpdateUserInfo(event) {
    event.preventDefault()
    if (query.trim().length === 0) {
      setIsQueryErr(true)
    } else {
      setIsQueryErr(false)
      getSearchValuesQuery(query)
    }
  }

  function getQueryPlay(event) {
    setQuery(event.target.value)
  }

  useEffect(() => {
    if (
      location.pathname === "/movies" &&
      localStorage.getItem("searchMovies")
    ) {
      const localQuery = localStorage.getItem("searchMovies")
      setQuery(localQuery)
    }
  }, [location])

  return (
    <section className="search">
      <form className="search__form" id="form" onSubmit={getUpdateUserInfo}>
        <input
          type="text"
          name="query"
          id="search-input"
          placeholder="Фильм"
          className="search__form-input"
          value={query || ""}
          onChange={getQueryPlay}
        />
        <button type="submit" className="search__form-button"></button>
      </form>

      <FilterCheckbox
        isShortMovies={isShortMovies}
        onFilterMovies={onFilterMovies}
      />
      {isQueryErr && (
        <span className="search__form-error">{ERROR_TEXT_THREE}</span>
      )}

      <div className="search__border-bottom"></div>
    </section>
  )
}

export default SearchForm
