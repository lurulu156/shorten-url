const mongoose = require('mongoose')
// 使用 dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
// MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
// MongoDB-connection status
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
})

module.exports = db