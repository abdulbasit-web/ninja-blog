//blog_index , blog_create_get , blog_create_post , blog_delete ,  blog_details
const Blog = require('../model/blog')

const blog_index = (req, resp) => {
  Blog.find()
    .sort({createdAt: -1})
    .then(data => resp.render('blogs/index', {title: 'blogs', blogs: data}))
    .catch(err => console.log(err))
}

const blog_create_get = (req, resp) => {
  resp.render('blogs/create', {title: 'Create new blog'})
}
const blog_create_post = (req, resp) => {
  const blog = new Blog(req.body)
  blog
    .save()
    .then(data => resp.redirect('/'))
    .catch(err => console.log(err))
}

const blog_delete = (req, resp) => {
  const id = req.params.id
  Blog.findByIdAndDelete(id)
    .then(() => resp.json({redirect: '/blogs'}))
    .catch(err => console.log(err))
}

const blog_details = (req, resp) => {
  const id = req.params.id
  Blog.findById(id)
    .then(data => resp.render('blogs/details', {blog: data, title: 'blog details'}))
    .catch(err => resp.status(404).render('404', {title: 'blog not found'}))
}

module.exports = {blog_index, blog_create_get, blog_create_post, blog_details, blog_delete}
