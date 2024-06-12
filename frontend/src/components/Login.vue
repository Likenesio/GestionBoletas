<template>
    <div>
      <h1>Iniciar Sesión</h1>
      <form @submit.prevent="login">
        <input v-model="correo" type="email" placeholder="Correo" required />
        <input v-model="contrasenia" type="password" placeholder="Contraseña" required />
        <button type="submit">Iniciar Sesión</button>
      </form>
      <div v-if="message">{{ message }}</div>
    </div>
  </template>
  
  <script>
  import axios from '../axios'; // Asegúrate de tener configurado axios
  
  export default {
    data() {
      return {
        correo: '',
        contrasenia: '',
        message: ''
      };
    },
    methods: {
      async login() {
        try {
          const response = await axios.post('/usuario/login', {
            correo: this.correo,
            contrasenia: this.contrasenia
          });
          const token = response.data.token;
          localStorage.setItem('token', token); // Almacenar el token en localStorage
          this.$router.push('/register'); // Redirigir al dashboard o página principal
          this.$root.isAuthenticated = true; // Actualizar el estado de autenticación
          this.$root.userId = JSON.parse(atob(token.split('.')[1])).userId; // Obtener el ID del usuario
        } catch (error) {
          this.message = error.response.data.message || 'Error al iniciar sesión';
        }
      }
    }
  };
  </script>
  
  <style scoped>
  /* Estilos para tu componente */
  </style>
  