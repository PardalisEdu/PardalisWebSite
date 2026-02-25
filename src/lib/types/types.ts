// ============================================================
// Auth & User types
// ============================================================

export interface User {
	apodo: string;
	nombre?: string;
	correo?: string;
}

export interface AuthState {
	user: User | null;
	isAuthenticated: boolean;
}

export interface Credentials {
	correo: string;
	contrasenna: string;
}

export interface RegisterParams {
	apodo: string;
	nombre: string;
	correo: string;
	contrasenna: string;
}

export interface LoginResponse {
	token: string;
	user: User;
}

export interface DecodedToken {
	userApodo: string;
	exp: number;
	iat?: number;
}

// ============================================================
// Profile & Personalization
// ============================================================

export interface ProfileData {
	apodo: string;
	nombre?: string;
	correo?: string;
}

export interface PersonalizationData {
	descripcion: string;
	foto: string;
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

export interface BlogStoreState {
	blogs: BlogPost[];
	currentPage: number;
	loading: boolean;
	error: string | null;
	selectedCategory: string;
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
