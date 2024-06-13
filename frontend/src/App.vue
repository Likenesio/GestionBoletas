<template>
  <div>
    <!--    <router-link to="/dashboard"></router-link> -->
     <!-- <router-link to="/register">Registrar</router-link>
      <router-link to="/userslist">Listar Usuarios</router-link>
      <router-link to="/update">Actualizar Usuario</router-link>
      <router-link to="/delete">Eliminar Usuario</router-link>
      <router-link :to="`/change-password/${userId}`">Cambiar Contraseña</router-link>
      <button @click="logout">Cerrar Sesión</button>  -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      userId: null,
      isAuthenticated: false
    };
  },
  created() {
    this.checkAuth();
  },
  methods: {
    checkAuth() {
      const token = localStorage.getItem('token');
      if (token) {
        const decoded = JSON.parse(atob(token.split('.')[1]));
        this.userId = decoded.userId;
        this.isAuthenticated = true;
        this.$router.push('/dashboard'); // Redirigir al dashboard si está autenticado
      } else {
        this.$router.push('/login'); // Redirigir a login si no está autenticado
      }
    },
    logout() {
      localStorage.removeItem('token');
      this.isAuthenticated = false;
      this.userId = null;
      this.$router.push('/login'); // Redirigir a login después de cerrar sesión
    }
  }
};
</script>

<style>
</style>
