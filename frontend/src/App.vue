<template>
  <div>
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
