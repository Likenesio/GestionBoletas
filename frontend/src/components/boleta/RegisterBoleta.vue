<template>
  <q-page padding>
    <q-form @submit.prevent="submitBoleta">
      <q-card>
        <q-card-section>
          <q-input
            filled
            v-model="numero"
            label="Número"
            type="number"
            required
          />
        </q-card-section>

        <q-card-section>
          <q-input
            filled
            v-model="fecha"
            label="Fecha"
            type="date"
            required
          />
        </q-card-section>

        <q-card-section>
          <q-select
            filled
            v-model="proveedor"
            label="Proveedor"
            :options="proveedores"
            option-label="nombre"
            option-value="_id"
            required
          />
        </q-card-section>

        <q-card-section>
          <q-table
            title="Productos"
            :rows="productos"
            :columns="columns"
            row-key="nombre"
            flat
            :pagination.sync="pagination"
          >
            <template v-slot:body-cell-nombre="props">
              <q-td :props="props">
                <q-input
                  v-model="props.row.nombre"
                  label="Nombre"
                  dense
                  outlined
                  autofocus
                />
              </q-td>
            </template>
            <template v-slot:body-cell-precio_unitario="props">
              <q-td :props="props">
                <q-input
                  v-model="props.row.precio_unitario"
                  label="Precio Unitario"
                  dense
                  outlined
                />
              </q-td>
            </template>
            <template v-slot:body-cell-cantidad="props">
              <q-td :props="props">
                <q-input
                  v-model="props.row.cantidad"
                  label="Cantidad"
                  dense
                  outlined
                />
              </q-td>
            </template>
            <template v-slot:body-cell-acciones="props">
              <q-td :props="props">
                <q-btn
                  color="negative"
                  icon="delete"
                  @click="removeProducto(props.row)"
                  dense
                  flat
                />
              </q-td>
            </template>
          </q-table>

          <q-btn
            color="primary"
            label="Agregar Producto"
            icon="add"
            @click="addProducto"
            dense
            flat
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            color="primary"
            type="submit"
            label="Crear Boleta"
          />
        </q-card-actions>
      </q-card>
    </q-form>
  </q-page>
</template>

<script>
import axios from '../../axios.js';

export default {
  data() {
    return {
      numero: '',
      fecha: '',
      proveedor: '',
      productos: [],
      proveedores: [],
      columns: [
        { name: 'nombre', required: true, label: 'Nombre', align: 'left' },
        { name: 'precio_unitario', required: true, label: 'Precio Unitario', align: 'left' },
        { name: 'cantidad', required: true, label: 'Cantidad', align: 'left' },
        { name: 'acciones', label: 'Acciones', align: 'center' }
      ],
      pagination: {
        page: 1,
        rowsPerPage: 5
      }
    };
  },
  created() {
    this.fetchProveedores();
  },
  methods: {
    async fetchProveedores() {
      try {
        const response = await axios.get('/proveedor');
        this.proveedores = response.data.proveedor;
      } catch (error) {
        console.error('Error fetching proveedores:', error);
      }
    },
    addProducto() {
      this.productos.push({ nombre: '', precio_unitario: '', cantidad: '' });
    },
    removeProducto(producto) {
      this.productos = this.productos.filter(p => p !== producto);
    },
    async submitBoleta() {
      const boletaData = {
        numero: this.numero,
        fecha: this.fecha,
        proveedor: this.proveedor,
        productos: this.productos
      };
      try {
        const response = await axios.post('/boleta', boletaData);
        console.log('Boleta creada:', response.data);
        // Reset form
        this.numero = '';
        this.fecha = '';
        this.proveedor = '';
        this.productos = [];
      } catch (error) {
        console.error('Error creating boleta:', error);
      }
    }
  }
};
</script>

<style scoped>
.q-page {
  max-width: 600px;
  margin: 0 auto;
}
</style>
