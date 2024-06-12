<template>
  <div>
    <h1>Registrar Usuario</h1>
    <form @submit.prevent="register">
      <input v-model="user.rut_usuario" placeholder="RUT" />
      <input v-model="user.nombre_usuario" placeholder="Nombre" />
      <input v-model="user.apellido" placeholder="Apellido" />
      <input v-model="user.fono" placeholder="Fono" />
      <input v-model="user.correo" placeholder="Correo" />
      <input v-model="user.rol" placeholder="Rol" />
      <input type="password" v-model="user.contrasenia" placeholder="Contraseña" />
      <button type="submit">Registrar</button>
    </form>
    <div v-if="message">{{ message }}</div>
  </div>
</template>

<script>
import axios from '../../axios';

export default {
  data() {
    return {
      user: {
        rut_usuario: '',
        nombre_usuario: '',
        apellido: '',
        contrasenia: '',
        fono: '',
        correo: '',
        rol: ''
      },
      message: ''
    };
  },
  methods: {
    async register() {
      try {
        const response = await axios.post('/usuario', this.user);
        this.message = response.data.message;
      } catch (error) {
        this.message = error.response.data.message || 'Error al registrar usuario';
      }
    }
  }
};
</script>
