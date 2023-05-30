require("dotenv").config()
const { URL, KEY } = process.env
const axios = require("axios")

const IdService = async (id) => {
  const url = `${URL}/games/${id}?key=${KEY}`

  const response = await axios(url)
  const {
    name,
    description,
    released,
    background_image,
    rating,
    genres,
    parent_platforms
  } = response.data
  if (parent_platforms) {
    platformNames = parent_platforms.map((platform) => platform.platform.name)
  }
  if (genres) {
    genresNames = genres.map((genre) => genre.name)
  }

  const parsedDescription = description.replace(/<[^>]+>/g, "")

  let videoGame = {
    name,
    parsedDescription,
    released,
    background_image,
    rating,
    genresNames,
    platformNames
  }
  if (!videoGame) {
    throw Error("Missing some data")
  } else {
    return {
      id,
      name,
      description: parsedDescription,
      released,
      background_image,
      rating,
      genres: genresNames,
      platforms: platformNames,
      created: false
    }
  }
}

module.exports = IdService
