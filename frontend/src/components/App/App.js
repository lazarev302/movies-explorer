import React, { useState, useEffect } from "react"
import Header from "../Header/Header"
import Main from "../Main/Main"
import CurrentUserContext from "../../contexts/CurrentUserContext"
import Movies from "../Movies/Movies"
import SavedMovies from "../Movies/SavedMovies/SavedMovies"
import {
  Route,
  Routes,
  useNavigate,
  useLocation,
  Navigate,
} from "react-router-dom"
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute"
import Footer from "../Footer/Footer"
import Register from "../FormsData/Register/Register"
import Login from "../FormsData/Login/Login"
import Profile from "../FormsData/Profile/Profile"
import PageNotFound from "../PageNotFound/PageNotFound"
import "./App.css"
import InfoTooltipUpdate from "../Popups/infoTooltipUpdate/infoTooltipUpdate"
import InfoTooltip from "../Popups/InfoTooltip/InfoTooltip"
import * as api from "../../utils/MainApi"

function App() {
  const [currentUser, setCurrentUser] = useState({})
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [savedMovies, setSavedMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isInfoToolTipPopupOpen, setInfoToolTipPopupOpen] = useState(false)
  const [isInfoTooltipUpdatePopupOpen, setInfoTooltipUpdatePopupOpen] =
    useState(false)
  const [isUpdate, setIsUpdate] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const location = useLocation()
  const path = location.pathname
  const navigate = useNavigate()
  const isOpen = isInfoToolTipPopupOpen || isInfoTooltipUpdatePopupOpen

  // Все функции

  function getRegistration({ name, email, password }) {
    setIsLoading(true)
    api
      .registrationUser(name, email, password)
      .then(() => {
        getLogin({ email, password })
        setInfoToolTipPopupOpen(true)
        setIsSuccess(true)
      })
      .catch((error) => {
        setInfoToolTipPopupOpen(true)
        setIsSuccess(false)
        console.log(error)
      })
      .finally(() => setIsLoading(false))
  }

  function getLogin({ email, password }) {
    setIsLoading(true)
    api
      .loginUser(email, password)
      .then((res) => {
        if (res) {
          setIsSuccess(true)
          setInfoToolTipPopupOpen(true)
          localStorage.setItem("jwt", res.token)
          navigate("/movies", { replace: true })
          setIsLoggedIn(true)
        }
      })
      .catch((error) => {
        setInfoToolTipPopupOpen(true)
        setIsSuccess(false)
        console.log(error)
      })
      .finally(() => setIsLoading(false))
  }

  function getLikeCard(card) {
    console.log(card)
    api
      .addCardMovie(card)
      .then((addMovieCard) => {
        setSavedMovies([addMovieCard, ...savedMovies])
      })
      .catch((error) => {
        setIsSuccess(false)
        console.log(error)
        getErrorInfoAuthorization(error)
      })
  }

  function getDeletedCard(card) {
    console.log(card)
    api
      .deletedCardMovie(card._id)
      .then(() => {
        setSavedMovies((state) => state.filter((item) => item._id !== card._id))
      })
      .catch((error) => {
        setIsSuccess(false)
        console.log(error)
        getErrorInfoAuthorization(error)
      })
  }

  function getUpdateInformationProfile(newInfoProfile) {
    setIsLoading(true)
    api
      .editUserInfo(newInfoProfile)
      .then((data) => {
        setInfoTooltipUpdatePopupOpen(true)
        setIsUpdate(true)
        setCurrentUser(data)
      })
      .catch((error) => {
        setInfoTooltipUpdatePopupOpen(true)
        setIsUpdate(false)
        console.log(error)
        getErrorInfoAuthorization(error)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  function closeAllPopups() {
    setInfoToolTipPopupOpen(false)
    setInfoTooltipUpdatePopupOpen(false)
  }

  function closeByOverlay(event) {
    if (event.target === event.currentTarget) {
      closeAllPopups()
    }
  }

  function getErrorInfoAuthorization(error) {
    if (error === "Error: 401") {
      getExitMovie()
    }
  }

  function getExitMovie() {
    setIsLoggedIn(false)
    localStorage.removeItem("addMovies")
    localStorage.removeItem("movies")
    localStorage.removeItem("searchMovies")
    localStorage.removeItem("shortMovies")
    localStorage.removeItem("jwt")
    navigate("/")
  }

  // Все Юзэффекты

  useEffect(() => {
    const jwt = localStorage.getItem("jwt")
    if (jwt) {
      api
        .getUserMe(jwt)
        .then((res) => {
          if (res) {
            setIsLoggedIn(true)
            localStorage.removeItem("addMovies")
          }
          navigate(path)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }, [])

  useEffect(() => {
    if (isLoggedIn) {
      api
        .getUserInfo()
        .then((profileInfo) => {
          setCurrentUser(profileInfo)
        })
        .catch((error) => {
          console.log(error)
        })
      api
        .getMovies()
        .then((cardsSaveMovies) => {
          setSavedMovies(cardsSaveMovies.reverse())
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }, [isLoggedIn])

  useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === "Escape") {
        closeAllPopups()
      }
    }
    if (isOpen) {
      document.addEventListener("keydown", closeByEscape)
      return () => {
        document.removeEventListener("keydown", closeByEscape)
      }
    }
  }, [isOpen])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__wrapper">
          <Routes>
            <Route
              path={"/"}
              element={
                <>
                  <Header loggedIn={isLoggedIn} />
                  <Main />
                  <Footer />
                </>
              }
            />
            <Route
              path={"/signin"}
              element={
                isLoggedIn ? (
                  <Navigate to="/movies" replace />
                ) : (
                  <Login isLoading={isLoading} authorizedUser={getLogin} />
                )
              }
            />
            <Route
              path={"/signup"}
              element={
                isLoggedIn ? (
                  <Navigate to="/movies" replace />
                ) : (
                  <Register
                    isLoading={isLoading}
                    getRegistration={getRegistration}
                  />
                )
              }
            />
            <Route path={"*"} element={<PageNotFound />} />
            <Route
              path={"/movies"}
              element={
                <ProtectedRoute
                  path="/movies"
                  loggedIn={isLoggedIn}
                  component={Movies}
                  savedMovies={savedMovies}
                  getLikeCard={getLikeCard}
                  onDeleteCard={getDeletedCard}
                />
              }
            />
            <Route
              path={"/saved-movies"}
              element={
                <ProtectedRoute
                  path="/saved-movies"
                  loggedIn={isLoggedIn}
                  savedMovies={savedMovies}
                  component={SavedMovies}
                  onDeleteCard={getDeletedCard}
                />
              }
            />
            <Route
              path={"/profile"}
              element={
                <ProtectedRoute
                  path="/profile"
                  component={Profile}
                  loggedIn={isLoggedIn}
                  isLoading={isLoading}
                  onUpdateUser={getUpdateInformationProfile}
                  signOut={getExitMovie}
                />
              }
            />
          </Routes>
          <InfoTooltip
            isOpen={isInfoToolTipPopupOpen}
            isSuccess={isSuccess}
            onClose={closeAllPopups}
            onCloseOverlay={closeByOverlay}
          />
          <InfoTooltipUpdate
            isOpen={isInfoTooltipUpdatePopupOpen}
            isUpdate={isUpdate}
            onClose={closeAllPopups}
            onCloseOverlay={closeByOverlay}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App
