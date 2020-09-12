const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const blogController = require('./controller/blogController')

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

//blog routes
app.get('/blogs', blogController.blog_index)
app.get('/blogs/create', blogController.blog_create_get)
//create post
app.post('/blogs', blogController.blog_create_post)
//delete post
app.delete('/blogs/:id', blogController.blog_delete)
//single post
app.get('/blogs/:id', blogController.blog_details)

//404 (must be last route)
app.use((req, resp) => resp.status(404).render('404', {title: '404'}))
