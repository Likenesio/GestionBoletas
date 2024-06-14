<template>
  <div class="q-pa-md">
    <q-table
      :grid="$q.screen.xs"
      flat bordered
      title="Lista de Usuarios"
      :rows="users"
      :columns="columns"
      row-key="_id"
      :filter="filter"
      hide-header
    >
      <template v-slot:top-right>
        <q-input borderless dense debounce="300" v-model="filter" placeholder="Buscar">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
    </q-table>
  </div>
</template>

<script scoped>
import axios from '../../axios';
import { ref } from 'vue';

export default {
  setup() {
    const users = ref([]);
    const filter = ref('');

    const columns = [
      { name: 'nombre_usuario', required: true, label: 'Nombre de Usuario', align: 'left', field: row => row.nombre_usuario, format: val => `${val}`, sortable: true },
      { name: 'apellido',  required: true, label: 'Apellido', align: 'left', field: row => row.apellido, format: val => `${val}`, sortable: true },
      { name: 'correo', label: 'Correo', align: 'left', field: row => row.correo, sortable: true }
    ];

    const fetchUsers = async () => {
      try {
        const response = await axios.get('/usuario');
        users.value = response.data.usuario;
      } catch (error) {
        console.error('Error al listar usuarios:', error);
      }
    };

    fetchUsers();

    return {
      users,
      columns,
      filter
    };
  }
};
</script>
