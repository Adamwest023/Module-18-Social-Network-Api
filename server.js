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
});

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
            if (!dbUserData) {
                return res.status(404).json({ message: 'No user found with this id!' });
            }
            res.json(dbUserData);
        })
        .catch(err => { console.log(err); })
});

//route to add a new friend
app.post('/users/:id/friends', (req, res) => {
    User.findOneAndUpdate(
        { _id: req.params.id },
        { $addToSet: { friends: req.body } },
        { new: true, runValidators: true }
    )
        .then((dbUserData) => {
            if (!dbUserData) {
                return res.status(404).json({ message: 'No user found by this id!' })
            }
            res.json(dbUserData)
        })
        .catch(err => { console.log(err) });
});

// route to delete a friend 
app.delete('/users/:id/friends/:friendId', (req, res) => {
    User.findOneAndDelete(
        { _id: req.params.id },
        { $pull: { friends: { friendId: req.params.friendId } } },
    )
        .then((dbUserData) => {
            if (!dbUserData) {
                return res.status(404).json({ message: 'No user found by this id!' });
            }
            res.json(dbUserData)
        })
        .catch(err => { console.log(err); })
});

// route to get all thoughts
app.get('/thoughts', (req, res) => {
    Thought.find({})
        .then(dbUserData => {
            res.json(dbUserData)
        })
        .catch(err => { res.json(err) })
});

//route to get a single thought by id 
app.get('/thoughts/:id', ({ params }, res) => {
    Thought.findOne({ _id: params.id })
        .then((dbUserData) => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        })
})

// route to post a new thought
app.post('/thoughts', ({ body }, res) => {

    Thought.create(body)
        .then(dbUserData => {
            res.json(dbUserData)
        })
        .catch(err => { res.status(400).json(err) })
});


// route to update a thought
app.put('/thoughts/:id', ({ params, body }, res) => {
    Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
        .then((dbUserData) => {
            if (!dbUserData) {
                return res.status(404).json({ message: "No user found with this id!" });
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
});

// route to delete a thought
app.delete('/thoughts/id', ({ params }, res) => {
    Thought.findOneAndDelete({ _id: params.id }
    )
        .then((dbUserData) => {
            if (!dbUserData) {
                return res.status(404).json({ message: 'No user found with this id!' });
            }
            res.json(dbUserData);
        })
        .catch(err => { console.log(err); })
});

// route to create a reaction to a thought
app.post('/thoughts/:id/reactions', (req, res) => {
    Thought.findOneAndUpdate(
        { _id: req.params.id },
        { $addToSet: { reactions: req.body } },
        { new: true, runValidators: true }
    )
        .then((dbUserData) => {
            if (!dbUserData) {
                return res.status(404).json({ message: 'No user found by this id!' })
            }
            res.json(dbUserData)
        })
        .catch(err => { console.log(err) });
});

// route to delete a reaction to a thought
app.delete('/thought/:id/reactions/:friendId', (req, res) => {
    Thought.findOneAndDelete(
        { _id: req.params.id },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
    )
        .then((dbUserData) => {
            if (!dbUserData) {
                return res.status(404).json({ message: 'No user found by this id!' });
            }
            res.json(dbUserData)
        })
        .catch(err => { console.log(err); })
});

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});
