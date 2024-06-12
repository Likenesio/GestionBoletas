<template>
    <div>
      <h1>Actualizar Usuario</h1>
      <form @submit.prevent="updateUser">
        <select v-model="selectedRut" @change="populateUserData">
        <option v-for="user in users" :key="user._id" :value="user._id">{{ user.rut_usuario }}</option>
      </select>
        <input v-model="user.nombre_usuario" placeholder="Nombre" />
        <input v-model="user.apellido" placeholder="Apellido" />
        <input v-model="user.fono" placeholder="Fono" />
        <input v-model="user.correo" placeholder="Correo" />
        <input v-model="user.rol" placeholder="Rol" />
        <input type="password" v-model="user.contrasenia" placeholder="Contraseña" />
        <button type="submit">Actualizar</button>
      </form>
      <div v-if="message">{{ message }}</div>
    </div>
  </template>
  
  <script>
  import axios from '../../axios';

  
  export default {
  data() {
    return {
      users: [],
      selectedRut: '',
      user: {
        rut_usuario: '',
        nombre_usuario: '',
        apellido: '',
        fono: '',
        correo: '',
        rol: ''
      },
      message: ''
    };
  },
  created() {
    this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await axios.get('/usuario');
        console.log(response);
        this.users = response.data.usuario;
        console.log(this.users);
      } catch (error) {
        console.error('Error al listar usuarios:', error);
      }
    },
    populateUserData() {
      const selectedUser = this.users.find(user => user._id === this.selectedRut);
      if (selectedUser) {
        this.user = { ...selectedUser, contrasenia: '' };  // Clear password field
      }
    },
    async updateUser() {
      try {
        const response = await axios.put(`/usuario/${this.selectedRut}`, this.user);
        this.message = response.data.message;
      } catch (error) {
        this.message = error.response.data.message || 'Error al actualizar usuario';
      }
    }
  }
};
</script>


<style>
@import url(../../style.css);
form{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: end;
    gap: 20px;
    margin-top: 15px;
}
input{
    width: 100%;
    height: 40px;
    padding: 5px 10px;
    background-color: aliceblue;
    border: black;
}
</style>