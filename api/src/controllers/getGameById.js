const { IdService, idDataBase } = require("../services/index")

const getGameById = async (req, res) => {
  const { id } = req.params
  try {
    if (isNaN(id)) {
      const videoGameFromDb = await idDataBase(id)
      res.status(200).json(videoGameFromDb)
    } else {
      const videoGame = await IdService(id)
      res.status(200).json(videoGame)
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = getGameById
