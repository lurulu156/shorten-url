const express = require('express')
const app = express()
const PORT = 3000
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const URL = require('./models/url')
const generate_endURL = require('./generate_endURL')

require('./config/mongoose')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))

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
  // 確認資料庫有無重複
  URL.findOne({ originalURL })
    .then((item) => {
      if (!item) {
        //若無重複則新建一筆資料
        let newURL = `http://localhost:${PORT}/`
        let endURL = generate_endURL()
        newURL += endURL
        URL.create({ originalURL, newURL })
          .then(() => res.render('url', { newURL }))
          .catch(err => console.log(err))
      } else {
        //若有重複則直接使用原本資料
        newURL = item.newURL
        res.render('url', { newURL }) }
    })
})

//go specific site
app.get('/:endURL', (req, res) => {
  const endURL = req.params.endURL
  let newURL = `http://localhost:${PORT}/${endURL}`
  URL.findOne({ newURL })
    .lean()
    .then((item) => {
      //若找不到item則回首頁
      if(!item) {
        res.redirect('/')
      } else { res.redirect(`${item.originalURL}`) }
      })
})

app.listen(PORT, () => {
  console.log(`Express is listening on http://localhost:${PORT}`)
})