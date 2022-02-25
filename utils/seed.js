const connection = require('../config/connection');
const { User, Thought } = require('../models');

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

const thoughts = [
	'Because you’re blinking, you’ve never seen the whole movie in your life.',
	'What if you passed a missing person and you didn’t know she was missing?',
	'What if we passed a serial killer and he weighed us and thought – “I don’t want this.”',
	'Who taught the first teacher? Who cut the first hairdresser’s hair?',
	'When you wait for a waiter, you become a waiter.',
	'What if we met someone in a dream and had the same dream, but we will never find out?',
	'We all have three voices in us. One that we hear in our head, one that we hear when we speak, and one that other people hear.',
	'Why can’t we invent a new color?',
	'The letter x is used more in mathematics than in grammar and sentences.',
	'Do animals think we are aliens because we don’t look like them?',
	'If we were called differently, would we behave like a different person?',
	'Is sand called sand because it is located between the sea and the land?',
	'Why is a building called a building when it has already been built?',
	'If you hit yourself and it hurts, are you strong or weak?',
	'Has anyone ever died of laughter?',
	'Brushing your teeth is the only time you clean your skeleton.',
	'Do different species of animals communicate with each other, or they need a translator?',
	'If you try to rob a bank, you won’t have problems with bills for the next ten years, whether you succeed in the robbery or not',
	'What if dogs lick us because they know we have bones inside of us?',
];

const reactions = [
	"Whoa that's deep",
	'I thought the same thing!',
	"Nah, that's totally wack",
	'Dude, are you okay?',
	'This thought changed my life for good, for this I thank you',
	'Where is this coming from? Does your mother know you wrote this?',
	'Dope.',
	'Great thought! I really liked it!',
	'How dare you!',
];

const randomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

const getRandomFriend = () => randomItem(usernames);

const getRandomThought = () => {
	const result = {
		thoughtText: randomItem(thoughts),
		username: randomItem(usernames),
		reactions: {
			reactionBody: randomItem(reactions),
			username: randomItem(usernames),
		},
	};
	return result;
};

connection.once('open', async () => {
	console.log('connected');

	await User.deleteMany({});
	await Thought.deleteMany({});

	const users = [];

	// user creation
	for (let i = 0; i < 15; i++) {
		const username = usernames[i];
		const email = `${username}@mail.com`;
		const friends = [];

		users.push({
			username,
			email,
			friends,
		});
	}

	// thought creation
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
