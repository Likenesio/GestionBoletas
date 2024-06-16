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
      <template v-slot:body-cell-estado="props">
        <q-td :props="props">
          <q-btn style="width: 100px;" color="green-10" @click="openDialog(props.row)">
            {{ props.row.estado }}
          </q-btn>
        </q-td>
      </template>
    </q-table>
    <q-dialog v-model="dialogVisible">
      <q-card>
        <q-card-section>
          <div class="text-h6">Actualizar Estado</div>
        </q-card-section>
        <q-card-section>
          <q-select
            v-model="selectedEstado"
            :options="estadoOptions"
            label="Seleccionar nuevo estado"
          />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="red-10" v-close-popup />
          <q-btn flat label="Actualizar" color="primary" @click="updateBoletaEstado" />
        </q-card-actions>
      </q-card>
    </q-dialog>
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
    const dialogVisible = ref(false);
    const selectedBoleta = ref(null);
    const selectedEstado = ref('');
    const estadoOptions = [
      'Pendiente',
      'Pagada',
      'Anulada'
    ];

    const columns = [
      { name: 'numero', required: true, label: 'N° de Boleta', align: 'left', field: row => row.numero, format: val => `${val}`, sortable: true },
      { name: 'proveedor', required: true, label: 'Proveedor', align: 'left', field: row => row.proveedor[0]?.nombre, format: val => `${val}`, sortable: true },
      { name: 'fecha', label: 'Fecha', align: 'left', field: row => new Date(row.fecha).toLocaleDateString(), sortable: true },
      { name: 'total', label: 'Total', align: 'left', field: row => row.total, format: val => `${val}`, sortable: true },
      { name: 'estado', label: 'Estado Boleta', align: 'left', field: row => row.estado, format: val => `${val}`, sortable: true },
    ];

    const fetchBoletas = async () => {
      try {
        const response = await axios.get('/boleta');
        boletas.value = response.data;
      } catch (error) {
        console.error('Error al listar boletas:', error);
      }
    };

    const openDialog = (boleta) => {
      selectedBoleta.value = boleta;
      selectedEstado.value = boleta.estado;
      dialogVisible.value = true;
    };

    const updateBoletaEstado = async () => {
      try {
        const response = await axios.put(`/boleta/${selectedBoleta.value._id}`, {
          ...selectedBoleta.value,
          estado: selectedEstado.value
        });
        const updatedBoleta = response.data.boleta;
        const index = boletas.value.findIndex(b => b._id === updatedBoleta._id);
        if (index !== -1) {
          boletas.value[index] = updatedBoleta;
        }
        dialogVisible.value = false;
      } catch (error) {
        console.error('Error al actualizar el estado de la boleta:', error);
      }
    };

    onMounted(fetchBoletas);

    return {
      boletas,
      columns,
      filter,
      dialogVisible,
      selectedBoleta,
      selectedEstado,
      estadoOptions,
      openDialog,
      updateBoletaEstado
    };
  }
};
</script>

<style scoped>
.q-table {
  width: 100%;
}
</style>
