import React, { useState, useEffect } from "react"
import MoviesCardList from "../MoviesCardList/MoviesCardList"
import Footer from "../../Footer/Footer"
import SearchForm from "../SearchForm/SearchForm"
import Header from "../../Header/Header"
import { filterMovies, filterDurationFilm } from "../../../utils/utils"

function SavedMovies({ loggedIn, onDeleteCard, savedMovies }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredMovies, setFilteredMovies] = useState(savedMovies)
  const [isShortMovies, setisShortMovies] = useState(false)
  const [isNotFound, setIsNotFound] = useState(false)

  useEffect(() => {
    if (filteredMovies.length === 0) {
      setIsNotFound(true)
    } else {
      setIsNotFound(false)
    }
  }, [filteredMovies])

  useEffect(() => {
    const moviesFilmList = filterMovies(savedMovies, searchQuery)
    setFilteredMovies(
      isShortMovies ? filterDurationFilm(moviesFilmList) : moviesFilmList
    )
  }, [savedMovies, isShortMovies, searchQuery])

  function getShortMoviesPlay() {
    setisShortMovies(!isShortMovies)
  }

  function getSearchValuesQuery(query) {
    setSearchQuery(query)
  }

  return (
    <section className="movies">
      <Header loggedIn={loggedIn} />
      <SearchForm
        getSearchValuesQuery={getSearchValuesQuery}
        onFilterMovies={getShortMoviesPlay}
      />
      <MoviesCardList
        cards={filteredMovies}
        savedMovies={savedMovies}
        isSavedFilms={true}
        onDeleteCard={onDeleteCard}
        isNotFound={isNotFound}
      />
      <Footer />
    </section>
  )
}

export default SavedMovies
