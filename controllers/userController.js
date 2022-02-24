const { User, Thought } = require('../models');

// Aggregates go here
module.exports = {
	// GET all users
	getUsers(req, res) {
		User.find()
			.then(async (users) => {
				return res.status(200).json(users);
			})
			.catch((err) => {
				return res.status(500).json({ message: err.message });
			});
	},
	// GET user by id + thought and friend data
	getSingleUser(req, res) {
		User.findOne({ _id: req.params.userId })
			.select('-__v')
			.then(async (user) =>
				!user
					? res.status(404).json({ message: 'No user with that ID' })
					: res.json(user)
			)
			.catch((err) => {
				return res.status(500).json({ message: err.message });
			});
	},
	// POST new user
	createUser(req, res) {
		User.create(req.body)
			.then((user) => res.status(201).json(user))
			.catch((err) => res.status(500).json({ message: err.message }));
	},
	// PUT to update user by id
	updateUser(req, res) {
		User.findOneAndUpdate(
			{ _id: req.params.userId },
			{ $set: req.body },
			{ runValidators: true, new: true }
		)
			.select('-__v')
			.then(async (user) =>
				!user
					? res.status(404).json({ message: 'No user with that ID' })
					: res.json(user)
			)
			.catch((err) => {
				return res.status(500).json({ message: err.message });
			});
	},
	// DELETE user by id
	// remove users thoughts when deleted
	deleteUser(req, res) {
		User.findOneAndRemove({ _id: req.params.userId })
			.then((user) =>
				!user
					? res.status(404).json({ message: 'No user with that id' })
					: Thought.deleteMany({ username: user.username })
			)
			.then((thought) =>
				!thought
					? res.status(404).json({
							message: 'User deleted, but no thoughts were found',
					  })
					: res.json({ message: 'User successfully deleted' })
			)
			.catch((err) => res.status(500).json({ message: err.message }));
	},
};
