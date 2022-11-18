const express = require('express')
const app = express()
const PORT = 3000
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true }))

//set up handlebars
app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

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