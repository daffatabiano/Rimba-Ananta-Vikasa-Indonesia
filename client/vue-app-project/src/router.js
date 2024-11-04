import { createRouter, createWebHistory } from 'vue-router';
import LoginView from './views/LoginView.vue';
import RegisterView from './views/RegisterView.vue';
import ProductView from './views/ProductView.vue';
import TransactionView from './views/TransactionView.vue';
import DashboardView from './views/DashboardView.vue';
import HomeView from './views/HomeView.vue';
import DeleteView from './views/DeleteView.vue';
import TrashView from './views/TrashView.vue';
import ProductDetail from './views/ProductDetail.vue';
import PermanentDelete from './views/PermanentDelete.vue';
import DeleteProductView from './views/DeleteProductView.vue';

const routes = [
  { path: '/', component: HomeView },
  { path: '/login', component: LoginView },
  { path: '/register', component: RegisterView },
  { path: '/product', component: ProductView, meta: { requiresAuth: true } },
  {
    path: '/transaction',
    component: TransactionView,
    meta: { requiresAuth: true },
  },
  {
    path: '/dashboard',
    component: DashboardView,
    meta: { requiresAuth: true },
  },
  {
    path: '/transaction/:id',
    component: DeleteView,
    meta: { requiresAuth: true },
  },
  {
    path: '/delete/:id',
    component: PermanentDelete,
    meta: { requiresAuth: true },
  },
  { path: '/trash', component: TrashView, meta: { requiresAuth: true } },
  {
    path: '/product/:id',
    component: ProductDetail,
    meta: { requiresAuth: true },
  },
  {
    path: '/delete-product/:id',
    component: DeleteProductView,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuth = localStorage.getItem('token');

  if (to.matched.some((record) => record.meta.requiresAuth) && !isAuth) {
    next('/login');
  } else {
    next();
  }
});

export default router;
