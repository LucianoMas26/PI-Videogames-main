require("dotenv").config()
const { URL, KEY } = process.env
const axios = require("axios")
const { Gender } = require("../db")
const genreService = async () => {
  const genresInDb = await Gender.findAll()
  if (genresInDb.length > 0) {
    return genresInDb
  }
  const url = `${URL}/genres?key=${KEY}`
  const { data } = await axios.get(url)
  const listOfGenres = data.results.map((genre) => {
    return {
      id: genre.id,
      name: genre.name
    }
  })
  if (!listOfGenres) {
    throw Error("Not genres found")
  } else {
    Gender.bulkCreate(listOfGenres)
    const listOfGenresFromDb = await Gender.findAll()
    return listOfGenresFromDb
  }
}
module.exports = genreService
