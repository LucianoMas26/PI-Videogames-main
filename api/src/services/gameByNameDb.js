const { Videogame } = require("../db")
const { Op } = require("sequelize")
const gameByNameDb = async (name) => {
  if (name) {
    const videoGame = await Videogame.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`
        }
      }
    })

    const formattedVideoGames = videoGame.map((game) => {
      const genres = Array.isArray(game.genres)
        ? game.genres.join(", ")
        : game.genres
      const platforms = Array.isArray(game.platforms)
        ? game.platforms.join(", ")
        : game.platforms

      return {
        ...game.toJSON(),
        genres,
        platforms
      }
    })

    return formattedVideoGames
  } else {
    const allVideoGames = await Videogame.findAll()

    const formattedAllVideoGames = allVideoGames.map((game) => {
      // Unir géneros y plataformas en una cadena separada por comas
      const genres = Array.isArray(game.genres)
        ? game.genres.join(", ")
        : game.genres
      const platforms = Array.isArray(game.platforms)
        ? game.platforms.join(", ")
        : game.platforms

      return {
        ...game.toJSON(),
        genres,
        platforms
      }
    })

    return formattedAllVideoGames
  }
}

module.exports = gameByNameDb
