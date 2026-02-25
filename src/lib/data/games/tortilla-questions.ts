import type { TortillaMission, Money } from '$lib/types/types';

export const TORTILLA_PRICE = 22;

export const missions: TortillaMission[] = [
	{
		amount: 1000,
		english: 'one kilogram of tortillas',
		spanish: 'un kilo de tortillas',
		shortEnglish: '1 kg'
	},
	{
		amount: 500,
		english: 'half a kilogram of tortillas',
		spanish: 'medio kilo de tortillas',
		shortEnglish: '0.5 kg'
	},
	{
		amount: 250,
		english: 'quarter kilogram of tortillas',
		spanish: 'un cuarto de tortillas',
		shortEnglish: '0.25 kg'
	},
	{
		amount: 300,
		english: 'three hundred grams of tortillas',
		spanish: 'trescientos gramos de tortillas',
		shortEnglish: '300 g'
	},
	{
		amount: 750,
		english: 'three quarters of a kilogram of tortillas',
		spanish: 'tres cuartos de tortillas',
		shortEnglish: '0.75 kg'
	}
];

export const availableMoney: Money[] = [
	{ value: 100, type: 'bill', emoji: '💵', english: 'one hundred pesos' },
	{ value: 50, type: 'bill', emoji: '💵', english: 'fifty pesos' },
	{ value: 20, type: 'coin', emoji: '🪙', english: 'twenty pesos' },
	{ value: 10, type: 'coin', emoji: '🪙', english: 'ten pesos' },
	{ value: 5, type: 'coin', emoji: '🪙', english: 'five pesos' },
	{ value: 2, type: 'coin', emoji: '🪙', english: 'two pesos' },
	{ value: 1, type: 'coin', emoji: '🪙', english: 'one peso' }
];
