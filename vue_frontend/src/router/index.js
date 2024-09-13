import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import Posts from '../views/Posts.vue';
import PostDetail from '../views/PostDetail.vue';

const routes = [
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register },
  { path: '/posts', name: 'Posts', component: Posts, meta: { requiresAuth: true } },
  { path: '/posts/:id', name: 'PostDetail', component: PostDetail }, 
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation guard to protect routes
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('token');
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login');
  } else {
    next();
  }
});

export default router;
