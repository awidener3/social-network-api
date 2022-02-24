const { User, Thought } = require("../models");

// Aggregates

module.exports = {
    // GET all users
    getUsers(req, res) {
        User.find()
            .then(async (users) => {
                return res.json(users);
            })
            .catch((err) => {
                return res.status(500).json(err);
            });
    },
    // GET user by id + thought and friend data
    getSingleUser(req, res) {},
    // POST new user
    createUser(req, res) {},
    // PUT to update user by id
    updateUser(req, res) {},
    // DELETE user by id
    // remove users thoughts when deleted

    deleteUser(req, res) {},
};
