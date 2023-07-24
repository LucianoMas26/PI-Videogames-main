const initialState = {
  videogames: [],
  allVideogames: [],
  genres: [],
  platforms: []
}

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_VIDEOGAMES":
      if (state.videogames.length === 0) {
        return {
          ...state,
          videogames: action.payload,
          allVideogames: action.payload
        }
      }
      return {
        ...state,
        allVideogames: action.payload
      }

    case "GET_PLATFORMS":
      return {
        ...state,
        platforms: action.payload
      }
    case "GET_NAME_VIDEOGAME":
      return {
        ...state,
        videogames: action.payload
      }
    case "POST_VIDEOGAME":
      return {
        ...state
      }
    case "GET_GENRES":
      return {
        ...state,
        genres: action.payload
      }

    case "FILTER_BY_GENRE":
      const genreName = action.payload
      const genreVideogames = state.allVideogames

      if (genreName === "") {
        return {
          ...state,
          videogames: genreVideogames
        }
      } else {
        const filteredVideogames = genreVideogames.filter((videogame) =>
          videogame.genres.includes(genreName)
        )
        return {
          ...state,
          videogames: filteredVideogames
        }
      }

    case "FILTER_BY_RATING":
      const { rating } = action.payload
      const allVideogames = state.allVideogames

      if (rating === "popular") {
        const sortedVideogames = state.videogames.sort(
          (a, b) => b.rating - a.rating
        )
        return {
          ...state,
          videogames: sortedVideogames
        }
      } else if (rating === "unpopular") {
        const sortedVideogames = state.videogames.sort(
          (a, b) => a.rating - b.rating
        )
        return {
          ...state,
          videogames: sortedVideogames
        }
      } else if (rating === "all") {
        return {
          ...state,
          videogames: allVideogames
        }
      }

    case "SORT_BY_NAME":
      const { order } = action.payload

      let alfabetic = [...state.allVideogames]
      let otherAlfabetic = [...state.videogames]

      if (order === "ascendent") {
        alfabetic.sort((a, b) => b.name.localeCompare(a.name))
        otherAlfabetic.sort((a, b) => b.name.localeCompare(a.name))
        return {
          ...state,
          allVideogames: alfabetic,
          videogames: otherAlfabetic
        }
      }
      if (order === "descendent") {
        alfabetic.sort((a, b) => a.name.localeCompare(b.name))
        otherAlfabetic.sort((a, b) => a.name.localeCompare(b.name))
        return {
          ...state,
          allVideogames: alfabetic,
          videogames: otherAlfabetic
        }
      } else {
        alfabetic = state.allVideogames
      }
      return {
        ...state,
        countries: alfabetic
      }

    case "FILTER_CREATED":
      const createdFilter =
        action.payload === "created"
          ? state.allVideogames.filter((videogame) => videogame.created)
          : state.allVideogames.filter((videogame) => !videogame.created)
      return {
        ...state,
        videogames: createdFilter
      }

    default:
      return state
  }
}

export default rootReducer
