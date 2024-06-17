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
          <q-btn :color="getEstadoColor(props.row.estado)" style="width: 100px;" @click="openDialog(props.row)">
            {{ props.row.estado }}
          </q-btn>
        </q-td>
      </template>
      <template v-slot:body-cell-detalles="props">
        <q-td :props="props">
          <q-btn style="width: 100px;" color="indigo-10"  @click="openDetailsDialog(props.row)">
            Ver Detalles
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
    <q-dialog v-model="detailsDialogVisible">
      <q-card style="min-width: 500px;">
        <q-card-section>
          <div class="text-h6">Detalles de la Boleta</div>
        </q-card-section>
        <q-card-section>
          <div><strong>Número:</strong> {{ selectedBoletaDetalles.numero }}</div>
          <div><strong>Proveedor:</strong> {{ selectedBoletaDetalles.proveedor[0]?.nombre }}</div>
          <div><strong>Fecha:</strong> {{ new Date(selectedBoletaDetalles.fecha).toLocaleDateString() }}</div>
          <div><strong>Total:</strong> {{ selectedBoletaDetalles.total }}</div>
          <div><strong>Estado:</strong> {{ selectedBoletaDetalles.estado }}</div>
          <div><strong>Productos:</strong></div>
          <q-list bordered>
            <q-item v-for="(producto, index) in selectedBoletaDetalles.productos" :key="index">
              <q-item-section>{{ producto.nombre }}</q-item-section>
              <q-item-section>{{ producto.cantidad }}</q-item-section>
              <q-item-section>{{ producto.precio_unitario }}</q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cerrar" color="red-10" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-btn label="Descargar Excel" @click="downloadExcel" color="light-green-10" class="q-mt-md" />
  </div>
</template>

<script>
import axios from '../../axios';
import { ref, onMounted } from 'vue';
import ExcelJS from 'exceljs';

export default {
  name: 'BoletaList',
  setup() {
    const boletas = ref([]);
    const filter = ref('');
    const dialogVisible = ref(false);
    const detailsDialogVisible = ref(false);
    const selectedBoleta = ref(null);
    const selectedBoletaDetalles = ref({});
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
      { name: 'detalles', label: 'Detalles', align: 'left', field: 'detalles', sortable: false }
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

    const openDetailsDialog = (boleta) => {
      selectedBoletaDetalles.value = boleta;
      detailsDialogVisible.value = true;
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

    const getEstadoColor = (estado) => {
      switch (estado) {
        case 'Pagada':
          return 'light-blue-6';
        case 'Anulada':
          return 'grey-13';
        case 'Pendiente':
          return 'amber-9';
        default:
          return 'primary';
      }
    };

    const downloadExcel = async () => {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Boletas');
      
      // Añadir encabezados
      worksheet.columns = columns.map(col => ({ header: col.label, key: col.name }));

      // Añadir encabezados
      worksheet.columns = columns.map(col => ({
        header: col.label,
        key: col.name,
        width: 30 
      }));
      // Añadir filas
      boletas.value.forEach(boleta => {
        worksheet.addRow({
          numero: boleta.numero,
          proveedor: boleta.proveedor[0]?.nombre,
          fecha: new Date(boleta.fecha).toLocaleDateString(),
          total: boleta.total,
          estado: boleta.estado,
        });
      });

      const totalSum = boletas.value.reduce((sum, boleta) => sum + boleta.total, 0);

      worksheet.addRow({
        numero: '',
        proveedor: '',
        fecha: '',
        total: totalSum,
        estado: 'Suma Total'
      });
      
      // Aplicar estilo a la fila de suma total
      const lastRow = worksheet.lastRow;
      lastRow.font = { bold: true };
      lastRow.getCell('total').border = { top: { style: 'thin' } };
      // Generar archivo Excel
      const buffer = await workbook.xlsx.writeBuffer();
      
      // Crear un enlace para descargar el archivo
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Boletas-Nutriver.xlsx';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

    onMounted(fetchBoletas);

    return {
      boletas,
      columns,
      filter,
      dialogVisible,
      detailsDialogVisible,
      selectedBoleta,
      selectedBoletaDetalles,
      selectedEstado,
      estadoOptions,
      openDialog,
      openDetailsDialog,
      updateBoletaEstado,
      getEstadoColor,
      downloadExcel
    };
  }
};
</script>


<style scoped>
.q-table {
  width: 100%;
}
</style>
