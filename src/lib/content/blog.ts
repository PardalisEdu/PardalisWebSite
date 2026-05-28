import fs from 'fs';
import path from 'path';
import { marked } from 'marked';
import type { BlogPost } from '$lib/types/types';

const CONTENT_DIR = path.resolve('src/content/blog');

interface Frontmatter {
	title: string;
	slug: string;
	date: string;
	category: string;
	author: string;
	readingTime: number;
	excerpt: string;
	image?: string;
	tags: string[];
}

function parseFrontmatter(raw: string): Frontmatter | null {
	const match = raw.match(/^---\n([\s\S]*?)\n---\n/);
	if (!match) return null;

	const frontmatter: Partial<Frontmatter> = {};
	const body = match[1];

	for (const line of body.split('\n')) {
		const sep = line.indexOf(': ');
		if (sep === -1) continue;
		const key = line.slice(0, sep).trim();
		const rawValue = line.slice(sep + 2).trim();
		if (rawValue === '') continue;

		let parsedValue: string | number | string[] = rawValue;

		if (key === 'tags') {
			parsedValue = JSON.parse(rawValue.replace(/'/g, '"'));
		} else if (key === 'readingTime') {
			parsedValue = parseInt(rawValue, 10);
		}

		(frontmatter as Record<string, unknown>)[key] = parsedValue;
	}

	return frontmatter as Frontmatter;
}

function stripFrontmatter(raw: string): string {
	return raw.replace(/^---[\s\S]*?\n---\n/, '');
}

function readAllPosts(): BlogPost[] {
	const files = fs.readdirSync(CONTENT_DIR).filter((f: string) => f.endsWith('.md'));
	const posts: BlogPost[] = [];

	for (const file of files) {
		const raw = fs.readFileSync(path.join(CONTENT_DIR, file), 'utf-8');
		const frontmatter = parseFrontmatter(raw);
		if (!frontmatter) continue;

		const markdown = stripFrontmatter(raw);
		const contenido = marked.parse(markdown) as string;

		posts.push({
			id: frontmatter.slug,
			titulo: frontmatter.title,
			slug: frontmatter.slug,
			extracto: frontmatter.excerpt,
			contenido,
			categoria: frontmatter.category,
			autor_apodo: frontmatter.author,
			imagen_portada: frontmatter.image,
			tiempo_lectura: frontmatter.readingTime,
			fecha_publicacion: frontmatter.date,
			tags: frontmatter.tags
		});
	}

	posts.sort((a, b) => new Date(b.fecha_publicacion).getTime() - new Date(a.fecha_publicacion).getTime());
	return posts;
}

export function fetchBlogs(
	page = 1,
	categoria = 'Todos',
	limit = 10
): BlogPost[] {
	let posts = readAllPosts();

	if (categoria !== 'Todos') {
		posts = posts.filter(p => p.categoria === categoria);
	}

	const start = (page - 1) * limit;
	return posts.slice(start, start + limit);
}

export function fetchBlogBySlug(slug: string): BlogPost | null {
	const posts = readAllPosts();
	return posts.find(p => p.slug === slug) ?? null;
}
