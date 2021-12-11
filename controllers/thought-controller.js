const { Thought, User } = require('../models');

const thoughtController = {
    // add thought to user
    viewThoughts(req, res) {
        Thought.find().then(allThoughts => res.json(allThoughts))
    },
    viewThoughtsById({ params }, res) {
        Thought.findOne({ _id: params.thoughtId })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: "no thoughts at this id" })
                    return;
                }
                res.json(dbUserData)
            })
            .catch(err => res.json(err));
    },

    addThought({ params, body }, res) {
        console.log(body);
        const { _id, ...thought } = body
        Thought.create(thought)
            .then(async (thought) => {
                const user = await User.findOneAndUpdate(
                    { _id: params.thoughtId },
                    { $push: { thoughts: thought._id } },
                    { new: true }
                );
                console.log({ user });
                return user;
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No User found with this id!', err });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => { console.log(err); res.json(err) });
    },

    addReaction({ params, body }, res) {
        //   console.log(body);
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            //passes the replies body params
            { $push: { reactions: body } },
            { new: true, runValidators: true }
        )
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No thought found with this id!' })
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },
    //updateThoguht
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            body,
            { new: true, runValidators: true })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No thought found with this id!' })
                    return;
                }
                res.json(dbUserData)
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

    removeReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { new: true }
        )
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.json(err));
    }
};

module.exports = thoughtController;