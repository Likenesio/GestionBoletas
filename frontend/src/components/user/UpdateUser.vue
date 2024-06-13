<template>
  <div class="q-pa-md contenido" style="max-width: 400px">
    <div>
      <h1>Actualizar Usuario</h1>
    </div>
    <q-form @submit="updateUser" class="q-gutter-md">
      <q-select
        filled
        v-model="selectedRut"
        label="Seleccionar RUT"
        :options="users.map(user => ({ label: user.rut_usuario, value: user._id }))"
        @input="populateUserData"
      />

      <q-input
        filled
        v-model="user.nombre_usuario"
        label="Nombre"
      />
      <q-input
        filled
        v-model="user.apellido"
        label="Apellido"
      />
      <q-input
        filled
        v-model="user.fono"
        label="Fono"
      />
      <q-input
        filled
        v-model="user.correo"
        label="Correo"
      />
      <q-input
        filled
        v-model="user.rol"
        label="Rol"
      />
      <q-input
        filled
        type="password"
        v-model="user.contrasenia"
        label="Contraseña"
      />

      <div>
        <q-btn label="Actualizar" type="submit" color="primary"/>
      </div>
    </q-form>

    <div v-if="message" class="q-mt-md">
      <q-banner dense inline-actions>{{ message }}</q-banner>
    </div>
  </div>
</template>

  
<script>
import { ref } from 'vue';
import axios from '../../axios';

export default {
  setup() {
    const users = ref([]);
    const selectedRut = ref('');
    const user = ref({
      rut_usuario: '',
      nombre_usuario: '',
      apellido: '',
      fono: '',
      correo: '',
      rol: '',
      contrasenia: '',
    });
    const message = ref('');

    const fetchUsers = async () => {
      try {
        const response = await axios.get('/usuario');
        users.value = response.data.usuario;
      } catch (error) {
        console.error('Error al listar usuarios:', error);
      }
    };

    const populateUserData = () => {
      const selectedUser = users.value.find(user => user._id === selectedRut.value);
      if (selectedUser) {
        user.value = { ...selectedUser, contrasenia: '' }; // Clear password field
      }
    };

    const updateUser = async () => {
      try {
        const response = await axios.put(`/usuario/${selectedRut.value}`, user.value);
        message.value = response.data.message;
      } catch (error) {
        message.value = error.response.data.message || 'Error al actualizar usuario';
      }
    };

    fetchUsers();

    return {
      users,
      selectedRut,
      user,
      message,
      fetchUsers,
      populateUserData,
      updateUser,
    };
  },
};
</script>

<style scoped>
*{
  box-sizing: border-box;
}
h1 {
  font-size: 3em;
  line-height: 1.1;
}
.q-pa-md {
  max-width: 400px;
  margin: auto;
}
.q-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  align-content: center;
  justify-items: center;
  grid-area: f;
}
.q-input,
.q-select {
  width: 100%;
}
.q-btn {
  border-radius: 8px;
  font-size: 1em;
  font-weight: 500;
  padding: 10px;
}
</style>