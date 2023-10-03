export const getSendingResponse = (res) => {
  if (res.ok) {
    return res.json()
  }
  return Promise.reject(`Error: ${res.status}`)
}

// Длительность фильмов по времени
export function filterDurationFilm(movies) {
  return movies.filter((movie) => movie.duration < 40)
}

// Формат часы и минуты
export function formatDuration(duration) {
  const hours = Math.floor(duration / 60)
  const minutes = duration % 60
  return `${hours}ч${minutes}м`
}

// Короткометражные фильмы
export function filterMovies(movies, query) {
  const moviesShortQuery = movies.filter((movie) => {
    const moviesRus = String(movie.nameRU).toLowerCase().trim()
    const moviesEng = String(movie.nameEN).toLowerCase().trim()
    const userQuery = query.toLowerCase().trim()
    return (
      moviesRus.indexOf(userQuery) !== -1 || moviesEng.indexOf(userQuery) !== -1
    )
  })
  return moviesShortQuery
}
