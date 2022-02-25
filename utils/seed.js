const connection = require('../config/connection');
const { User, Thought } = require('../models');
const {
	getRandomUsername,
	getRandomFriends,
	getRandomThought,
} = require('./data');

connection.on('error', (err) => err);

const usernames = [
	'sjauejE',
	'uncoquilpueBB',
	'FelberIW',
	'AiraudoEn',
	'NactswotaCr',
	'finlegiYJ',
	'Kuhherdepk',
	'pinkieKM',
	'terampilUp',
	'petesy6985Ox',
	'bigmeaniejerktP',
	'mochachino036z',
	'anonginketaizKG',
	'CelejH7',
	'Falgioy1',
];

connection.once('open', async () => {
	console.log('connected');

	await User.deleteMany({});
	await Thought.deleteMany({});

	const users = [];

	for (let i = 0; i < 15; i++) {
		const username = usernames[i];
		const email = `${username}@mail.com`;
		const thought = [];
		const friends = getRandomFriends();

		users.push({
			username,
			email,
			thought,
			friends,
		});
	}

	const thoughts = [];

	for (let i = 0; i < 20; i++) {
		thoughts.push(getRandomThought());
	}

	await Thought.collection.insertMany(thoughts);

	await User.collection.insertMany(users);

	console.table(users);
	console.table(thoughts);
	console.info('Completed seed');
	process.exit(0);
});
