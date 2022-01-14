const express = require('express');
const cors = require('cors');
const cloudinary = require('cloudinary').v2
const UserRoutes = require('./src/api/user/user.routes');
const GameRoutes = require('./src/api/games/games.routes');
const PlatformRoutes = require('./src/api/platform/platform.routes');
const TypeRoutes = require('./src/api/type/types.routes');
const Documentation = require('./src/utils/Documentation/index.json')
//AQUI REQUERIMOS LAS RUTAS

const { setError } = require('./src/utils/error/error');

const { connectDb } = require('./src/utils/database/db');

const PORT = process.env.PORT || 8080

const app = express();

connectDb();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
})

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, PATCH')
    res.header('Access-Control-Allow-Credentials', true)
    res.header('Access-Control-Allow-Headers', 'Content-Type')
    next()
})

app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:4200'],
    credentials: true
}))

app.use(express.json({
    limit: '5mb'
}))

app.use(express.urlencoded({ limit: '5mb', extended: true }))

//AQUI VAN LAS RUTAS
app.use('/api/users', UserRoutes)
app.use('/api/games', GameRoutes)
app.use('/api/platforms', PlatformRoutes)
app.use('/api/types', TypeRoutes)
//JUSTO AQUI!!!
app.use('/', (req, res, next) => {
    return res.json(Documentation)
})

app.use('*', (req, res, next) => {
    return next(setError(404, 'Route not found'))
})

app.use((error, req, res, next) => {
    return res.status(error.status || 500).json(error.message || 'Unexpected error')
})

app.disable('x-powered-by') //ESTO ES PARA QUE NO VEAN CON QUE HAS CREADO LA API (node,...)

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})