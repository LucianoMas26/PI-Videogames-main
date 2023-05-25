const gameService = require("./gameService")
const IdService = require("./IdService")
const idDataBase = require("./IdDataBase")
const gameByNameDb = require("./gameByNameDb")
const createGame = require("./createGame")
const genreService = require("./genreService")
const platformService = require("./platformService")
module.exports = {
  gameService,
  idDataBase,
  IdService,
  gameByNameDb,
  createGame,
  genreService,
  platformService
}
