import type { ClassData } from '$lib/types/types';

export const DEMO_CLASSES: ClassData[] = [
	{
		id: 'basico-a1',
		code: 'BASICO-A1',
		name: 'Inglés Básico A1',
		teacher: 'Profa. María García',
		description: 'Curso introductorio de inglés para principiantes. Aprenderás vocabulario básico, saludos, colores, números y frases cotidianas.',
		emoji: '🌟',
		color: 'from-blue-400 to-blue-600',
		students: 24,
		announcements: [
			{
				id: 'a1-001',
				title: '¡Bienvenidos al curso!',
				content: 'Hola a todos y todas. Bienvenidos al curso de Inglés Básico A1. Esta semana empezaremos con los saludos y presentaciones. Por favor revisen el archivo adjunto con el vocabulario de la semana. Nos vemos en clase.',
				files: [
					{ name: 'vocabulario_semana1.pdf', type: 'pdf' },
					{ name: 'guia_estudio.pdf', type: 'pdf' }
				],
				date: '2026-05-20'
			},
			{
				id: 'a1-002',
				title: 'Tarea para el jueves',
				content: 'Para la próxima clase, practiquen los números del 1 al 20. Pueden usar la canción que les compartí en clase. También lleven una hoja con los números escritos en letra. ¡Nos vemos!',
				files: [],
				date: '2026-05-22'
			},
			{
				id: 'a1-003',
				title: 'Material de repaso',
				content: 'Les comparto el material de repaso para el examen de la próxima semana. Incluye ejercicios de práctica y un audio con la pronunciación correcta de los saludos.',
				files: [
					{ name: 'repaso_examen1.pdf', type: 'pdf' },
					{ name: 'audio_practica.mp3', type: 'audio' }
				],
				date: '2026-05-25'
			}
		]
	},
	{
		id: 'intermedio-b2',
		code: 'INTER-B2',
		name: 'Inglés Intermedio B2',
		teacher: 'Prof. Juan Pérez',
		description: 'Curso de nivel intermedio donde trabajaremos tiempos verbales avanzados, vocabulario técnico y redacción de ensayos cortos.',
		emoji: '📚',
		color: 'from-purple-400 to-purple-600',
		students: 18,
		announcements: [
			{
				id: 'b2-001',
				title: 'Bienvenida y plan de estudios',
				content: 'Bienvenidos al curso intermedio. Este semestre veremos presente perfecto, voz pasiva, y condicionales. Adjunto el plan de estudios completo.',
				files: [
					{ name: 'plan_estudios_b2.pdf', type: 'pdf' }
				],
				date: '2026-05-18'
			},
			{
				id: 'b2-002',
				title: 'Lectura recomendada',
				content: 'Esta semana lean el artículo "The Future of Technology" que les comparto. Escriban un resumen de 150 palabras usando presente perfecto donde sea posible.',
				files: [
					{ name: 'the_future_of_tech.pdf', type: 'pdf' }
				],
				date: '2026-05-21'
			}
		]
	},
	{
		id: 'conversacion',
		code: 'CONVERSA',
		name: 'Conversación en Inglés',
		teacher: 'Prof. Diego Ramírez',
		description: 'Clase práctica de conversación. Mejora tu fluidez y pronunciación con debates, role-plays y presentaciones orales.',
		emoji: '🗣️',
		color: 'from-orange-400 to-orange-600',
		students: 12,
		announcements: [
			{
				id: 'conv-001',
				title: 'Tema de debate: Tecnología',
				content: 'Esta semana debatiremos sobre el impacto de la tecnología en la educación. Preparen 3 argumentos a favor y 3 en contra. Cada persona tendrá 3 minutos para exponer.',
				files: [],
				date: '2026-05-23'
			},
			{
				id: 'conv-002',
				title: 'Frases útiles para debatir',
				content: 'Les comparto una lista de frases útiles para participar en debates: "In my opinion...", "I agree with...", "On the other hand...", "Furthermore...". Practíquenlas en casa.',
				files: [
					{ name: 'frases_debate.pdf', type: 'pdf' }
				],
				date: '2026-05-24'
			}
		]
	}
];

export const LOCKED_CLASSES: ClassData[] = [
	{
		id: 'gramatica',
		code: 'GRAMATICA',
		name: 'Gramática Divertida',
		teacher: 'Profa. Ana López',
		description: 'Aprende gramática inglesa de forma divertida con juegos, canciones y ejercicios interactivos.',
		emoji: '🎯',
		color: 'from-green-400 to-green-600',
		students: 30,
		announcements: [
			{
				id: 'gram-001',
				title: '¡Bienvenidos a Gramática Divertida!',
				content: 'Este curso es totalmente práctico. Todos los días compartiré un ejercicio nuevo. Hoy empezamos con los artículos "a", "an" y "the".',
				files: [
					{ name: 'ejercicio_articulos.pdf', type: 'pdf' },
					{ name: 'cancion_articulos.mp3', type: 'audio' }
				],
				date: '2026-05-26'
			}
		]
	}
];

export function findClassByCode(code: string): ClassData | null {
	const allClasses = [...DEMO_CLASSES, ...LOCKED_CLASSES];
	return allClasses.find(c => c.code === code.toUpperCase()) ?? null;
}

export function isAlreadyJoined(code: string, joinedIds: string[]): boolean {
	const cls = findClassByCode(code);
	return cls ? joinedIds.includes(cls.id) : false;
}
