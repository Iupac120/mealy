const express = require('express')
require('dotenv').config()
require('express-async-errors')
const app = express()
const cors = require('cors')
const connectDB = require('./db/connection')
const notFound = require('./middleware/not-found')
const errorHandler = require('./middleware/error-handler')

// middlewares
app.use(express.json())
app.use(cors())

//routes
app.use('/',require('./routes/register'))



app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 3000

const start = async() => {
    try{
        await connectDB(process.env.MONGO_URI)
        app.listen(PORT, () => {console.log(`serve is listening at port ${PORT}`)})
        console.log('mongo has started')
    }catch(err){
        console.log(err)
    }
}

start()


