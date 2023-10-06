import React from "react"
import { useNavigate } from "react-router-dom"

import "./PageNotFound.css"

function PageNotFound() {
  const path = useNavigate()

  function navPath() {
    path(-3)
  }

  return (
    <main className="not-found">
      <h1 className="not-found__title">404</h1>
      <p className="not-found__subtitle">Страница не найдена</p>
      <button className="button button_type_to-main" onClick={navPath}>
        Назад
      </button>
    </main>
  )
}

export default PageNotFound
