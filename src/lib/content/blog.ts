import { marked } from 'marked';
import type { BlogPost } from '$lib/types/types';

const posts = import.meta.glob('/src/content/blog/*.md', { eager: true, query: '?raw', import: 'default' }) as Record<string, string>;

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
	const lines = body.split('\n');

	let i = 0;
	while (i < lines.length) {
		const line = lines[i];
		const sep = line.indexOf(': ');
		if (sep === -1) { i++; continue; }

		const key = line.slice(0, sep).trim();
		const rawValue = line.slice(sep + 2).trim();

		if (key === 'tags') {
			const tagList: string[] = [];
			if (rawValue) tagList.push(rawValue.replace(/- /, ''));
			// Collect continuation lines starting with "  -"
			while (i + 1 < lines.length && lines[i + 1].match(/^\s{2}- /)) {
				i++;
				tagList.push(lines[i].trim().replace(/^- /, ''));
			}
			frontmatter.tags = tagList;
		} else if (rawValue === '') {
			// skip empty single-line values
		} else if (key === 'readingTime') {
			frontmatter.readingTime = parseInt(rawValue, 10);
		} else {
			(frontmatter as Record<string, unknown>)[key] = rawValue;
		}
		i++;
	}

	return frontmatter as Frontmatter;
}

function stripFrontmatter(raw: string): string {
	return raw.replace(/^---[\s\S]*?\n---\n/, '');
}

function readAllPosts(): BlogPost[] {
	const blogPosts: BlogPost[] = [];

	for (const [, raw] of Object.entries(posts)) {
		const frontmatter = parseFrontmatter(raw);
		if (!frontmatter) continue;

		const markdown = stripFrontmatter(raw);
		const contenido = marked.parse(markdown) as string;

		blogPosts.push({
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
			tags: frontmatter.tags ?? []
		});
	}

	blogPosts.sort((a, b) => new Date(b.fecha_publicacion).getTime() - new Date(a.fecha_publicacion).getTime());
	return blogPosts;
}

export function fetchBlogs(
	page = 1,
	categoria = 'Todos',
	limit = 10
): BlogPost[] {
	let blogPosts = readAllPosts();

	if (categoria !== 'Todos') {
		blogPosts = blogPosts.filter(p => p.categoria === categoria);
	}

	const start = (page - 1) * limit;
	return blogPosts.slice(start, start + limit);
}

export function fetchBlogBySlug(slug: string): BlogPost | null {
	const blogPosts = readAllPosts();
	return blogPosts.find(p => p.slug === slug) ?? null;
}
