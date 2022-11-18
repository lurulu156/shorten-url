const express = require('express')
const app = express()
const PORT = 3000
const exphbs = require('express-handlebars')

app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/', (req, res) => {
  res.render('url')
})

app.listen(PORT, () => {
  console.log(`Express is listening on http://localhost:${PORT}`)
})