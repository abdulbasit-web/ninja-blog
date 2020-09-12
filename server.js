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
app.use(express.urlencoded({extended: true}))
app.use(morgan('dev'))

//listen for requests
app.listen(3000)

//@Routes
app.get('/', (req, resp) => resp.redirect('/blogs'))
app.get('/about', (req, resp) => resp.render('about', {title: 'About'}))
app.get('/blogs/create', (req, resp) => resp.render('create', {title: 'Create new blog'}))
app.get('/blogs', (req, resp) => {
  Blog.find()
    .sort({createdAt: -1})
    .then(data => resp.render('index', {title: 'blogs', blogs: data}))
    .catch(err => console.log(err))
})

//create post
app.post('/blogs', (req, resp) => {
  const blog = new Blog(req.body)
  blog
    .save()
    .then(data => resp.redirect('/'))
    .catch(err => console.log(err))
})

//delete post
app.delete('/blogs/:id', (req, resp) => {
  const id = req.params.id
  Blog.findByIdAndDelete(id)
    .then(() => resp.json({redirect: '/blogs'}))
    .catch(err => console.log(err))
})

//single post
app.get('/blogs/:id', (req, resp) => {
  const id = req.params.id
  Blog.findById(id)
    .then(data => resp.render('details', {blog: data, title: 'blog details'}))
    .catch(err => console.log(err))
})

//404 (must be last route)
app.use((req, resp) => resp.status(404).render('404', {title: '404'}))
