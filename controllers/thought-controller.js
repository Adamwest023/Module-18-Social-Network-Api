const { Thought, User } = require('../models');

const thoughtController = {
 // add thought to user
 viewThoughts (req, res) {
    Thought.find().then(allThoughts => res.json(allThoughts))
 },
 viewThoughtsById ({params}, res) {
     Thought.findOne({_id: params.thoughtId})
     .then(dbUserData => {
         if(!dbUserData) {
             res.status(404).json({message:"no thoughts at this id"})
             return;
         }
         res.json(dbUserData)
     })
     .catch(err => res.json(err));
 },

 addThought({ params, body }, res) {
    console.log(body);
    Thought.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: params.userId },
          { $push: { thoughts: body } },
          { new: true }
        );
      })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No User found with this id!', err });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  },

  addReaction({params ,body}, res) {
   Thought.findOneAndUpdate(
     {_id: params.reactionId},
     //passes the replies body params
     {$push: {replies: body} },
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

  // remove Thought
  removeThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.thoughtId })
      .then(deletedThought => {
        if (!deletedThought) {
          return res.status(404).json({ message: 'No thought with this id!' });
        }
        return User.findOneAndUpdate(
          { _id: params.userId },
          { $pull: { thoughts: params.thoughtId } },
          { new: true }
        );
      })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No Users found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  },

  removeReaction({ params} , res) {
    Thought.findOneAndUpdate(
      {_id: params.thoughtId},
      {$pull: {reactions: {reactionId: params.reactionId}}},
      {new:true}
    )
    .then(dbUserData => res.json(dbUserData))
    .catch(err => res.json(err));
  }
};

module.exports = thoughtController;