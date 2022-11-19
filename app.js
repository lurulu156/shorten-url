const express = require('express')
const app = express()
const PORT = 3000
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const routes = require('./routes')

require('./config/mongoose')

//set up handlebars
app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(routes)

app.listen(PORT, () => {
  console.log(`Express is listening on http://localhost:${PORT}`)
})