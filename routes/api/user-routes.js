const router = require('express').Router();
const {
  getAllUsers,
  getUsersById,
  createUsers,
  updateUsers,
  addFriends,
  deleteUsers,
  removeFriends
} = require('../../controllers/user-controller');

// /api/users
router
  .route('/')
  .get(getAllUsers)
  .post(createUsers);

// /api/users/:id
router
  .route('/:id')
  .get(getUsersById)
  .put(updateUsers)
  .delete(deleteUsers);

  //api/users/userId/friends/friendsId
  router
    .route('/:id/friends/:friendsId')
    .post(addFriends)
    .delete(removeFriends)


module.exports = router;