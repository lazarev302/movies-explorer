import React, { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { ERROR_TEXT_ONE, ERROR_TEXT_TWO } from "../../../utils/constants"
import MoviesCard from "../MoviesCard/MoviesCard"
import SearchErrText from "../../SearchErrText/SearchErrText"
import "./MoviesCardList.css"
import Preloader from "../../Preloader/Preloader"
import {
  DESKTOP_WIDTH,
  PLANSHET_WIDTH,
  COUNT_TWELVE,
  COUNT_EIGHT,
  COUNT_FIVE,
  COUNT_PLUS_THREE,
  COUNT_PLUS_TWO,
} from "../../../utils/constants"

function MoviesCardList({
  isLoading,
  cards,
  isSavedFilms,
  savedMovies,
  getLikeCard,
  onDeleteCard,
  isReqError,
  isNotFound,
}) {
  const [shownMovies, setShownMovies] = useState(0)

  function getSaveMovieData(savedMovies, card) {
    return savedMovies.find((savedMovie) => savedMovie.movieId === card.id)
  }

  function getShowCardWidthDisplay() {
    const display = window.innerWidth
    if (display > DESKTOP_WIDTH) {
      setShownMovies(COUNT_TWELVE)
    } else if (display > PLANSHET_WIDTH) {
      setShownMovies(COUNT_EIGHT)
    } else {
      setShownMovies(COUNT_FIVE)
    }
  }

  function getShowMovieCounterAddBtn() {
    const display = window.innerWidth
    if (display > DESKTOP_WIDTH) {
      setShownMovies(shownMovies + COUNT_PLUS_THREE)
    } else if (display > PLANSHET_WIDTH) {
      setShownMovies(shownMovies + COUNT_PLUS_TWO)
    } else {
      setShownMovies(shownMovies + COUNT_PLUS_TWO)
    }
  }

  const { pathname } = useLocation()

  useEffect(() => {
    getShowCardWidthDisplay()
  }, [cards])

  return (
    <section className="cards">
      {isLoading && <Preloader />}
      {isNotFound && !isLoading && <SearchErrText errorText={ERROR_TEXT_ONE} />}
      {isReqError && !isLoading && <SearchErrText errorText={ERROR_TEXT_TWO} />}
      {!isLoading && !isReqError && !isNotFound && (
        <>
          {pathname === "/saved-movies" ? (
            <>
              <ul className="cards__list">
                {cards.map((card) => (
                  <MoviesCard
                    key={isSavedFilms ? card._id : card.id}
                    card={card}
                    saved={getSaveMovieData(savedMovies, card)}
                    savedMovies={savedMovies}
                    isSavedFilms={isSavedFilms}
                    cards={cards}
                    getLikeCard={getLikeCard}
                    onDeleteCard={onDeleteCard}
                  />
                ))}
              </ul>
            </>
          ) : (
            <>
              <ul className="cards__list">
                {cards.slice(0, shownMovies).map((card) => (
                  <MoviesCard
                    key={isSavedFilms ? card._id : card.id}
                    saved={getSaveMovieData(savedMovies, card)}
                    cards={cards}
                    savedMovies={savedMovies}
                    card={card}
                    isSavedFilms={isSavedFilms}
                    getLikeCard={getLikeCard}
                    onDeleteCard={onDeleteCard}
                  />
                ))}
              </ul>
              <div className="cards__button-container">
                {cards.length > shownMovies ? (
                  <button
                    className="cards__button"
                    onClick={getShowMovieCounterAddBtn}
                  >
                    Ещё
                  </button>
                ) : (
                  ""
                )}
              </div>
            </>
          )}
        </>
      )}
    </section>
  )
}

export default MoviesCardList
