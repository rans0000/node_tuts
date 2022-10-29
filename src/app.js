const express = require('express');
const mongoose = require('mongoose');
const blogRouter = require('./routes/blogRouter');

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
app.get('/', (req, res) => {
    res.redirect('/blogs');
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

app.use(blogRouter);

app.use((req, res) => {
    res.render('404', { title: '404' });
});