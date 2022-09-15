const express = require('express');

const app = express();
app.set('view engine', 'ejs');
app.set('views', 'src/views');
app.listen(3000);

app.use(express.static('./src/public'));
app.get('/', (req, res) => {
    res.render('index', { title: 'Home' });
    // res.sendFile('/views/index.html', { root: __dirname });
});
app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
    // res.sendFile('/views/about.html', { root: __dirname });
});
app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create Blog' });
});
app.use((req, res) => {
    res.render('404', { title: '404' });
    // res.status(404).sendFile('/views/404.html', { root: __dirname });
});