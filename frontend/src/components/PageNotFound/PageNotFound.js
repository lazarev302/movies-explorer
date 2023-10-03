import React from "react"
import { Link } from "react-router-dom"

import "./PageNotFound.css"

function PageNotFound() {
  return (
    <main className="not-found">
      <h1 className="not-found__title">404</h1>
      <p className="not-found__subtitle">Страница не найдена</p>
      <Link className="button button_type_to-main" to="/movies">
        Назад
      </Link>
    </main>
  )
}

export default PageNotFound
