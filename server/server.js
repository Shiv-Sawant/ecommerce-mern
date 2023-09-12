const cors = require('cors')
const app = require('./app')
const dbConnection = require('./config/mongoDbConnection')
const cloudinary = require('cloudinary')

// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting Down the server due to uncaught exception`)

    server.close(() => {
        process.exit(1)
    })
})
app.use(cors())

dotenv.config({ path: "server/config/config.env" })
dbConnection()

//cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

//routes
const server = app.listen(process.env.PORT, () => {
    console.log(`server is running in http://localhost:${process.env.PORT}`)
})

// Unhandled Promise Rejection

process.on('unhandledRejection', (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting Down The Server Due To Unhandled Promise Rejection`)

    server.close(() => {
        process.exit(1)
    })
})

