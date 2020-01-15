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
    // these two lines kill those annoying logs in the console
    resave: false,
    saveUninitialized: false,
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

// cup input route, modify later as needed
app.get('/newcup', (req, res)=> {
    res.render('newCup', {
        locals: {},
        partials: {}
    })
});

app.post('/newcup', parseForm, (req, res)=> {
    console.log(`*** POST from ${req.url}`)
    console.log(req.body);
    res.redirect('newcup');
});


server.listen(PORT, () => {
    console.log(`server listening at ${PORT}`)
})