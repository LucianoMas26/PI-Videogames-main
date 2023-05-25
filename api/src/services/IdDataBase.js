const { Videogame, Gender, Platform } = require("../db")

const idDataBase = async (id) => {
  const videoGame = await Videogame.findByPk(id, {
    include: [
      {
        model: Gender,
        attributes: ["name"],
        through: { attributes: [] }
      },
      {
        model: Platform,
        attributes: ["name"],
        through: { attributes: [] }
      }
    ]
  })
  if (!videoGame) {
    throw Error("Videogame not found")
  } else {
    return videoGame
  }
}

module.exports = idDataBase
