const router = require('express').Router();
const {
	getUsers,
	createUser,
	getSingleUser,
	updateUser,
	deleteUser,
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
// TODO:
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

// /api/users/:userId/friends/:friendId
// TODO:
router.route('/:userId/friends/:friendId').post().delete();

module.exports = router;
