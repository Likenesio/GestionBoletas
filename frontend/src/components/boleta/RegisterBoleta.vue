<template>
  <q-page>
    <h1 >Ingresar Boleta</h1>
    <q-form @submit.prevent="confirmSubmit">
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
            class="input-name"
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
                  type="number"
                  @input="calculateTotal"
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
                  type="number"
                  @input="calculateTotal"
                />
              </q-td>
            </template>
            <template v-slot:body-cell-unidad_medida="props">
              <q-td :props="props">
                <q-select
                  v-model="props.row.unidad_medida"
                  :options="['KG', 'CAJA', 'UND']"
                  label="Unidad Medida"
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

        <q-card-section>
          <q-input
            filled
            v-model="total"
            label="Total"
            readonly
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            color="green-10"
            type="submit"
            label="Ingresar Boleta"
          />
        </q-card-actions>
      </q-card>

      <q-dialog v-model="confirmDialog">
        <q-card>
          <q-card-section class="row items-center">
            <q-icon name="warning" color="warning" size="32px" />
            <span class="q-ml-sm">¿Está seguro de registrar esta boleta?</span>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn flat label="Cancelar" v-close-popup />
            <q-btn color="primary" flat label="Confirmar" @click="submitBoleta" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
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
      total: 0,
      columns: [
        { name: 'nombre', required: true, label: 'Nombre', align: 'left' },
        { name: 'precio_unitario', required: true, label: 'Precio Unitario', align: 'left' },
        { name: 'cantidad', required: true, label: 'Cantidad', align: 'left' },
        { name: 'unidad_medida', required: true, label: 'Unidad Medida', align: 'left' },
        { name: 'acciones', label: 'Acciones', align: 'center' }
      ],
      pagination: {
        page: 1,
        rowsPerPage: 5
      },
      confirmDialog: false
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
        this.$q.notify({
          color: 'negative',
          position: 'top',
          message: 'Error fetching proveedores: ' + error.message,
          icon: 'report_problem'
        });
      }
    },
    addProducto() {
      this.productos.push({ nombre: '', precio_unitario: '', cantidad: '', unidad_medida: '' });
    },
    removeProducto(producto) {
      this.productos = this.productos.filter(p => p !== producto);
      this.calculateTotal();
    },
    calculateTotal() {
      this.total = this.productos.reduce((acc, producto) => {
        const precioUnitario = parseFloat(producto.precio_unitario) || 0;
        const cantidad = parseInt(producto.cantidad) || 0;
        return acc + (precioUnitario * cantidad);
      }, 0);
    },
    async confirmSubmit() {
      if (this.productos.length === 0 || this.productos.some(p => !p.nombre || !p.precio_unitario || !p.cantidad || !p.unidad_medida)) {
        this.$q.notify({
          color: 'negative',
          position: 'top',
          message: 'Debe agregar al menos un producto con todos sus campos llenos.',
          icon: 'report_problem'
        });
        return;
      }

      try {
        const response = await axios.get(`/boleta/exists/${this.numero}`);
        if (response.data.exists) {
          this.$q.notify({
            color: 'negative',
            position: 'top',
            message: 'El número de boleta ya existe.',
            icon: 'report_problem'
          });
          return;
        }
        this.confirmDialog = true;
      } catch (error) {
        this.$q.notify({
          color: 'negative',
          position: 'top',
          message: 'Error verifying boleta number: ' + error.message,
          icon: 'report_problem'
        });
      }
    },
    async submitBoleta() {
      const boletaData = {
        numero: this.numero,
        fecha: this.fecha,
        proveedor: this.proveedor,
        productos: this.productos,
        total: this.total
      };
      try {
        const response = await axios.post('/boleta', boletaData);
        this.$q.notify({
          color: 'positive',
          position: 'top',
          message: 'Boleta creada exitosamente',
          icon: 'check_circle'
        });
        // Reset form
        this.numero = '';
        this.fecha = '';
        this.proveedor = '';
        this.productos = [];
        this.total = 0;
      } catch (error) {
        this.$q.notify({
          color: 'negative',
          position: 'top',
          message: 'Error creating boleta: ' + error.message,
          icon: 'report_problem'
        });
      }
    }
  },
  watch: {
    productos: {
      handler: 'calculateTotal',
      deep: true
    }
  }
};
</script>

<style scoped>
*{
  box-sizing: border-box;
}
h1 {
  font-size: 3em;
  line-height: 1.1;
  font-weight: 700;
}
.q-page {
  max-width: 600px;
  min-width: 320;
  margin: 0 auto;
}
</style>
