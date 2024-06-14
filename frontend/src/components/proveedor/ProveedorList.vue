<template>
    <div class="q-pa-md">
      <q-table
        :grid="$q.screen.xs"
        flat bordered
        title="Lista de Proveedores"
        :rows="proveedor"
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
      const proveedor = ref([]);
      const filter = ref('');
  
      const columns = [
        { name: 'nombre', required: true, label: 'Nombre de Proveedor', align: 'left', field: row => row.nombre, format: val => `${val}`, sortable: true },
        { name: 'rut',  required: true, label: 'Rut', align: 'left', field: row => row.rut, format: val => `${val}`, sortable: true },
        { name: 'direccion', label: 'Direccion', align: 'left', field: row => row.direccion, sortable: true }
      ];
  
      const fetchUsers = async () => {
        try {
          const response = await axios.get('/proveedor');
          proveedor.value = response.data.proveedor;
        } catch (error) {
          console.error('Error al listar provedores:', error);
        }
      };
  
      fetchUsers();
  
      return {
        proveedor,
        columns,
        filter
      };
    }
  };
  </script>
  