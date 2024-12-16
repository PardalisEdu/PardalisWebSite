// src/lib/stores/blogStore.js
import { PUBLIC_API_URL } from '$env/static/public'
import { writable } from 'svelte/store'

function createBlogStore () {
  const { subscribe, set, update } = writable({
    blogs: [],
    currentPage: 1,
    loading: false,
    error: null,
    selectedCategory: 'Todos'
  })

  return {
    subscribe,
    update,
    loadBlogs: async (page = 1, categoria = 'Todos', limit = 10) => {
      update(state => ({ ...state, loading: true, error: null }))
      try {
        const params = new URLSearchParams({
          page: page.toString(),
          limit: limit.toString()
        })

        if (categoria !== 'Todos') {
          params.append('categoria', categoria)
        }

        const response = await fetch(`${PUBLIC_API_URL}/blogs`)
        if (!response.ok) throw new Error('Error cargando blogs')

        const data = await response.json()
        console.log('Datos cargados en store:', data) // Para debugging

        update(state => ({
          ...state,
          blogs: data,
          currentPage: page,
          selectedCategory: categoria,
          loading: false
        }))
      } catch (error) {
        console.error('Error en loadBlogs:', error)
        update(state => ({
          ...state,
          error: error.message,
          loading: false
        }))
      }
    },
    setCategory: (categoria) => {
      update(state => ({ ...state, selectedCategory: categoria }))
    },
    loadBlogBySlug: async (slug) => {
      update(state => ({ ...state, loading: true, error: null }))
      try {
        const response = await fetch(`/api/v1/blogs/${slug}`)
        if (!response.ok) throw new Error('Blog no encontrado')

        const data = await response.json()
        return data
      } catch (error) {
        console.error('Error en loadBlogBySlug:', error)
        update(state => ({
          ...state,
          error: error.message,
          loading: false
        }))
        throw error
      }
    },
    reset: () => {
      set({
        blogs: [],
        currentPage: 1,
        loading: false,
        error: null,
        selectedCategory: 'Todos'
      })
    }
  }
}

export const blogStore = createBlogStore()
