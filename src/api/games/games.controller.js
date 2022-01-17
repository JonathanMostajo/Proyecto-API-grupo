const Game = require('./games.model')
const { setError } = require('../../utils/error/error')
const { deleteFile } = require('../../middlewares/deleteFile')


const postNewGame = async (req, res, next) => {
    try {
        const newGame = new Game()
        newGame.name = req.body.name
        newGame.type = req.body.type
        newGame.year = req.body.year
        newGame.characters = req.body.characters
        newGame.platform = req.body.platform
        if (req.file) {
            newGame.img = req.file.path
        }
        const gameDB = await newGame.save()
        return res.status(201).json(gameDB)
    } catch (error) {
        return next(setError(500, 'Game not saved'))
    }
}

const getAllGames = async (req, res, next) => {
    try {
        const gamesDB = await Game.find().populate('platform').populate('type')
        res.status(200).json(gamesDB)
    } catch (error) {
        return next(setError(500, 'Game failed server'))
    }
}

const getAllGamesSorted = async (req, res, next) => {
    try {
        const gamesDB = await Game.find().populate('platform').populate('type').sort({year:"asc"})
       /*  const gamesDB = await Game.find().populate('platform').populate('type') */
        console.log(gamesDB)
       /*  const gamesSorted = await gamesDB.sort((a, b) => (a.year > b.year) ? 1 : ((b.year > a.year) ? -1 : 0)) */
        res.status(200).json(gamesDB)
    } catch (error) {
        return next(setError(500, 'Game failed server'))
    }
}

const getGamesFiltered = async (req, res, next) => {
    try {
        const { id } = req.params
        const gamesDB = await Game.find({ year: id }).populate('platform').populate('type')
        console.log(gamesDB)
        /* const gameFiltered = gamesDB.filter(game => game.year >= id) */
        res.status(200).json(gamesDB)
    } catch (error) {
        return next(setError(500, 'Game failed server'))
    }
}

const getGame = async (req, res, next) => {
    try {
        const { id } = req.params
        const gameDB = await Game.findById(id).populate('platform').populate('type')
        if (!gameDB) {
            return next(setError(404, 'Game not found'))
        }
        return res.status(200).json(gameDB)
    } catch (error) {
        return next(setError(500, 'Game server error'))
    }
}

const patchGame = async (req, res, next) => {
    try {
        const { id } = req.params
        const patchGame = new Game(req.body)
        patchGame._id = id
        if (req.file) {
            patchGame.img = req.file.path
        }
        const gameDB = await Game.findByIdAndUpdate(id, patchGame)
        if (!gameDB) {
            return next(setError(404, 'Game not found'))
        }
        if (gameDB.img) deleteFile(gameDB.img)
        return res.status(200).json({ new: patchGame, old: gameDB })
    } catch (error) {
        return next(setError(500, 'Game Patch server error'))
    }
}

module.exports = {
    postNewGame,
    getAllGames,
    getAllGamesSorted,
    getGamesFiltered,
    getGame,
    patchGame
}