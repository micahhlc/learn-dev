import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'
import AsyncPromise from './components/AsyncPromise.vue'
import AsyncAwait from './components/AsyncAwait.vue'
import TestComponent from './components/TestComponent.vue'


const app = createApp(App)
app.component('async-promise', AsyncPromise)
app.component('async-await', AsyncAwait)
app.component('test-component', TestComponent)
app.mount('#app')
