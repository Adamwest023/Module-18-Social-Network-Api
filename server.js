const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

const {User, Thought} = require('./models');

app.use(express.urlencoded({extended:true}))
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/Notedb', {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.set('useCreateIndex', true);
mongoose.set('debug', true);

//route to get all users
app.get('/users',(req.res))

// route to get user by id 

// route to add a user

// route to update a user

// route to delete a user

//route to add a new friend

// route to delete a friend 

//