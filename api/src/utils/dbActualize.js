const { Videogame } = require("../db")

const dbActualize = async (games) => {
  for (const game of games) {
    await Videogame.create({
      name: game.name,
      description: game.description,
      platforms: game.parent_platforms,
      background_image: game.background_image,
      released: game.released,
      rating: game.rating
    })
  }
}

module.exports = dbActualize
