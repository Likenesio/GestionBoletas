<template>
    <div>
      <form @submit.prevent="submitBoleta">
        <div>
          <label for="numero">Número:</label>
          <input type="number" v-model="numero" required />
        </div>
        <div>
          <label for="fecha">Fecha:</label>
          <input type="date" v-model="fecha" required />
        </div>
        <div>
          <label for="proveedor">Proveedor:</label>
          <select v-model="proveedor" required>
            <option v-for="prov in proveedores" :key="prov._id" :value="prov._id">{{ prov.nombre }}</option>
          </select>
        </div>
        <div>
          <label>Productos:</label>
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Precio Unitario</th>
                <th>Cantidad</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(producto, index) in productos" :key="index">
                <td><input type="text" v-model="producto.nombre" required /></td>
                <td><input type="number" v-model="producto.precio_unitario" required /></td>
                <td><input type="number" v-model="producto.cantidad" required /></td>
                <td><button @click="removeProducto(index)">Eliminar</button></td>
              </tr>
            </tbody>
          </table>
          <button @click="addProducto">Agregar Producto</button>
        </div>
        <button type="submit">Crear Boleta</button>
      </form>
    </div>
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
      proveedores: []
    };
  },
  created() {
    this.fetchProveedores();
  },
  methods: {
    async fetchProveedores() {
      try {
        const response = await axios.get('/proveedor');
        console.log(response)
        this.proveedores = response.data.proveedor;
        console.log(this.proveedores)
      } catch (error) {
        console.error('Error fetching proveedores:', error);
      }
    },
    addProducto() {
      this.productos.push({ nombre: '', precio_unitario: '', cantidad: 1 });
    },
    removeProducto(index) {
      this.productos.splice(index, 1);
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
