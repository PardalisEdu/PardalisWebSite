import type { Game } from '$lib/types/types';

export const gamesList: Game[] = [
	{
		id: 'pardalis-pong',
		title: 'Ping Pong',
		description: 'Play and win with the metro',
		spanishTitle: 'Ping Pong',
		emoji: '🚇',
		color: 'from-red-400 to-red-600',
		level: 'Beginner'
	},
	{
		id: 'memory',
		title: 'Memory Match',
		description: 'Match English and Spanish words with cute emojis!',
		spanishTitle: 'Memorama',
		emoji: '🎴',
		color: 'from-pink-400 to-pink-600',
		level: 'Beginner'
	},
	{
		id: 'scramble',
		title: 'Word Scramble',
		description: 'Unscramble the letters to discover English words!',
		spanishTitle: 'Revoltijo de Palabras',
		emoji: '🔤',
		color: 'from-purple-400 to-purple-600',
		level: 'Intermediate'
	},
	{
		id: 'flashcards',
		title: 'Flash Cards',
		description: 'Practice your vocabulary with flashcards!',
		spanishTitle: 'Baraja de cartas',
		icon: '📚',
		color: 'from-blue-400 to-blue-600',
		level: 'Advanced'
	},
	{
		id: 'oraclecards',
		title: 'The Oracle',
		description: 'Learn your future while learning English!',
		spanishTitle: 'El Oráculo',
		emoji: '🔮',
		color: 'from-indigo-400 to-indigo-600',
		level: 'Beginner'
	},
	{
		id: 'taco',
		title: 'El Güero Tacos',
		description: 'Take orders and make delicious tacos in English!',
		spanishTitle: 'Tacos el Güero',
		emoji: '🌮',
		color: 'from-orange-400 to-orange-600',
		level: 'Advanced'
	},
	{
		id: 'tortillas',
		title: 'Tortilla Quest',
		description: 'Practice numbers and money in English!',
		spanishTitle: 'Misión Tortillas',
		emoji: '🫓',
		color: 'from-yellow-400 to-yellow-600',
		level: 'Intermediate'
	}
];
