<template>
    <div>
      <h1>Lista de Usuarios</h1>
      <ul>
        <li v-for="user in users" :key="user._id">{{ user.nombre_usuario }} - {{ user.correo }}</li>
      </ul>
    </div>
  </template>
  
  <script>
  import axios from '../../axios';
  
  export default {
    data() {
      return {
        users: []
      };
    },
    created() {
      this.fetchUsers();
    },
    methods: {
      async fetchUsers() {
        try {
          const response = await axios.get('/usuario');
          this.users = response.data.usuario;
        } catch (error) {
          console.error('Error al listar usuarios:', error);
        }
      }
    }
  };
  </script>
  