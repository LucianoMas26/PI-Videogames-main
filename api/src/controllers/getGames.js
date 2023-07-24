const { gameService, gameByNameDb } = require("../services/index")

const getGames = async (req, res) => {
  try {
    const { name } = req.query
    const gamesFromApi = await gameService(name)
    const gamesFromDb = await gameByNameDb(name)

    let allGames = []
    if (gamesFromApi && gamesFromDb) {
      allGames = [...gamesFromApi, ...gamesFromDb]
    } else if (gamesFromApi) {
      allGames = gamesFromApi
    } else {
      allGames = gamesFromDb
    }

    res.status(200).json(allGames)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
module.exports = getGames
