const router = require('express').Router();
const {
	getThoughts,
	getSingleThought,
	createThought,
} = require('../../controllers/thoughtController');

// /api/thoughts
// TODO:
router.route('/').get(getThoughts).post(createThought);

// /api/thoughts/:thoughtId
// TODO:
router.route('/:thoughtId').get(getSingleThought).put().delete();

// /api/thoughts/:thoughtId/reactions
// TODO:
router.route('/:thoughtId/reactions').post().delete();

module.exports = router;
