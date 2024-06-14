import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '../components/dashboard/Dashboard.vue';
import Login from '../components/Login.vue';
import ChangePassword from '../components/ChangePassword.vue';
import Register from '../components/user/Register.vue';
import UserList from '../components/user/UserList.vue';
import UpdateUser from '../components/user/UpdateUser.vue';
import DeleteUser from '../components/user/DeleteUser.vue';
import RegisterBoleta from '../components/boleta/RegisterBoleta.vue';
import BoletaList from '../components/boleta/BoletaList.vue';
/* import UpdateBoleta from '../components/boleta/UpdateBoleta.vue'; */
/* import RegisterProveedor from '../components/proveedor/RegisterProveedor.vue';
import ProveedorList from '../components/proveedor/ProveedorList.vue';
import UpdateProveedor from '../components/proveedor/UpdateProveedor.vue'; */

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/login', component: Login },
    {
      path: '/dashboard',
      component: Dashboard,
      meta: { requiresAuth: true },
      children: [
        { path: 'register', component: Register },
        { path: 'userslist', component: UserList },
        { path: 'update', component: UpdateUser },
        { path: 'register-boleta', component: RegisterBoleta },
        { path: 'boleta-list', component: BoletaList },
        /* { path: 'update-boleta', component: UpdateBoleta }, */
        /* { path: 'register-proveedor', component: RegisterProveedor },
        { path: 'proveedor-list', component: ProveedorList },
        { path: 'update-proveedor', component: UpdateProveedor }, */
      ]
    },
    { path: '/change-password/:_id', component: ChangePassword, meta: { requiresAuth: true } },
    { path: '/delete', component: DeleteUser, meta: { requiresAuth: true } },
    { path: '/:catchAll(.*)', redirect: '/login' }
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
