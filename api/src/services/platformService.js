require("dotenv").config()
const { URL, KEY } = process.env
const axios = require("axios")
const { Platform } = require("../db")

const platformService = async () => {
  const platformsInDb = await Platform.findAll()
  if (platformsInDb.length > 0) {
    return platformsInDb
  }
  const url = `${URL}/platforms?key=${KEY}`
  const { data } = await axios.get(url)
  const listOfPlatforms = data.results.map((platform) => {
    return {
      id: platform.id,
      name: platform.name
    }
  })
  if (!listOfPlatforms) {
    throw Error("Not platform found")
  } else {
    Platform.bulkCreate(listOfPlatforms)
    const listOfPlatformsFromDb = await Platform.findAll()
    return listOfPlatformsFromDb
  }
}
module.exports = platformService
