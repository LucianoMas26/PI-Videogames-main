const { platformService } = require("../services/index")

const getPlatforms = async (req, res) => {
  try {
    const listOfPlatforms = await platformService()
    res.status(200).json(listOfPlatforms)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = getPlatforms
