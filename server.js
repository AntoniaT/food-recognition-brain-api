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
      host : 'postgresql-rugged-14765',
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

// app.get('/', (req, res)=>{res.send('it is working!');})

// SIGNING IN
app.post('/signin', (req, res) =>{ signin.handleSignin(req, res, db, bcrypt)})

// ADDING A USER
app.post('/register', (req, res) =>{register.handleRegister(req, res, db, bcrypt)} )

// LOGGIN IN
app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, db)})

// MAKING AN UPDATE to an existing user
app.put('/image', (req, res) => {image.handleImagePut(req, res, db)})
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res)})

app.listen(process.env.PORT || 3000, ()=>{
    console.log(`app is running on port ${process.env.PORT}`);
})

