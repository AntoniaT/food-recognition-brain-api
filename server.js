const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt-nodejs');
const knex = require('knex')
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

// database here
const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : '',
      password : '',
      database : 'smart-brain'
    }
  });
db.select('*').from('users').then(data =>{
})

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res)=>{res.send(database.users);})

// SIGNING IN
app.post('/signin', (req, res) =>{ signin.handleSignin(req, res, db, bcrypt)})

// ADDING A USER
app.post('/register', (req, res) =>{register.handleRegister(req, res, db, bcrypt)} )

// LOGGIN IN
app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, db)})

// MAKING AN UPDATE to an existing user
app.put('/image', (req, res) => {image.handleImagePut(req, res, db)})
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res)})

app.listen(3000, ()=>{
    console.log('app is running on port 3000');
})

