const PlatformRoutes = require('express').Router()
const { isAuth } = require('../../middlewares/auth')
const upload = require('../../middlewares/file')
const { postNewPlatform, getAllPlatforms, getPlatform} = require('./Platforms.controller')


PlatformRoutes.get('/', getAllPlatforms)
PlatformRoutes.get('/:id', getPlatform)
//PlatformRoutes.post('/', [isAuth], upload.single('img'), postNewPlatform)

module.exports = PlatformRoutes