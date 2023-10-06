import React, { useState, useEffect } from "react"
import MoviesCardList from "./MoviesCardList/MoviesCardList"
import SearchForm from "./SearchForm/SearchForm"
import Footer from "../Footer/Footer"
import "./Movies.css"
import Header from "../Header/Header"
import { filterMovies, filterDurationFilm } from "../../utils/utils"
import * as movies from "../../utils/MoviesApi"

function Movies({ loggedIn, savedMovies, getLikeCard, onDeleteCard }) {
  const [isLoading, setIsLoading] = useState(false)
  const [initialCards, setInitialCards] = useState([])
  const [isShortMovies, setisShortMovies] = useState(false)
  const [filteredMovies, setFilteredMovies] = useState([])
  const [isReqError, setisReqError] = useState(false)
  const [isNotFound, setIsNotFound] = useState(false)

  // Получение короткометражек
  useEffect(() => {
    setisShortMovies(localStorage.getItem("shortMovies") === "true")
  }, [])

  // Получение фильмов из локального хранилища
  useEffect(() => {
    if (localStorage.getItem("movies")) {
      const movies = JSON.parse(localStorage.getItem("movies"))
      setInitialCards(movies)
      if (localStorage.getItem("shortMovies") === "true") {
        setFilteredMovies(filterDurationFilm(movies))
      } else {
        setFilteredMovies(movies)
      }
    }
  }, [])

  useEffect(() => {
    if (localStorage.getItem("searchMovies")) {
      setIsNotFound(filteredMovies.length === 0)
    } else {
      setIsNotFound(false)
    }
  }, [filteredMovies])

  // Функция поиска
  function getSearchValuesQuery(query) {
    localStorage.setItem("searchMovies", query)
    localStorage.setItem("shortMovies", isShortMovies)
    if (localStorage.getItem("addMovies")) {
      const movies = JSON.parse(localStorage.getItem("addMovies"))
      getMoviesFilter(movies, query, isShortMovies)
    } else {
      setIsLoading(true)
      movies
        .getMovies()
        .then((cardsSaveMovies) => {
          getMoviesFilter(cardsSaveMovies, query, isShortMovies)
          setisReqError(false)
        })
        .catch((error) => {
          setisReqError(true)
          console.log(error)
        })
        .finally(() => {
          setIsLoading(false)
        })
    }
  }

  // Функция для фильтрации
  function getMoviesFilter(movies, query, short) {
    const moviesFilmList = filterMovies(movies, query, short)
    setInitialCards(moviesFilmList)
    setFilteredMovies(
      short ? filterDurationFilm(moviesFilmList) : moviesFilmList
    )
    localStorage.setItem("movies", JSON.stringify(moviesFilmList))
    localStorage.setItem("addMovies", JSON.stringify(movies))
  }

  function getShortMoviesPlay() {
    setisShortMovies(!isShortMovies)
    if (!isShortMovies) {
      const filteredCardsMovies = filterDurationFilm(initialCards)
      setFilteredMovies(filteredCardsMovies)
    } else {
      setFilteredMovies(initialCards)
    }
    localStorage.setItem("shortMovies", !isShortMovies)
  }

  return (
    <section className="movies">
      <Header loggedIn={loggedIn} />
      <SearchForm
        getSearchValuesQuery={getSearchValuesQuery}
        onFilterMovies={getShortMoviesPlay}
        isShortMovies={isShortMovies}
      />
      <MoviesCardList
        cards={filteredMovies}
        isLoading={isLoading}
        savedMovies={savedMovies}
        getLikeCard={getLikeCard}
        onDeleteCard={onDeleteCard}
        isSavedFilms={false}
        isReqError={isReqError}
        isNotFound={isNotFound}
      />
      <Footer />
    </section>
  )
}

export default Movies
