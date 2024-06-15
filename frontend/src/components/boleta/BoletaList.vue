<template>
    <div class="q-pa-md">
      <q-table
        :grid="$q.screen.xs"
        flat bordered
        title="Lista de Boletas"
        :rows="boletas"
        :columns="columns"
        row-key="_id"
        :filter="filter"
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
  
  <script>
  import axios from '../../axios';
  import { ref, onMounted } from 'vue';
  
  export default {
    name: 'BoletaList',
    setup() {
      const boletas = ref([]);
      const filter = ref('');
  
      const columns = [
        { name: 'numero', required: true, label: 'N° de Boleta', align: 'left', field: row => row.numero, format: val => `${val}`, sortable: true },
        { name: 'proveedor', required: true, label: 'Proveedor', align: 'left', field: row => row.proveedor[0]?.nombre, format: val => `${val}`, sortable: true },
        { name: 'fecha', label: 'Fecha', align: 'left', field: row => new Date(row.fecha).toLocaleDateString(), sortable: true },
        { name: 'total', label: 'Total', align: 'left', field: row => row.total, format: val => `${val}`, sortable: true },
        { name: 'estado', label: 'Estado Boleta', align: 'left', field: row => row.estado, format: val => `${val}`, sortable: true },
      ];
  
      const fetchBoletas = async () => {
        try {
          const response = await axios.get('/boleta'); // Cambia esto a tu URL base
          boletas.value = response.data;
        } catch (error) {
          console.error('Error al listar boletas:', error);
        }
      };
  
      onMounted(fetchBoletas);
  
      return {
        boletas,
        columns,
        filter
      };
    }
  };
  </script>
  
  <style scoped>
  .q-table {
    width: 100%;
  }
  </style>
  