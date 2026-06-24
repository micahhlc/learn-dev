<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>My To-Do</ion-title>
        <ion-badge slot="end" color="primary" class="ion-margin-end">
          {{ remaining }} yeah
        </ion-badge>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <!-- Add new task -->
      <ion-item>
        <ion-input
          v-model="newText"
          placeholder="What do you need to do?"
          @keyup.enter="addTodo"
          clear-input
        />
        <ion-button @click="addTodo" :disabled="!newText.trim()"
          >Add</ion-button
        >
      </ion-item>

      <!-- Pull to refresh -->
      <ion-refresher slot="fixed" @ionRefresh="refreshTodos">
        <ion-refresher-content
          pulling-text="Pull to refresh"
        ></ion-refresher-content>
      </ion-refresher>

      <!-- List of tasks -->
      <ion-list>
        <!-- List of tasks with drag-to-reorder -->
        <ion-reorder-group :disabled="false" @ionItemReorder="doReorder">
          <ion-item v-for="t in todos" :key="t.id">
            <ion-checkbox
              slot="start"
              v-model="t.done"
              @ionChange="toggleDone(t)"
            ></ion-checkbox>
            <ion-label
              :style="{ textDecoration: t.done ? 'line-through' : 'none' }"
            >
              {{ t.text }}
            </ion-label>

            <!-- drag handle -->
            <ion-reorder slot="end"></ion-reorder>

            <!-- delete button -->
            <ion-button
              slot="end"
              color="danger"
              fill="outline"
              size="small"
              @click="removeTodo(t.id)"
            >
              Delete
            </ion-button>
          </ion-item>
        </ion-reorder-group>
      </ion-list>

      <!-- Empty state -->
      <p v-if="todos.length === 0" class="ion-margin-top">
        No tasks yet. Add one above.
      </p>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonInput,
  IonButton,
  IonList,
  IonLabel,
  IonCheckbox,
  IonBadge,
  IonRefresher,
  IonRefresherContent,
  IonReorderGroup,
  IonReorder,
} from "@ionic/vue";
import type { ItemReorderEventDetail } from "@ionic/core";
import { ref, onMounted, watch, computed } from "vue";
const STORAGE_KEY = "todos.v1";
const remaining = computed(() => todos.value.filter((t) => !t.done).length);

type Todo = {
  id: string;
  text: string;
  done: boolean;
};

const todos = ref<Todo[]>([]);
const newText = ref("");

// Helpers
const uid = () => Date.now().toString();

function addTodo() {
  const text = newText.value.trim();
  if (!text) return;
  todos.value.unshift({ id: uid(), text, done: false });
  newText.value = "";
}

function toggleDone(t: Todo) {
  // v-model already updates t.done; this is here if you later persist/side-effect
}

function removeTodo(id: string) {
  todos.value = todos.value.filter((t) => t.id !== id);
}

function doReorder(ev: CustomEvent<ItemReorderEventDetail>) {
  const from = ev.detail.from;
  const to = ev.detail.to;
  const moved = todos.value.splice(from, 1)[0];
  todos.value.splice(to, 0, moved);
  ev.detail.complete(); // tell Ionic we’re done
}

function refreshTodos(ev: CustomEvent) {
  // reload from storage
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw) todos.value = JSON.parse(raw);
  // complete refresher after short delay
  setTimeout(() => ev.target?.complete(), 500);
}

onMounted(() => {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw) {
    try {
      const parsed = JSON.parse(raw) as Todo[];
      // basic sanity: ensure array and has required fields
      if (Array.isArray(parsed)) {
        todos.value = parsed.map((t) => ({
          id: String(t.id),
          text: String(t.text ?? ""),
          done: Boolean(t.done),
        }));
      }
    } catch {
      // ignore corrupted storage
    }
  }
});

watch(
  todos,
  (val) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(val));
  },
  { deep: true } // watch nested changes (e.g., t.done)
);
</script>
