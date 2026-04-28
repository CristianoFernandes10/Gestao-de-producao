import express from 'express'
const app = express()
app.use(express.json())
import { initializeDB } from '../database/init.js'
import { errorHandler } from './Middlewares/errorHandler.js'

import product from './Routes/productRoute.js'
import machine from './Routes/machineRoute.js'
import productionOrder from './Routes/productionOrderRoute.js'
import stock from './Routes/stockRoute.js'
import user from './Routes/userRoute.js'

import login from './Routes/loginRoute.js'




async function startServer() {
    await initializeDB()
    

    app.use('/products', product)
    app.use('/machine', machine)
    app.use('/production-order', productionOrder)
    app.use('/stock', stock)
    app.use('/user', user)
    app.use('/login', login)
    app.use(errorHandler)
    app.listen(3000, () =>{
        console.log('Servidor rodando')
    })
}

startServer()