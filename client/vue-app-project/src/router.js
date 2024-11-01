import { createRouter, createWebHistory } from 'vue-router';
import LoginView from './views/LoginView.vue';
import RegisterView from './views/RegisterView.vue';
import ProductView from './views/ProductView.vue';
import TransactionView from './views/TransactionView.vue';
import DashboardView from './views/DashboardView.vue';

const routes = [
  { path: '/', component: LoginView },
  { path: '/login', component: LoginView },
  { path: '/register', component: RegisterView },
  { path: '/product', component: ProductView },
  { path: '/transaction', component: TransactionView },
  { path: '/dashboard', component: DashboardView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
