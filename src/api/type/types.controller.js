const Type = require('./types.model')
const { setError } = require('../../utils/error/error')
const { deleteFile } = require('../../middlewares/deleteFile')


const postNewType = async (req, res, next) => {
    try {
        const newType = new Type()
        newType.name = req.body.name
        if (req.file) {
            newType.img = req.file.path
        }
        const typeDB = await newType.save()
        return res.status(201).json(typeDB)
    } catch (error) {
        return next(setError(500, 'Type not saved'))
    }
}

const getAllTypes = async (req, res, next) => {
    try {
        const typesDB = await Type.find()
        res.status(200).json(typesDB)
    } catch (error) {
        return next(setError(500, 'Type failed server'))
    }
}

const getType = async (req, res, next) => {
    try {
        const { id } = req.params
        const typeDB = await Type.findById(id)
        if (!typeDB) {
            return next(setError(404, 'Type not found'))
        }
        return res.status(200).json(typeDB)
    } catch (error) {
        return next(setError(500, 'Type server error'))
    }
}


const deleteType = async (req, res, next) => {
    try {
        const { id } = req.params
        const typeDB = await Type.findByIdAndDelete(id)
        if (!typeDB) {
            return next(setError(404, 'Type not found'))
        }
        if (typeDB.img) deleteFile(typeDB.img)
        return res.status(200).json(typeDB)
    } catch (error) {
        return next(setError(500, 'Type removed server error'))
    }
}

module.exports = {
    postNewType,
    getAllTypes,
    getType,
    deleteType
}