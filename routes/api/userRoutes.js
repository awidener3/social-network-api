const router = require('express').Router();

// /api/users
// TODO:
router.route('/').get().post();

// /api/users/:userId
// TODO:
router.route('/:userId').get().put().delete();

// /api/users/:userId/friends/:friendId
// TODO:
router.route('/:userId/friends/:friendId').post().delete();
