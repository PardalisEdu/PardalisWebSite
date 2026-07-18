// ============================================================
// Auth & User types
// ============================================================

export interface User {
	id: string;
	name: string;
	email: string;
    image?: string | null;
}

// ============================================================
// Blog types
// ============================================================

export interface BlogPost {
	id: string;
	titulo: string;
	slug: string;
	extracto: string;
	contenido: string;
	categoria: string;
	autor_apodo: string;
	imagen_portada?: string;
	tiempo_lectura: number;
	fecha_publicacion: string;
	tags: string[];
}

// ============================================================
// Mini-game types
// ============================================================

export interface WordPair {
	emoji: string;
	english: string;
	spanish: string;
}

export interface MemoryCard {
	id: number;
	emoji: string;
	text: string;
	type: 'english' | 'spanish';
	pairId: number;
}

export interface FlashCard {
	english: string;
	spanish: string;
	context: string;
	category: string;
}

export interface ScrambleWord {
	word: string;
	hint: string;
	spanish: string;
	category: string;
}

export interface OracleCard {
	emoji: string;
	english: string;
	spanish: string;
	meaning: string;
	meaningEnglish: string;
}

export interface TacoType {
	name: string;
	emoji: string;
	english: string;
}

export interface Customer {
	name: string;
	emoji: string;
	phrases: string[];
}

export interface TacoOrder {
	type: TacoType;
	quantity: number;
	withVegetables: boolean;
	withSalsa: boolean;
}

export interface PreparedTaco {
	type: string;
	withVegetables: boolean;
	withSalsa: boolean;
}

export interface TortillaMission {
	amount: number;
	english: string;
	spanish: string;
	shortEnglish: string;
}

export interface Money {
	value: number;
	type: 'bill' | 'coin';
	emoji: string;
	english: string;
}

export interface Game {
	id: string;
	title: string;
	description: string;
	spanishTitle: string;
	emoji?: string;
	icon?: string;
	color: string;
	level: string;
}
