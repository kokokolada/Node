const express = require('express'); //used to create handle routing and process requests from the client
const bodyParser = require('body-parser'); //used to parse incoming request from the client
const mysql = require('mysql'); //Node JS driver for MySQL
const path = require('path');//string or array of absolute paths to search for files
const app = express();//we run express function to create our app variable

const {getHomePage} = require('./routes/index');  //define homepage
const {addCatPage, addCat, deleteCat, editCat, editCatPage} = require('./routes/cat'); //define other pages
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
app.use(bodyParser.urlencoded({ extended: false })); //basically tells the system if either complex parsing (true) -can deal withnested objects- or simple algorithm (false)will be used
app.use(bodyParser.json()); // parse form data client, tells the system that you want json to be used
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