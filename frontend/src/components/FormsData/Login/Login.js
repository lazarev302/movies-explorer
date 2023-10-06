import React from "react"
import "../Form/Form.css"
import Form from "../Form/Form"
import { EMAIL_REG } from "../../../utils/constants"
import useForm from "../../../hooks/useForm"

function Login({ authorizedUser, isLoading }) {
  const { inputValues, isFormValid, errors, handleChangeInput } = useForm()

  function getUpdateUserInfo(event) {
    event.preventDefault()
    authorizedUser({
      email: inputValues.email,
      password: inputValues.password,
    })
  }

  return (
    <Form
      title="Рады видеть!"
      buttonText="Войти"
      formInformText="Еще не зарегистрированы?"
      linkText=" Регистрация"
      link="/signup"
      onSubmit={getUpdateUserInfo}
      isDisablButton={!isFormValid}
      isLoading={isLoading}
      noValidate
    >
      <label className="form__label">
        E-mail
        <input
          name="email"
          className="form__input"
          id="email-input"
          type="email"
          required
          placeholder="почта"
          onChange={handleChangeInput}
          value={inputValues.email || ""}
          pattern={EMAIL_REG}
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
          minLength="8"
          maxLength="14"
          required
          placeholder="пароль"
          value={inputValues.password || ""}
          onChange={handleChangeInput}
        />
        <span className="form__input-text">{errors.password}</span>
      </label>
    </Form>
  )
}

export default Login
