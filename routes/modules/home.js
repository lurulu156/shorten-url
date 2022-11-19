// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// 引用相關函式
const URL = require('../../models/url')
const generate_endURL = require('../../generate_endURL')
const PORT = 3000
// 定義首頁路由
//main page
router.get('/', (req, res) => {
  res.render('index')
})

//create short url
router.post('/', (req, res) => {
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
        res.render('url', { newURL })
      }
    })
})

//go specific site
router.get('/:endURL', (req, res) => {
  const endURL = req.params.endURL
  let newURL = `http://localhost:${PORT}/${endURL}`
  URL.findOne({ newURL })
    .lean()
    .then((item) => {
      //若找不到item則回首頁
      if (!item) {
        res.redirect('/')
      } else { res.redirect(`${item.originalURL}`) }
    })
})

// 匯出路由模組
module.exports = router