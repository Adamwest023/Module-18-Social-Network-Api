const { User } = require('../models');

const userController = {
    getAllUsers(req, res) {
        User.find({})
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .select('-__v')
            .sort({ _id: -1 })
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },
    // get one user by id
    getUsersById({ params }, res) {
        User.findOne({ _id: params.id })
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .select('-__v')
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    // createUsers
    createUsers({ body }, res) {
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.json(err));
    },
    // update users by id
    updateUsers({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },

    //add friends
    addFriends({params}, res) {
        User.findOneAndUpdate(
            {_id: params.userId},
            {$push: {friendsId: params.friendsId}},
            {new:true, runValidators:true}
        )
        .then(dbUserData => {
            if(!dbUserData){
              res.status(404).json({ message: 'No User found with this id!'})
              return;
            }
            res.json(dbUserData);
          })
          .catch(err => res.json(err));
    },

    deleteUsers({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.json(err));
    },
    removeFriends({ params} , res) {
        User.findOneAndUpdate(
          {_id: params.userId},
          {$pull: {friends: {friendsId: params.friendsId}}},
          {new:true}
        )
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
      }
};

module.exports = userController;