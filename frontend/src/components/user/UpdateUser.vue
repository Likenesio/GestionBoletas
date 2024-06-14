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
      <q-form @submit.prevent="updateUser" class="q-gutter-md">
        <q-input
          filled
          v-model="selectedUser.rut_usuario"
          label="RUT"
          lazy-rules
          :rules="[ val => !!val || 'Este campo es requerido']"
          disabled
        />
        <q-input
          filled
          v-model="selectedUser.nombre_usuario"
          label="Nombre"
          lazy-rules
          :rules="[ val => !!val || 'Este campo es requerido']"
        />
        <q-input
          filled
          v-model="selectedUser.apellido"
          label="Apellido"
          lazy-rules
          :rules="[ val => !!val || 'Este campo es requerido']"
        />
        <q-input
          filled
          v-model="selectedUser.fono"
          label="Teléfono"
          lazy-rules
          :rules="[ val => !!val || 'Este campo es requerido']"
        />
        <q-input
          filled
          v-model="selectedUser.correo"
          label="Correo"
          type="email"
          lazy-rules
          :rules="[ val => !!val || 'Este campo es requerido']"
        />
        <q-input
          filled
          v-model="selectedUser.rol"
          label="Rol"
          lazy-rules
          :rules="[ val => !!val || 'Este campo es requerido']"
        />
        <q-btn label="Actualizar" type="submit" color="primary" />
      </q-form>
    </div>
  </div>
</template>

<script>
import axios from '../../axios';
import { ref } from 'vue';
import { useQuasar } from 'quasar';

export default {
  setup() {
    const $q = useQuasar();
    const users = ref([]);
    const selectedUserId = ref('');
    const selectedUser = ref(null);

    const fetchUsers = async () => {
      try {
        const response = await axios.get('/usuario'); // Endpoint correcto para listar usuarios
        users.value = response.data.usuario;
      } catch (error) {
        console.error('Error fetching users:', error);
        $q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'warning',
          message: 'Error al obtener los usuarios'
        });
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
        $q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: response.data.message
        });
        
        // Actualizar la lista de usuarios con los datos actualizados
        fetchUsers();
        selectedUser.value = null;
      } catch (error) {
        console.error('Error updating user:', error);
        $q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'warning',
          message: 'Error al actualizar el usuario'
        });
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
</style>
