import React from "react"
import Form from "../Form/Form"
import "../../FormsData/Form/Form.css"
import useForm from "../../../hooks/useForm"
import { EMAIL_REG } from "../../../utils/constants"

function Register({ isLoading, getRegistration }) {
  const { inputValues, errors, handleChangeInput, isFormValid } = useForm()

  function getUpdateUserInfo(event) {
    event.preventDefault()
    getRegistration({
      name: inputValues.name,
      email: inputValues.email,
      password: inputValues.password,
    })
  }

  return (
    <Form
      title="Добро пожаловать!"
      buttonText="Зарегистрироваться"
      formInformText="Уже зарегистрированы?"
      linkText=" Войти"
      link="/signin"
      onSubmit={getUpdateUserInfo}
      isDisablButton={!isFormValid}
      isLoading={isLoading}
    >
      <label className="form__label">
        Имя
        <input
          name="name"
          className="form__input"
          id="name-input"
          type="text"
          minLength="2"
          maxLength="40"
          placeholder="имя"
          value={inputValues.name || ""}
          onChange={handleChangeInput}
          required
        />
        <span className="form__input-text">{errors.name}</span>
      </label>
      <label className="form__label">
        E-mail
        <input
          name="email"
          className="form__input"
          id="email-input"
          type="email"
          placeholder="почта"
          value={inputValues.email || ""}
          onChange={handleChangeInput}
          pattern={EMAIL_REG}
          required
        />
        <span className="form__input-text">{errors.email}</span>
      </label>
      <label className="form__label">
        Пароль
        <input
          name="password"
          className="form__input"
          id="password-input"
          type="password"
          required
          minLength="8"
          maxLength="14"
          placeholder="пароль"
          onChange={handleChangeInput}
          value={inputValues.password || ""}
        />
        <span className="form__input-text">{errors.password}</span>
      </label>
    </Form>
  )
}

export default Register
