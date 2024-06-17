<template>
    <q-page padding>
        <q-form @submit.prevent="buscarBoleta">
            <q-card>
                <q-card-section>
                    <q-input filled v-model="numeroBoleta" label="Número de Boleta" type="number" required />
                </q-card-section>
                <q-card-actions align="right">
                    <q-btn color="primary" type="submit" label="Buscar Boleta" />
                </q-card-actions>
            </q-card>
        </q-form>

        <div v-if="boleta">
            <q-form @submit.prevent="confirmSubmit">
                <q-card>
                    <q-card-section>
                        <q-input filled v-model="boleta.numero" label="Número" type="number"
                            :rules="[val => val > 0 || 'El número debe ser un entero positivo']" required readonly />
                    </q-card-section>

                    <q-card-section>
                        <q-input filled v-model="formattedDate" label="Fecha" type="date" required />
                    </q-card-section>

                    <q-card-section>
                        <q-input filled v-model="boleta.proveedor[0].nombre" label="Proveedor" required readonly />
                    </q-card-section>

                    <q-card-section>
                        <q-select filled v-model="boleta.estado" label="Estado" :options="estados" required />
                    </q-card-section>

                    <q-card-section>
                        <q-table title="Productos" :rows="boleta.productos" :columns="columns" row-key="nombre" flat
                            :pagination.sync="pagination">
                            <template v-slot:body-cell-nombre="props">
                                <q-td :props="props">
                                    <q-input v-model="props.row.nombre" label="Nombre" dense outlined autofocus
                                        :rules="[val => !!val || 'El nombre es requerido']" />
                                </q-td>
                            </template>
                            <template v-slot:body-cell-precio_unitario="props">
                                <q-td :props="props">
                                    <q-input v-model="props.row.precio_unitario" label="Precio Unitario" dense outlined
                                        type="number" @input="updateProducto(props)"
                                        :rules="[val => val > 0 || 'Debe ser un número entero positivo']" />
                                </q-td>
                            </template>
                            <template v-slot:body-cell-cantidad="props">
                                <q-td :props="props">
                                    <q-input v-model="props.row.cantidad" label="Cantidad" dense outlined type="number"
                                        @input="updateProducto(props)"
                                        :rules="[val => val > 0 || 'Debe ser un entero positivo']" />
                                </q-td>
                            </template>
                            <template v-slot:body-cell-unidad_medida="props">
                                <q-td :props="props">
                                    <q-select v-model="props.row.unidad_medida" :options="['KG', 'CAJA', 'UND']"
                                        label="Unidad Medida" dense outlined
                                        :rules="[val => !!val || 'Unidad de medida es requerida']" />
                                </q-td>
                            </template>
                            <template v-slot:body-cell-acciones="props">
                                <q-td :props="props">
                                    <q-btn color="negative" icon="delete" @click="removeProducto(props.row)" dense
                                        flat />
                                </q-td>
                            </template>
                        </q-table>

                        <q-btn color="primary" label="Agregar Producto" icon="add" @click="addProducto" dense flat />
                    </q-card-section>

                    <q-card-section>
                        <q-input filled v-model="boleta.total" label="Total" readonly />
                    </q-card-section>

                    <q-card-actions align="right">
                        <q-btn color="green-10" type="submit" label="Actualizar Boleta" />
                    </q-card-actions>
                </q-card>

                <q-dialog v-model="confirmDialog">
                    <q-card>
                        <q-card-section class="row items-center">
                            <q-icon name="warning" color="warning" size="32px" />
                            <span class="q-ml-sm">¿Está seguro de actualizar esta boleta?</span>
                        </q-card-section>
                        <q-card-actions align="right">
                            <q-btn flat label="Cancelar" v-close-popup />
                            <q-btn color="green-10" flat label="Confirmar" @click="submitBoleta" v-close-popup />
                        </q-card-actions>
                    </q-card>
                </q-dialog>
            </q-form>
        </div>
    </q-page>
</template>

