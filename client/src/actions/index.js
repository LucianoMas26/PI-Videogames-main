import axios from "axios"
const URL = "https://pi-videogames-main-production-fa1b.up.railway.app/"

export function getVideogames() {
  return async function (dispatch) {
    const { data } = await axios.get(`${URL}videogames`)

    return dispatch({
      type: "GET_VIDEOGAMES",
      payload: data
    })
  }
}
export function getPlatforms() {
  return async function (dispatch) {
    const { data } = await axios.get(`${URL}platforms`)
    return dispatch({
      type: "GET_PLATFORMS",
      payload: data
    })
  }
}

export function getGenres() {
  return async function (dispatch) {
    const { data } = await axios.get(`${URL}genres`)
    return dispatch({
      type: "GET_GENRES",
      payload: data
    })
  }
}

export function postVideogame(payload) {
  return async function (dispatch) {
    const { data } = await axios.post(`${URL}videogames`, payload)
    return dispatch({
      type: "POST_VIDEOGAME",
      payload: data
    })
  }
}

export function filterVideogameName(name) {
  return async function (dispatch) {
    try {
      const { data } = await axios.get(`${URL}videogames?name=${name}`)

      return dispatch({
        type: "GET_NAME_VIDEOGAME",
        payload: data
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export function filterVideogamesByRating(selectedOption) {
  return {
    type: "FILTER_BY_RATING",
    payload: { rating: selectedOption }
  }
}

export function sortVideogamesByName(order) {
  return {
    type: "SORT_BY_NAME",
    payload: { order }
  }
}

export function filterCreated(payload) {
  return {
    type: "FILTER_CREATED",
    payload
  }
}

export const filterVideogamesByGenre = (genreName) => {
  return {
    type: "FILTER_BY_GENRE",
    payload: genreName
  }
}
