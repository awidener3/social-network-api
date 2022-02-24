const router = require("express").Router();

// /api/thoughts
// TODO:
router.route("/").get().post();

// /api/thoughts/:thoughtId
// TODO:
router.route("/:thoughtId").get().put().delete();

// /api/thoughts/:thoughtId/reactions
// TODO:
router.route("/:thoughtId/reactions").post().delete();

module.exports = router;