<script>
import axios from '../../axios';

export default {
  data() {
    return {
      numeroBoleta: '',
      boleta: null,
      estados: ['Pendiente', 'Pagado', 'Anulado'],
      columns: [
        { name: 'nombre', label: 'Nombre', field: 'nombre' },
        { name: 'precio_unitario', label: 'Precio Unitario', field: 'precio_unitario', align: 'right' },
        { name: 'cantidad', label: 'Cantidad', field: 'cantidad', align: 'right' },
        { name: 'unidad_medida', label: 'Unidad de Medida', field: 'unidad_medida' },
        { name: 'acciones', label: 'Acciones', field: 'acciones', align: 'center' }
      ],
      pagination: { rowsPerPage: 5 },
      confirmDialog: false,
      formattedDate: ''
    };
  },
  watch: {
    'boleta.productos': {
      handler: 'calculateTotal',
      deep: true
    }
  },
  methods: {
    buscarBoleta() {
      axios.get(`/boleta/numero/${this.numeroBoleta}`)
        .then(response => {
          this.boleta = response.data.boleta;
          this.formattedDate = this.boleta.fecha.split('T')[0]; // Formatear la fecha para el input tipo date
          this.calculateTotal();
        })
        .catch(error => {
          console.error('Error fetching boleta:', error);
          this.$q.notify({
            type: 'negative',
            message: 'Boleta no encontrada'
          });
        });
    },
    resetForm() {
      this.numeroBoleta = ''; // Limpiar el número de boleta buscado
      this.boleta = null; // Reiniciar la boleta para que desaparezca de la vista
    },
    confirmSubmit() {
      this.confirmDialog = true;
    },
    submitBoleta() {
      // Validación de productos con precios negativos o cero
      const productosInvalidos = this.boleta.productos.some(producto => {
        return producto.precio_unitario <= 0 || producto.cantidad <= 0;
      });

      if (productosInvalidos) {
        this.$q.notify({
          type: 'negative',
          message: 'Los productos deben tener precios y cantidades mayores a cero.'
        });
        return;
      }

      // Validación de boleta sin productos o con productos incompletos
      if (this.boleta.productos.length === 0 || this.boleta.productos.some(producto => !producto.nombre || producto.nombre.trim() === '')) {
        this.$q.notify({
          type: 'negative',
          message: 'No se puede actualizar la boleta sin productos o con productos incompletos.'
        });
        return;
      }

      axios.put(`/boleta/${this.boleta._id}`, {
        ...this.boleta,
        fecha: new Date(this.formattedDate).toISOString()
      })
        .then(response => {
          this.$q.notify({
            type: 'positive',
            message: response.data.mensaje
          });
          this.resetForm(); // Resetear el formulario de búsqueda después de actualizar la boleta
        })
        .catch(error => {
          this.$q.notify({
            type: 'negative',
            message: error.response.data.message || 'Error al actualizar la boleta.'
          });
        });
    },
    calculateTotal() {
      if (this.boleta) {
        this.boleta.total = this.boleta.productos.reduce((acc, producto) => {
          const precio = parseFloat(producto.precio_unitario) || 0;
          const cantidad = parseFloat(producto.cantidad) || 0;
          return acc + (precio * cantidad);
        }, 0);
      }
    },
    addProducto() {
      this.boleta.productos.push({ nombre: '', precio_unitario: 0, cantidad: 0, unidad_medida: '' });
    },
    removeProducto(producto) {
      this.boleta.productos = this.boleta.productos.filter(p => p !== producto);
      this.calculateTotal();
    },
    handleBlur(props) {
      // No es necesario hacer nada aquí, el @blur se maneja internamente por Quasar
    },
    updateProducto(props) {
      this.calculateTotal(); // Actualizar el total al modificar precio_unitario o cantidad
    }
  }
};
</script>





<style scoped>
.q-page {
    max-width: 600px;
    margin: 0 auto;
}

.input-producto {
    max-width: 120px;
    min-width: 80px;
}
</style>