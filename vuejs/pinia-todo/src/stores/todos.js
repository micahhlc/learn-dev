import { defineStore } from 'pinia'

let nextID = 1

export const useTodos = defineStore('todos', {
  // state
  state: () => ({
    todos: [],
    filter: 'all',
  }),

  getters: {
    allCount: (s) => s.todos.length,
    completedCount: (s) => s.todos.filter((t) => t.done).length,
    remainingCount: (s) => s.todos.filter((t) => !t.done).length,
    filteredTodos: (s) => {
      if (s.filter === 'active') return s.todos.filter((t) => !t.done)
      if (s.filter === 'completed') return s.todos.filter((t) => t.done)
      return s.todos
    },
  },

  actions: {
    add(text) {
      const trimmed = (text || '').trim()
      if (!trimmed) return
      this.todos.unshift({ id: nextId++, text: trimmed, done: false, createdAt: Date.now() })
    },
    toggle(id) {
      const t = this.todos.find((t) => t.id === id)
      if (t) t.done = !t.done
    },
    remove(id) {
      this.todos = this.todos.filter((t) => t.id !== id)
    },
    edit(id, newText) {
      const trimmed = (newText || '').trim()
      if (!trimmed) return
      const t = this.todos.find((t) => t.id === id)
      if (t) t.text = trimmed
    },
    setFilter(f) {
      this.filter = f
    },
    clearCompleted() {
      this.todos = this.todos.filter((t) => !t.done)
    },

    // persistence helpers (Step 5 will hook these up)
    load() {
      try {
        const raw = localStorage.getItem('todos_v1')
        const data = raw ? JSON.parse(raw) : null
        if (data && Array.isArray(data.todos)) {
          this.todos = data.todos
          nextId = Math.max(0, ...this.todos.map((t) => t.id)) + 1
        }
        if (data?.filter) this.filter = data.filter
      } catch (_) {}
    },
    save() {
      localStorage.setItem('todos_v1', JSON.stringify({ todos: this.todos, filter: this.filter }))
    },
  },
})
