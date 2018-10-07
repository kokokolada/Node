const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const app = express();

const {getHomePage} = require('./routes/index');
const {addCatPage, addCat, deleteCat, editCat, editCatPage} = require('./routes/cat');
const port = 3000;

// create connection to database
// the mysql.createConnection function takes in a configuration object which contains host, user, password and the database name.
const db = mysql.createConnection ({
    host: 'tigu.hk.tlu.ee',
    user: 'anneliserandmaa',
    password: '5cPQkKbO',
    database: 'anneliserandmaa'
});

// connect to database
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});
global.db = db;

// configure middleware
app.set('port', process.env.port || port); // set express to use this port
app.set('views', __dirname + '/views'); // set express to look in this folder to render our view
app.set('view engine', 'ejs'); // configure template engine
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client
app.use(express.static(path.join(__dirname, 'public'))); // configure express to use public folder

// routes for the app

app.get('/', getHomePage);
app.get('/add', addCatPage);  
app.get('/edit/:id', editCatPage);
app.get('/delete/:id', deleteCat);
app.post('/add', addCat);
app.post('/edit/:id', editCat);

// set the app to listen on the port
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});