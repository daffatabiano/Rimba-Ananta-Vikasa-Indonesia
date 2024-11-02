import { createRouter, createWebHistory } from 'vue-router';
import LoginView from './views/LoginView.vue';
import RegisterView from './views/RegisterView.vue';
import ProductView from './views/ProductView.vue';
import TransactionView from './views/TransactionView.vue';
import DashboardView from './views/DashboardView.vue';
import HomeView from './views/HomeView.vue';
import DeleteView from './views/DeleteView.vue';

const routes = [
  { path: '/', component: HomeView },
  { path: '/login', component: LoginView },
  { path: '/register', component: RegisterView },
  { path: '/product', component: ProductView },
  { path: '/transaction', component: TransactionView },
  { path: '/dashboard', component: DashboardView },
  { path: '/transaction/:id', component: DeleteView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
