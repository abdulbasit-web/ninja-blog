const express = require('express')
const morgan = require('morgan')

//express app
const app = express()

//register view engine
app.set('view engine', 'ejs')

//listen for requests
app.listen(3000)

//middleware and static files
app.use(express.static('public'))
// app.use(morgan('dev'))

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
