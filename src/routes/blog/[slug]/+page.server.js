import { PUBLIC_API_URL } from '$env/static/public'
import { error } from '@sveltejs/kit'

export async function load ({ params, fetch }) {
  try {
    const response = await fetch(`${PUBLIC_API_URL}/blogs/${params.slug}`)

    if (!response.ok) {
      throw error(404, 'Blog no encontrado')
    }

    const blog = await response.json()

    return {
      blog
    }
  } catch (err) {
    console.error('Error cargando blog:', err)
    throw error(err.status || 500, err.message)
  }
}
