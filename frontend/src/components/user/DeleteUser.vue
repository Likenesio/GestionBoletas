<template>
    <div>
      <h1>Eliminar Usuario</h1>
      <form @submit.prevent="deleteUser">
        <input v-model="userId" placeholder="ID del Usuario" />
        <button type="submit">Eliminar</button>
      </form>
      <div v-if="message">{{ message }}</div>
    </div>
  </template>
  
  <script>
  import axios from '../../axios';
  
  export default {
    data() {
      return {
        userId: '',
        message: ''
      };
    },
    methods: {
      async deleteUser() {
        try {
          const response = await axios.delete(`/usuario/${this.userId}`);
          this.message = response.data.message;
        } catch (error) {
          this.message = error.response.data.message || 'Error al eliminar usuario';
        }
      }
    }
  };
  </script>
  