<template>
  <div id="user-management">
    <h1>Actualizar Usuario</h1>
    <div>
      <label for="user-select">Seleccionar Usuario:</label>
      <select id="user-select" v-model="selectedUserId" @change="fetchUserById">
        <option value="">Selecciona un usuario</option>
        <option v-for="user in users" :key="user._id" :value="user._id">
          {{ user.nombre_usuario }} {{ user.apellido }}
        </option>
      </select>
    </div>
    <div v-if="selectedUser">
      <form @submit.prevent="updateUser">
        <div>
          <label>RUT:</label>
          <input v-model="selectedUser.rut_usuario" type="text" required />
        </div>
        <div>
          <label>Nombre:</label>
          <input v-model="selectedUser.nombre_usuario" type="text" required />
        </div>
        <div>
          <label>Apellido:</label>
          <input v-model="selectedUser.apellido" type="text" required />
        </div>
        <div>
          <label>Contraseña:</label>
          <input v-model="selectedUser.contrasenia" type="password" />
        </div>
        <div>
          <label>Teléfono:</label>
          <input v-model="selectedUser.fono" type="text" required />
        </div>
        <div>
          <label>Correo:</label>
          <input v-model="selectedUser.correo" type="email" required />
        </div>
        <div>
          <label>Rol:</label>
          <input v-model="selectedUser.rol" type="text" required />
        </div>
        <button type="submit">Actualizar</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from '../../axios';

export default {
  data() {
    return {
      users: [],
      selectedUserId: '',
      selectedUser: null
    };
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await axios.get('/usuario'); // Endpoint correcto para listar usuarios
        console.log(response)
        this.users = response.data.usuario;
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    },
    async fetchUserById() {
      if (this.selectedUserId) {
        try {
          const response = await axios.get(`/usuario/${this.selectedUserId}`); // Endpoint para obtener usuario por ID
          this.selectedUser = response.data.usuario; // Asegúrate de que esto coincide con la estructura de tu respuesta
        } catch (error) {
          console.error('Error fetching user:', error);
        }
      } else {
        this.selectedUser = null;
      }
    },
    async updateUser() {
      try {
        const updatedUser = {
          rut_usuario: this.selectedUser.rut_usuario,
          nombre_usuario: this.selectedUser.nombre_usuario,
          apellido: this.selectedUser.apellido,
          contrasenia: this.selectedUser.contrasenia,
          fono: this.selectedUser.fono,
          correo: this.selectedUser.correo,
          rol: this.selectedUser.rol
        };
        
        // Enviar datos de actualización al servidor
        const response = await axios.put(`/usuario/${this.selectedUser._id}`, updatedUser);
        alert(response.data.message);
        
        // Actualizar la lista de usuarios con los datos actualizados
        this.fetchUsers();
        this.selectedUserId = '';
        this.selectedUser = null;
      } catch (error) {
        console.error('Error updating user:', error);
      }
    }
  },
  mounted() {
    this.fetchUsers();
  }
};
</script>

<style>
</style>
