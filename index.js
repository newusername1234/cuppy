const http = require('http');
const express = require('express');
const app = express();
const server = http.createServer(app);
const PORT = 3000;

const es6Renderer = require('express-es6-template-engine');
app.engine('html', es6Renderer);
app.set('views', 'templates');
app.set('view engine', 'html');

const session = require('express-session');

const FileStore = require('session-file-store')(session);
app.use(session({
    store: new FileStore({}),

    secret: 'asdfasdsffase422345asdf3'
}));

const bodyParser = require('body-parser');
const parseForm = bodyParser.urlencoded({
    extended: true
});

const helmet = require('helmet');

// ////////////////////////////////////////////////////////////////////


app.get('/', (req, res) => {
    res.render('home');
});

app.get('/new/greencoffee', (req, res) => {
    res.render('greencoffee');
});

app.post('/new/greencoffee', parseForm, (req, res) => {
    
});

app.get('/new/roaster', (req, res) => {
    res.render('roaster');
});

app.post('/new/roaster', parseForm, (req, res) => {

});

server.listen(PORT, () => {
    console.log(`server listening at ${PORT}`)
})