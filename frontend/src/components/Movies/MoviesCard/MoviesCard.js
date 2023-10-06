import React from "react"
import "./MoviesCard.css"
import { formatDuration } from "../../../utils/utils"
import deleteButton from "../../../images/d3.svg"

function MoviesCard({
  card,
  isSavedFilms,
  getLikeCard,
  saved,
  savedMovies,
  onDeleteCard,
}) {
  function onCardClick() {
    console.log("click like")
    if (saved) {
      onDeleteCard(savedMovies.filter((m) => m.movieId === card.id)[0])
      console.log(onDeleteCard)
    } else {
      getLikeCard(card)
      console.log(getLikeCard)
    }
  }

  function onDelete() {
    onDeleteCard(card)
    console.log(onDeleteCard)
  }

  const cardLikeButtonClassName = `${
    saved ? "card__like-button card__like-button_active" : "card__like-button"
  }`

  return (
    <>
      <li className="card" key={card.id}>
        <div className="card__wrapper">
          <a href={card.trailerLink} target="_blank" rel="noreferrer">
            <img
              className="card__image"
              alt={card.nameRU}
              src={
                isSavedFilms
                  ? card.image
                  : `https://api.nomoreparties.co/${card.image.url}`
              }
            />
          </a>

          {isSavedFilms ? (
            <button
              type="button"
              className="card__like-delete"
              onClick={onDelete}
            >
              <img
                className="card__like-delete"
                src={deleteButton}
                alt="удалить"
              />
            </button>
          ) : (
            <button
              type="button"
              className={cardLikeButtonClassName}
              onClick={onCardClick}
            ></button>
          )}

          <div className="card__title-block">
            <h2 className="card__title">{card.nameRU}</h2>
            <p className="card__time">{formatDuration(card.duration)}</p>
          </div>
        </div>
      </li>
    </>
  )
}

export default MoviesCard
