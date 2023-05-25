const { gameService, gameByNameDb } = require("../services/index")

const getGames = async (req, res) => {
  const { name } = req.query

  try {
    const gamesFromApi = await gameService(name)
    const gamesFromDb = await gameByNameDb(name)
    if (gamesFromApi && gamesFromDb) {
      const allGames = [...gamesFromApi, ...gamesFromDb]
      res.status(200).json(allGames)
    } else if (gamesFromApi) {
      res.status(200).json(gamesFromApi)
    } else {
      res.status(200).json(gamesFromDb)
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
module.exports = getGames
