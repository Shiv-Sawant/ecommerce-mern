const express = require('express')
const cors = require('cors')
const errorMiddleware = require('./middleware/error')
const fileUpload = require('express-fileupload')
const dotenv = require('dotenv')
const dbConnection = require('./config/mongoDbConnection')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
var app = express()

dotenv.config({ path: "server/config/config.env" })
dbConnection()

// app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }))
app.use(fileUpload())

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true
  })
);
app.options("*", cors());

//route imports
const product = require('./router/ProductRoute')
const user = require('./router/UserRoute')
const order = require('./router/OrderRoute')
const payment = require('./router/PaymentRoute')


app.use('/api/v1', product)
app.use('/api/v1', user)
app.use('/api/v1', order)
app.use('/api/v1', payment)


//routes
app.listen(process.env.PORT, () => {
  console.log(`server is running in http://localhost:${process.env.PORT}`)
})

app.use(errorMiddleware)


module.exports = app


