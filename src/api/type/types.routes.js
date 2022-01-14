const TypeRoutes = require('express').Router()
const { isAuth } = require('../../middlewares/auth')
const upload = require('../../middlewares/file')
const { postNewType, getAllTypes, getType, deleteType } = require('./Types.controller')


TypeRoutes.get('/', getAllTypes)
TypeRoutes.get('/:id', getType)
//TypeRoutes.post('/', [isAuth], upload.single('img'), postNewType)
//TypeRoutes.delete('/:id', [isAuth], upload.single('img'), deleteType)

module.exports = TypeRoutes