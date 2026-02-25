import type { TacoType, Customer } from '$lib/types/types';

export const tacoTypes: Record<string, TacoType> = {
	SUADERO: { name: 'Suadero', emoji: '🥩', english: 'Brisket' },
	LONGANIZA: { name: 'Longaniza', emoji: '🌭', english: 'Sausage' },
	PASTOR: { name: 'Al Pastor', emoji: '🍖', english: 'Marinated Pork' },
	CAMPECHANO: { name: 'Campechano', emoji: '🥩🌭', english: 'Mixed Meat' },
	LENGUA: { name: 'Lengua', emoji: '👅', english: 'Beef Tongue' }
};

export const customers: Customer[] = [
	{
		name: 'John',
		emoji: '👨🏻',
		phrases: [
			'Hello! I\'d like some tacos please!',
			'Could I get some sauce with that?',
			'Thank you, señor!'
		]
	},
	{
		name: 'Emily',
		emoji: '👩🏼',
		phrases: [
			'I heard these are the best tacos!',
			'No vegetables for me, please',
			'Gracias!'
		]
	},
	{
		name: 'Mike',
		emoji: '👨🏾',
		phrases: [
			'I want to try everything!',
			'Extra spicy please!',
			'¡Delicioso!'
		]
	}
];
