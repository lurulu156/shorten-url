const express = require('express')
const app = express()
const PORT = 3000
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

app.use(bodyParser.urlencoded({ extended: true }))

//set up handlebars
app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// 使用 dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
// MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })//避開警告訊息
// MongoDB-connection status
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
})

//main page
app.get('/', (req, res) => {
  res.render('index')
})

//create short url
app.post('/', (req, res) => {
  const originalURL = req.body.original_URL
  res.render('url', { originalURL })
})

app.listen(PORT, () => {
  console.log(`Express is listening on http://localhost:${PORT}`)
})