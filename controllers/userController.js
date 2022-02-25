const { User, Thought } = require('../models');

module.exports = {
	getUsers(req, res) {
		User.find()
			.then((users) => {
				console.log(users);
				res.json(users);
			})
			.catch((err) => res.status(500).json({ message: err.message }));
	},
	getSingleUser(req, res) {
		User.findOne({ _id: req.params.userId })
			.select('-__v')
			.populate('thoughts')
			.populate('friends')
			.then(async (user) =>
				!user
					? res
							.status(404)
							.json({ message: 'No user found with that id' })
					: res.json(user)
			)
			.catch((err) => res.status(500).json({ message: err.message }));
	},
	createUser(req, res) {
		User.create(req.body)
			.then((user) => res.status(201).json(user))
			.catch((err) => res.status(500).json({ message: err.message }));
	},
	updateUser(req, res) {
		User.findOneAndUpdate(
			{ _id: req.params.userId },
			{ $set: req.body },
			{ runValidators: true, new: true }
		)
			.select('-__v')
			.then(async (user) =>
				!user
					? res
							.status(404)
							.json({ message: 'No user found with that id' })
					: res.json(user)
			)
			.catch((err) => res.status(500).json({ message: err.message }));
	},
	deleteUser(req, res) {
		User.findOneAndRemove({ _id: req.params.userId })
			.then((user) =>
				!user
					? res
							.status(404)
							.json({ message: 'No user found with that id' })
					: Thought.deleteMany({ username: user.username })
			)
			.then((thought) =>
				!thought
					? res.status(404).json({
							message:
								'user deleted, but no thoughts by that user were found',
					  })
					: res.status(200).json('User deleted')
			)
			.catch((err) => {
				console.log(err);
				res.status(500).json(err);
				return;
			});
	},
	addFriend(req, res) {
		User.findOneAndUpdate(
			{ _id: req.params.userId },
			{ $addToSet: { friends: req.params.friendId } },
			{ new: true }
		)
			.then((user) =>
				!user
					? res
							.status(404)
							.json({ message: 'No user found with that id' })
					: res.status(201).json(user)
			)
			.catch((err) => res.status(500).json({ message: err.message }));
	},
	deleteFriend(req, res) {
		User.findOneAndUpdate(
			{ _id: req.params.userId },
			{ $pull: { friends: req.params.friendId } },
			{ new: true }
		)
			.then((user) =>
				!user
					? res
							.status(404)
							.json({ message: 'No user found with that id' })
					: res.status(201).json(user)
			)
			.catch((err) => res.status(500).json({ message: err.message }));
	},
};
