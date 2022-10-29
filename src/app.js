const express = require('express');
const mongoose = require('mongoose');
const Blog = require('./models/blog_model');

const app = express();

const dbURI = 'mongodb+srv://rans0000:Admin%40123@node-tuts.vy1f4p0.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(dbURI)
    .then(result => {
        console.log('connected to db...');
        app.listen(3000);
    })
    .catch(error => console.log('error connecting db!'));

app.set('view engine', 'ejs');
app.set('views', 'src/views');

app.use(express.urlencoded({ extended: true }));
app.use(express.static('./src/public'));

// ---------------------------------------
// app.get('/blog/create', (req,res)=>{
//     const item = new Blog({
//         title: 'We are one world',
//         snippet: 'Yay partners!!',
//         body: 'This resolved the issue for me. Thank you for helping community. If you are using any special character in your password you need to encode the particular character.'
//     });
//     item.save()
//     .then(result => res.send(result))
//     .catch(error => console.log(error));
// });

// ---------------------------------------
app.get('/', (req, res) => {
    // res.render('index', { title: 'Home' });
    res.redirect('/blogs');
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

app.get('/blogs', (req, res) => {
    Blog.find().sort({ createdAt: -1 })
        .then(result => {
            res.render('index', { title: 'All Blogs', blogs: result });
        })
        .catch(error => console.log(error));
});

app.post('/blogs', (req, res) => {
    const blog = new Blog(req.body);
    blog.save()
        .then(result => res.redirect('/blogs'))
        .catch(error => console.log(error));
});

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create Blog' });
});

app.get('/blogs/:id', (req, res) => {
    const id = new mongoose.Types.ObjectId(req.params.id);
    console.log('--id: ', id);
    Blog.findById(id)
        .then(result => {
            res.render('blog', { title: 'Blog item', blog: result });
        }).catch(error => console.log('error ', error));
});

app.delete('/blogs/:id', (req, res) => {
    const id = new mongoose.Types.ObjectId(req.params.id);
    Blog.findByIdAndDelete(id)
        .then(result => {
            res.json({ redirect: '/blogs' });
        })
        .catch(error => console.log(error));
});

app.use((req, res) => {
    res.render('404', { title: '404' });
});