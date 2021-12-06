const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

const { User, Thought } = require('./models');

app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(express.static('public'));

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/Userdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.set('debug', true);

//route to get all users
app.get('/users', (req, res) => {

    User.find({})
        .then(dbUserData => {
            res.json(dbUserData)
        })
        .catch(err => { res.json(err) })
});

// route to get user by id 
app.get('/user/:id', ({ params }, res) => {
    User.findOne({ _id: params.id })
        .then((dbUserData) => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        })
})

// route to add a user
app.post('/users', ({ body }, res) => {

    User.create(body)
        .then(dbUserData => {
            res.json(dbUserData)
        })
        .catch(err => { res.status(400).json(err) })
})

// route to update a user
app.put('/users/:id', ({ params, body }, res) => {
    User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
        .then((dbUserData) => {
            if (!dbUserData) {
                return res.status(404).json({ message: "No user found with this id!" });
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
});

// route to delete a user
app.delete('/users/id', ({ params }, res) => {
    User.findOneAndDelete({ _id: params.id }
    )
    .then((dbUserData) => {
        if(!dbUserData) {
            res.status(404).json({message: 'No user found with this id!'});
        }
        res.json(dbUserData);
    })
    .catch(err => {console.log(err);})
})

//route to add a new friend

// route to delete a friend 

// route to get all thoughts

//route to get a single thought by id 

// route to post a new thought

// route to update a thought

// route to delete a thought

// route to create a reaction to a thought

// route to delete a reaction to a thought

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});
