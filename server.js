const express = require('express')
const cors = require('cors')

const app = express()

var corsOptions = {
    origin: 'http://localhost:8000'
}

app.use(cors(corsOptions))

app.use(express.json())

app.use(express.urlencoded( {extended: true} ))

const db = require("./app/model")
db.mongoose.connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected database")
}).catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit()
})

app.get("/", ((req, res) => {
    res.json({message: "Welcome to api"})
}))

require('./app/routes/article.routes')(app)
require('./app/routes/comment.routes')(app)

const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})