import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/Login.vue';
import ChangePassword from '../components/ChangePassword.vue';
import Register from '../components/user/Register.vue';
import UserList from '../components/user/UserList.vue';
import UpdateUser from '../components/user/UpdateUser.vue';
import DeleteUser from '../components/user/DeleteUser.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/login', component: Login },
    { path: '/change-password/:_id', component: ChangePassword, meta: { requiresAuth: true } },
    { path: '/register', component: Register, meta: { requiresAuth: true } },
    { path: '/userslist', component: UserList, meta: { requiresAuth: true } },
    { path: '/update', component: UpdateUser, meta: { requiresAuth: true } },
    { path: '/delete', component: DeleteUser, meta: { requiresAuth: true } },
    { path: '/:catchAll(.*)', redirect: '/login' } // Utiliza una expresión regular personalizada para capturar todas las rutas
  ]
});


// Middleware de navegación
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  if (to.matched.some(record => record.meta.requiresAuth) && !token) {
    next('/login');
  } else {
    next();
  }
});


export default router;
