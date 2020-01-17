const http = require('http');
const express = require('express');
const app = express();
const server = http.createServer(app);
const PORT = 3000;
// routes
const apiRouter = require('./routes/api');
const userRouter = require('./routes/user');
const newRouter = require('./routes/new');

const path = require('path');

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

app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) =>  {
    console.log('***********************');
    console.log(req.session);
    console.log('***********************');

    next();
});

const helmet = require('helmet');

// ////////////////////////////////////////////////////////////////////
// routes
app.use('/api', apiRouter);
app.use('/new', newRouter);
app.use('/user', userRouter);



app.get('/', (req, res) => {
    res.render('home');
});

server.listen(PORT, () => {
    console.log(`server listening at ${PORT}`);
})