import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import TodoItem from './components/TodoItem.vue'

const app = createApp(App);
app.component('TodoItem', TodoItem);
app.mount('#app');

