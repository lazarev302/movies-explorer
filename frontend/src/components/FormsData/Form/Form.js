import React from "react"
import { Link } from "react-router-dom"
import logo from "../../../images/header-logo.svg"
import "./Form.css"

function Form({
  title,
  children,
  linkText,
  link,
  isLoading,
  buttonText,
  formInformText,
  isDisablButton,
  onSubmit,
}) {
  return (
    <>
      <main className="form__container">
        <Link to="/" className="logo">
          <img src={logo} alt="логотип" />
        </Link>
        <h1 className="form__title">{title}</h1>
        <form className="form" id="form" onSubmit={onSubmit} noValidate>
          {children}
          <button
            type="submit"
            className={
              isDisablButton || isLoading
                ? "form__button-save form__button-save_inactive"
                : "form__button-save"
            }
            disabled={isDisablButton ? true : false}
          >
            {buttonText}
          </button>
        </form>
        <p className="form__text">
          {formInformText}
          <Link to={link} className="form__link">
            {linkText}
          </Link>
        </p>
      </main>
    </>
  )
}

export default Form
