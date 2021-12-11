const router = require('express').Router();
const { viewThoughts,
    viewThoughtsById,
    addThought,
    updateThought,
    removeThought,
    addReaction,
    removeReaction } = require('../../controllers/thought-controller');

// /api/thoughts
router
    .route('/')
    .get(viewThoughts)

// /api/thought/thoughtId
router
    .route('/:thoughtId')
    .get(viewThoughtsById)
    .post(addThought)
    .put(updateThought);

// /api/thought/<userId>/thoughtId
router
    .route('/:userId/:thoughtId')
    .delete(removeThought);

// /api/thought/<userId>/<thoughtId>/<reactionId>
router
    .route('/:thoughtId/reactions')
    .post(addReaction);

router
    .route('/:thoughtId/reactions/:reactionId')
    .delete(removeReaction);


module.exports = router;
