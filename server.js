const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const Blog = require('./model/blog')

//express app
const app = express()

//register view engine
app.set('view engine', 'ejs')

//connect to mongoDb
const DB_URL =
  'mongodb+srv://abdulbasit:42591800@cluster0.bghf6.mongodb.net/ninja-blog?retryWrites=true&w=majority'
mongoose.connect(DB_URL, {useNewUrlParser: true, useUnifiedTopology: true}, () => {
  console.log('connected')
})

//middleware and static files
app.use(express.static('public'))
app.use(morgan('dev'))

//listen for requests
app.listen(3000)

//mongoose and mongo sandbox routes
app.get('/add-blog', (req, resp) => {
  const blog = new Blog({
    title: 'React js',
    snippet: 'learn react js',
    body:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dignissimos quaerat voluptatem ipsum quas! A aliquam iusto hic? Et, quisquam maxime? Dolorem, explicabo?',
  })

  blog
    .save()
    .then(data => resp.send(data))
    .catch(err => console.log(err))
})

app.get('/', (req, resp) => {
  resp.redirect('/blogs')
})

//blog route
app.get('/blogs', (req, resp) => {
  Blog.find().then(data => resp.render('index', {title: 'blogs', blogs: data}))
})

app.get('/about', (req, resp) => resp.render('about', {title: 'About'}))
//create
app.get('/blogs/create', (req, resp) => resp.render('create', {title: ' Create new post'}))
//404 (must be last route)
app.use((req, resp) => resp.status(404).render('404', {title: '404'}))
