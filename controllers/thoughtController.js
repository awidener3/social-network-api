const { User, Thought } = require('../models');

module.exports = {
	// GET all thoughts
	getThoughts(req, res) {
		Thought.find()
			.then((thoughts) => res.status(200).json(thoughts))
			.catch((err) => res.status(500).json({ message: err.message }));
	},
	// GET single thought by id
	getSingleThought(req, res) {
		Thought.findOne({ _id: req.params.thoughtId })
			.select('-__v')
			.then((thought) =>
				!thought
					? res
							.status(404)
							.json({ message: 'No thought with this id' })
					: res.status(200).json(thought)
			)
			.catch((err) => res.status(500).json({ message: err.message }));
	},
	// CREATE a thought
	createThought(req, res) {
		Thought.create(req.body)
			.then((thought) =>
				User.findOneAndUpdate(
					{ username: thought.username },
					{ $addToSet: { thoughts: thought._id } },
					{ new: true }
				)
			)
			.then((user) => res.status(200).json(user))
			.catch((err) => {
				return res.status(500).json({ message: err.message });
			});
	},
	updateThought(req, res) {
		Thought.findOneAndUpdate(
			{ _id: req.params.thoughtId },
			{ $set: req.body },
			{ runValidators: true, new: true }
		)
			.then((thought) =>
				!thought
					? res
							.status(404)
							.json({ message: 'No thought with this id' })
					: res.status(200).json(thought)
			)
			.catch((err) => res.status(500).json({ message: err.message }));
	},
	deleteThought(req, res) {
		Thought.findOneAndDelete({ _id: req.params.thoughtId })
			.then((thought) =>
				!thought
					? res
							.status(404)
							.json({ message: 'No thought with this id' })
					: res.json({ message: 'Thought successfully deleted' })
			)
			.catch((err) => res.status(500).json(err));
	},
};
