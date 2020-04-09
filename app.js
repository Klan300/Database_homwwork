var express = require('express');
var app = express();
const fetch = require("node-fetch");
const PORT = 8000;

// set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

// use res.render to load up an ejs view file

// index page 
app.get('/', async function(req, res) {
    await fetch("http://localhost:8080/").then((response) => {
        return  response.json();
    }).then((data) => {
        let word = data;
        console.log(word)
        res.render('pages/index', {
            words : word
        });
    } )
});

app.get('/:words', async function(req, res) {
    const { words } = req.params;
    await fetch(`http://localhost:8080/${words}`).then((response) => {
        return  response.json();
    }).then((data) => {
        let word = data;
        console.log('new')
        res.render('pages/game', {
            words : word
        });
    } )
});

app.listen(PORT);
console.log('8000 is the magic port');
console.log(`Running on http://localhost:${PORT}`)