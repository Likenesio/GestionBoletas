<template>
    <div>
      <h1>Cambiar Contraseña</h1>
      <form @submit.prevent="changePassword">
        <input v-model="oldPassword" type="password" placeholder="Contraseña Actual" required />
        <input v-model="newPassword" type="password" placeholder="Nueva Contraseña" required />
        <button type="submit">Cambiar Contraseña</button>
      </form>
      <div v-if="message">{{ message }}</div>
    </div>
  </template>
  
  <script>
  import axios from "../axios"; 
  
  export default {
    data() {
      return {
        oldPassword: "",
        newPassword: "",
        message: "",
      };
    },
    methods: {
      async changePassword() {
        try {
          const token = localStorage.getItem("token");
  
          // Decodificar el token para obtener el ID del usuario
          const decodedToken = JSON.parse(atob(token.split('.')[1]));
          const usuarioId = decodedToken.userId;
          // Enviar la solicitud de cambio de contraseña
          const changeResponse = await axios.put(
            `/usuario/cambiar-contrasenia/${usuarioId}`,
            {
              usuarioId: usuarioId,
              oldPassword: this.oldPassword,
              newPassword: this.newPassword
            },
            {
              headers: {
                Authorization: `penelope ${token}`
              }
            }
          );
          this.message = changeResponse.data.message;
        } catch (error) {
          this.message = error.response.data.message || "Error al cambiar la contraseña";
        }
      }
    }
  };
  </script>
  