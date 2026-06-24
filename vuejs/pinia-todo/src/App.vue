<script setup>
import { ref, onMounted, watch } from 'vue'
import { useTodos } from './stores/todos'

const store = useTodos()

// input state
const newTodo = ref('')

// inline editing state
const editingId = ref(null)
const editText = ref('')

function addTodo() {
  store.add(newTodo.value)
  newTodo.value = ''
}

function startEdit(todo) {
  editingId.value = todo.id
  editText.value = todo.text
}

function confirmEdit(id) {
  store.edit(id, editText.value)
  editingId.value = null
  editText.value = ''
}

// Step 5 uses these to persist to localStorage
onMounted(() => {
  store.load()
})
watch(
  () => [store.todos, store.filter],
  () => store.save(),
  { deep: true },
)
</script>

<template>
  <main class="app">
    <h1>Todo (Vue + Pinia)</h1>

    <!-- add -->
    <form class="row" @submit.prevent="addTodo">
      <input v-model="newTodo" placeholder="What needs to be done?" autofocus />
      <button type="submit">Add</button>
    </form>

    <!-- filters -->
    <div class="filters">
      <button :class="{ active: store.filter === 'all' }" @click="store.setFilter('all')">
        All ({{ store.allCount }})
      </button>

      <button :class="{ active: store.filter === 'active' }" @click="store.setFilter('active')">
        Active ({{ store.remainingCount }})
      </button>

      <button
        :class="{ active: store.filter === 'completed' }"
        @click="store.setFilter('completed')"
      >
        Completed ({{ store.completedCount }})
      </button>

      <button v-if="store.completedCount" class="danger" @click="store.clearCompleted()">
        Clear Completed
      </button>
    </div>

    <!-- list -->
    <ul class="list" v-if="store.filteredTodos.length">
      <li v-for="todo in store.filteredTodos" :key="todo.id" class="item">
        <label class="left">
          <input type="checkbox" :checked="todo.done" @change="store.toggle(todo.id)" />
          <span :class="{ done: todo.done }" v-if="editingId !== todo.id">{{ todo.text }}</span>

          <!-- inline edit -->
          <input
            v-else
            v-model="editText"
            @keyup.enter="confirmEdit(todo.id)"
            @blur="confirmEdit(todo.id)"
          />
        </label>

        <div class="right">
          <button v-if="editingId !== todo.id" @click="startEdit(todo)">Edit</button>
          <button class="danger" @click="store.remove(todo.id)">Delete</button>
        </div>
      </li>
    </ul>

    <p v-else class="empty">No todos yet. Add one above!</p>
  </main>
</template>

<style>
:root {
  font-family:
    system-ui,
    -apple-system,
    Segoe UI,
    Roboto,
    Arial,
    sans-serif;
}
.app {
  max-width: 600px;
  margin: 40px auto;
  padding: 0 12px;
}
h1 {
  font-size: 28px;
  margin-bottom: 16px;
}
.row {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
}
.row input {
  flex: 1;
  padding: 8px 10px;
  font-size: 16px;
}
button {
  padding: 8px 12px;
  border: 1px solid #ddd;
  background: #f7f7f7;
  cursor: pointer;
  border-radius: 6px;
}
button:hover {
  background: #eee;
}
button.active {
  border-color: #333;
}
button.danger {
  border-color: #ff6b6b;
  color: #b00000;
  background: #ffecec;
}
.filters {
  display: flex;
  gap: 8px;
  align-items: center;
  margin: 12px 0 16px;
  flex-wrap: wrap;
}
.list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 8px;
}
.item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border: 1px solid #eee;
  border-radius: 8px;
}
.left {
  display: flex;
  gap: 8px;
  align-items: center;
}
.done {
  text-decoration: line-through;
  color: #888;
}
.right {
  display: flex;
  gap: 8px;
}
.empty {
  color: #777;
}
</style>
