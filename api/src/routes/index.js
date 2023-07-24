const { Router } = require("express")
const {
  getGames,
  getGameById,
  postGame,
  getGenres,
  getPlatforms
} = require("../controllers/index")
const router = Router()

router.get("/videogames", getGames)
router.get("/videogames/:id", getGameById)
router.post("/videogames", postGame)
router.get("/genres", getGenres)
router.get("/platforms", getPlatforms)

module.exports = router
