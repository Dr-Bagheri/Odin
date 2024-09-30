const express = require('express')
const mongoose = require('mongoose')
const Article = require('./models/article')
const articleRouter = require('./routes/articles')
const methodOverride = require('method-override')
const app = express()

mongoose.set('debug', true)  // Enable Mongoose debug mode

mongoose.connect('mongodb://localhost/blog')
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error)
  })

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

app.get('/', async (req, res) => {
  try {
    const articles = await Article.find().sort({ createdAt: 'desc' })
    res.render('articles/index', { articles: articles })
  } catch (error) {
    console.error('Error fetching articles:', error)
    res.status(500).send('Internal Server Error')
  }
})

app.use('/articles', articleRouter)

app.listen(5000, () => {
  console.log('Server is running on port 5000')
})