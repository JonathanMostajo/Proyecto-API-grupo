const GameRoutes = require('express').Router()
const { isAuth } = require('../../middlewares/auth')
const upload = require('../../middlewares/file')
const { postNewGame, getAllGames, getGame, patchGame , getAllGamesSorted, getGamesFiltered} = require('./games.controller')


GameRoutes.get('/', getAllGames)
GameRoutes.get('/years/', getAllGamesSorted)
GameRoutes.get('/years/:id', getGamesFiltered)
GameRoutes.get('/:id', getGame)
GameRoutes.post('/', [isAuth], upload.single('img'), postNewGame)
//GameRoutes.patch('/:id', [isAuth], upload.single('img'), patchGame)




module.exports = GameRoutes