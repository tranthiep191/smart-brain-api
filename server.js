const express = require('express');

const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const app = express();
const knex = require('knex');

const register = require('./controllers/register')
const signin = require('./controllers/signin')
const profile = require('./controllers/profile')
const image = require('./controllers/image')

const db = knex ({
	client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : '',
    database : 'smart-brain'
  }
});


app.use(bodyParser.json());

app.use(cors());

app.get('/', (req, res) => {res.send(database.users)})

app.post('/signin', signin.handleSignin(db, bcrypt))

app.post('/register',register.handleRegister(db, bcrypt))

app.get('/profile/:id', profile.handleProfileGet(db))

app.put('/image', image.handleImage(db))

app.post('/imageUrl', (req, res) => {image.handleApiCall(req, res)})

// listen at port 3000 (localhost:3000)
app.listen(3000, () => {console.log('app is running on port 3000');})


//planning API design before coding

/*
/ --> res = this is working
/signin --> POST req = success/fail
/register --> POST req = return new user
/profile/:userID --> GET req = return user
/image --> PUT  --> return count update of user

*/