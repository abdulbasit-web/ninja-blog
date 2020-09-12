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
  'mongodb+srv://abdulbasit:42591800@cluster0.bghf6.mongodb.net/blog-db?retryWrites=true&w=majority'
mongoose
  .connect(DB_URL, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(res => {
    console.log('connected')
  })
  .catch(err => console.log(err))

//listen for requests
app.listen(3000)

//middleware and static files
app.use(express.static('public'))
// app.use(morgan('dev'))

//mongoose and mongo sandbox route
app.get('/add-blog', (req, resp) => {
  const blog = new Blog({
    title: 'meren stack',
    snippet: 'learn meren stack',
    body:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt facere at adipisci quam molestiae laborum magnam voluptatibus laudantium iste fugiat dicta id, non inventore eligendi qui! Facilis amet deleniti inventore vel repudiandae nulla porro aliquam, eum sunt aperiam, sed corrupti.',
  })
  blog
    .save()
    .then(result => resp.send(result))
    .catch(err => console.log(err))
})

app.get('/', (req, resp) => {
  const blogs = [
    {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
  ]
  resp.render('index', {title: 'Home', blogs})
})
app.get('/about', (req, resp) => resp.render('about', {title: 'About'}))
//create
app.get('/blogs/create', (req, resp) => resp.render('create', {title: ' Create new post'}))
//404 (must be last route)
app.use((req, resp) => resp.status(404).render('404', {title: '404'}))
