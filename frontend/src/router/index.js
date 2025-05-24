import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '@/components/LoginPage.vue';  // Adjust if needed
import KanbanPage from '@/components/kanban.vue'; // Adjust if needed

const routes = [
  { path: '/', name: 'Login', component: LoginPage },
  { path: '/kanban', name: 'Kanban', component: KanbanPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
