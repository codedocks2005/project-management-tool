import { createApp } from 'vue';
import App from './App.vue';      // App.vue contains <router-view />
import router from './router';   // your router file

createApp(App)
  .use(router)  // make sure to add router to the app
  .mount('#app');
