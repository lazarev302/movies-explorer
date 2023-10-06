import React, { useEffect, useContext, useState } from "react"
import { Link } from "react-router-dom"
import Header from "../../Header/Header"
import { EMAIL_REG } from "../../../utils/constants"
import "./Profile.css"
import useForm from "../../../hooks/useForm"
import CurrentUserContext from "../../../contexts/CurrentUserContext"

function Profile({ loggedIn, isLoading, onUpdateUser, signOut }) {
  const { inputValues, errors, handleChangeInput, isFormValid, resetForm } =
    useForm()
  const [isLastValues, setIsLastValues] = useState(false)
  const currentUser = useContext(CurrentUserContext)

  useEffect(() => {
    if (currentUser) {
      resetForm(currentUser)
    }
  }, [currentUser, resetForm])

  function getUpdateUserInfo(event) {
    event.preventDefault()
    onUpdateUser({
      name: inputValues.name,
      email: inputValues.email,
    })
  }

  useEffect(() => {
    if (
      currentUser.name === inputValues.name &&
      currentUser.email === inputValues.email
    ) {
      setIsLastValues(true)
    } else {
      setIsLastValues(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValues])

  return (
    <>
      <Header loggedIn={loggedIn} />
      <section className="profile">
        <h1 className="profile__welcome">Привет, {currentUser.name}!</h1>
        <form
          id="form"
          className="profile__form"
          onSubmit={getUpdateUserInfo}
          noValidate
        >
          <label className="profile__label">
            Имя
            <input
              name="name"
              className="profile__input"
              id="name-input"
              type="text"
              minLength="2"
              maxLength="40"
              required
              placeholder="имя"
              value={inputValues.name || ""}
              onChange={handleChangeInput}
            />
            <span className="profile__form-text">{errors.name}</span>
          </label>

          <div className="profile__border"></div>
          <label className="profile__label">
            E-mail
            <input
              name="email"
              className="profile__input"
              id="email-input"
              type="email"
              required
              placeholder="почта"
              onChange={handleChangeInput}
              value={inputValues.email || ""}
              pattern={EMAIL_REG}
            />
            <span className="profile__form-text">{errors.email}</span>
          </label>
          <button
            type="submit"
            disabled={!isFormValid ? true : false}
            className={
              !isFormValid || isLoading || isLastValues
                ? "profile__button-save form__button-save_inactive"
                : "profile__button-save"
            }
          >
            Редактировать
          </button>

          <Link
            to="/profile"
            type="button"
            className="profile__link"
            onClick={signOut}
          >
            Выйти из аккаунта
          </Link>
        </form>
      </section>
    </>
  )
}

export default Profile
