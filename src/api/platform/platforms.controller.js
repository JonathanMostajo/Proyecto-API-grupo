const Platform = require('./platforms.model')
const { setError } = require('../../utils/error/error')


const postNewPlatform = async (req, res, next) => {
    try {
        const newPlatform = new Platform()
        newPlatform.name = req.body.name
        if (req.file) {
            newPlatform.img = req.file.path
        }
        const platformDB = await newPlatform.save()
        return res.status(201).json(platformDB)
    } catch (error) {
        return next(setError(500, 'Platform not saved'))
    }
}

const getAllPlatforms = async (req, res, next) => {
    try {
        const platformsDB = await Platform.find()
        res.status(200).json(platformsDB)
    } catch (error) {
        return next(setError(500, 'Platform failed server'))
    }
}

const getPlatform = async (req, res, next) => {
    try {
        const { id } = req.params
        const platformDB = await Platform.findById(id)
        if (!platformDB) {
            return next(setError(404, 'Platform not found'))
        }
        return res.status(200).json(platformDB)
    } catch (error) {
        return next(setError(500, 'Platform server error'))
    }
}



module.exports = {
    postNewPlatform,
    getAllPlatforms,
    getPlatform,
}