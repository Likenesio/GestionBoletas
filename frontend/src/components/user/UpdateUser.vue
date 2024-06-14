<template>
  <div id="user-management" class="q-pa-md">
    <h2>Actualizar Usuario</h2>
    <div>
      <q-btn-dropdown color="pink" label="Seleccionar Usuario" dropdown-icon="arrow_drop_down">
        <q-list>
          <q-item 
            v-for="user in users" 
            :key="user._id" 
            clickable 
            v-close-popup 
            @click="selectUser(user)"
          >
            <q-item-section>
              <q-item-label>{{ user.nombre_usuario }} {{ user.apellido }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>
    </div>
    <div v-if="selectedUser">
      <form @submit.prevent="updateUser">
        <div>
          <label>RUT:</label>
          <input v-model="selectedUser.rut_usuario" type="text" required disabled />
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
import { ref } from 'vue';

export default {
  setup() {
    const users = ref([]);
    const selectedUserId = ref('');
    const selectedUser = ref(null);

    const fetchUsers = async () => {
      try {
        const response = await axios.get('/usuario'); // Endpoint correcto para listar usuarios
        users.value = response.data.usuario;
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    const selectUser = (user) => {
      selectedUser.value = user;
    };

    const updateUser = async () => {
      try {
        const updatedUser = {
          rut_usuario: selectedUser.value.rut_usuario,
          nombre_usuario: selectedUser.value.nombre_usuario,
          apellido: selectedUser.value.apellido,
          contrasenia: selectedUser.value.contrasenia,
          fono: selectedUser.value.fono,
          correo: selectedUser.value.correo,
          rol: selectedUser.value.rol,
        };
        
        // Enviar datos de actualización al servidor
        const response = await axios.put(`/usuario/${selectedUser.value._id}`, updatedUser);
        alert(response.data.message);
        
        // Actualizar la lista de usuarios con los datos actualizados
        fetchUsers();
        selectedUser.value = null;
      } catch (error) {
        console.error('Error updating user:', error);
      }
    };

    fetchUsers();

    return {
      users,
      selectedUserId,
      selectedUser,
      fetchUsers,
      selectUser,
      updateUser,
    };
  },
};
</script>

<style>
/* Añadir algunos estilos básicos */
#user-management {
  font-family: Arial, sans-serif;
  max-width: 600px;
  margin: 0 auto;
}

form {
  margin-top: 20px;
}

form div {
  margin-bottom: 10px;
}

form label {
  display: block;
  margin-bottom: 5px;
}

form input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}
</style>
