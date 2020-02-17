const http = require('http');
const express = require('express');
const app = express();
const server = http.createServer(app);
const PORT = 3001;
// routes
const apiRouter = require('./routes/api');
const userRouter = require('./routes/user');
const newRouter = require('./routes/new');
const updateRouter = require('./routes/update');
const { makeError, error404, handleRouteErrors } = require('./routes/errors');

const path = require('path');

const es6Renderer = require('express-es6-template-engine');
app.engine('html', es6Renderer);
app.set('views', 'templates');
app.set('view engine', 'html');

const session = require('express-session');
const { check } = require('express-validator');

const FileStore = require('session-file-store')(session);
app.use(session({
    store: new FileStore({}),
    // these two lines kill those annoying logs in the console
    resave: false,
    saveUninitialized: false,
    secret: 'asdfasdsffase422345asdf3'
}));

const sani = [
    check('id').escape(),
    check('name').escape(),
    check('cost').escape(),
    check('brewmethod').escape(),
    check('coffeesize').escape(),
    check('condiments').escape(),
    check('didlike').escape(),
    check('flavor').escape(),
    check('aroma').escape(),
    check('acidity').escape(),
    check('sweetness').escape(),
    check('mouthfeel').escape(),
    check('comments').escape(),
    check('score').escape(), 
    check('shopid').escape(), 
    check('beancoffeeid').escape(),
    check('location').escape(),
    check('phonenumber').escape(),
    check('website').escape(),
    check('countryoforigin').escape(),
    check('regionoforigin').escape(),
    check('farm').escape(),
    check('farmer').escape(),
    check('elevation').escape(),
    check('varietal').escape(),
    check('processingstyle').escape(),
    check('roastprofile').escape(),
    check('roasterid').escape(),
    check('greencoffeeid').escape(),
    check('location').escape(),
    check('hours').escape(),
    check('userid').escape(),
    check('username').escape(),
    check('firstname').escape(),
    check('lastname').escape(),
    check('email').escape(),
    check('password').escape()
]

app.post('*'), sani, async (req, res, next)=>{
    next();
}
app.use(express.static(path.join(__dirname, "public")));
function isLoggedIn(req, res, next) {
    if(!req.session.user){
        // res.redirect('/')
    }
    req.session.loggedIn = !!(req.session && req.session.user);
    next()
}
app.use(isLoggedIn)

// app.use((req, res, next) =>  {
//     // console.log('***********************');
//     console.log(req.session);
//     // console.log('***********************');

//     next();
// });

const helmet = require('helmet');

// ////////////////////////////////////////////////////////////////////
// routes

app.get('/', (req, res) => {
    let { loggedIn } = req.session;
    res.render('home', {
        locals: {
            loggedIn
        },
        partials: {
            nav: '/partials/nav'
        }
    });
});

app.get('/404', (req, res) => {
    let { loggedIn } = req.session;
    res.render('404', {
        locals: {
            loggedIn
        },
        partials: {
            nav: '/partials/nav'
        }
    });
});

app.use('/api', apiRouter);
app.use('/user', userRouter);

app.use('/*', (req, res, next) =>{
    if (!req.session.loggedIn){
        res.redirect('/404');
    } else {
        
        next();
    }
});

app.use('/new', newRouter);
app.use('/update', updateRouter);


app.use(error404);

app.use(handleRouteErrors);

server.listen(PORT, () => {
    console.log(`server listening at ${PORT}`);
})