<template id="form">
  <div class="page">
    <div class="contenedor">
      <h1>Iniciar Sesión</h1>
      <form @submit.prevent="login">
        <input v-model="correo" type="email" placeholder="Correo" required />
        <input v-model="contrasenia" type="password" placeholder="Contraseña" required />
        <button type="submit">Iniciar Sesión</button>
      </form>
      <div v-if="message">{{ message }}</div>
    </div>
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
          this.$router.push('/dashboard'); // Redirigir al dashboard o página principal
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
*{
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.contenedor {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 5px;
  }
  
  form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

input {
  padding: 2px 5px;
}
.message {
  color: red;
}
button {
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #f8eeee;
  cursor: pointer;
  transition: border-color 0.25s;
}
button:hover {
  border-color: #646cff;
}
button:focus,
button:focus-visible {
  outline: 4px auto -webkit-focus-ring-color;
}
h1 {
  font-size: 4em;
  line-height: 1.1;
}

</style>