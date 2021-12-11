const router = require('express').Router();
const { viewThoughts, viewThoughtsById, addThought, removeThought, addReaction, removeReaction } = require('../../controllers/thought-controller');

// /api/thoughts
router
    .route('/')
    .get(viewThoughts)
    
    // /api/thought/thoughtId
    router
    .route('/:thoughtId')
    .get(viewThoughtsById)
    .post(addThought);

// /api/thought/<userId>/thoughtId
router
    .route('/:userId/:thoughtId')
    .put(addReaction)
    .delete(removeThought)

// /api/thought/<userId>/<thoughtId>/<reactionId>
router.route('/:userId/:thoughtId/:reactionId').delete(removeReaction);


module.exports = router;
