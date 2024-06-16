<template>
    <div id="user-management" class="q-pa-md">
      <h1>Actualizar Proveedor</h1>
      <div>
        <q-btn-dropdown color="pink" label="Seleccionar Proveedor" dropdown-icon="arrow_drop_down">
          <q-list>
            <q-item 
              v-for="proveedor in proveedores" 
              :key="proveedor._id" 
              clickable 
              v-close-popup 
              @click="selectProveedor(proveedor)"
            >
              <q-item-section>
                <q-item-label>{{ proveedor.nombre}}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </div>
      <div class="mg-t" v-if="selectedProveedor">
        <q-form @submit.prevent="updateProveedor" class="q-gutter-md">
          <q-input
            filled
            v-model="selectedProveedor.rut"
            label="RUT"
            lazy-rules
            :rules="[ val => !!val || 'Este campo es requerido']"
            disabled
          />
          <q-input
            filled
            v-model="selectedProveedor.nombre"
            label="Nombre"
            lazy-rules
            :rules="[ val => !!val || 'Este campo es requerido']"
          />
          <q-input
            filled
            v-model="selectedProveedor.direccion"
            label="Apellido"
            lazy-rules
            :rules="[ val => !!val || 'Este campo es requerido']"
          />
          <q-btn label="Actualizar" type="submit" color="green-10" />
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
      const proveedores = ref([]);
      const selectedProveedorId = ref('');
      const selectedProveedor = ref(null);
  
      const fetchProveedor = async () => {
        try {
          const response = await axios.get('/proveedor'); 
          console.log(response);
          proveedores.value = response.data.proveedor;
          console.log(proveedores);
        } catch (error) {
          console.error('Error fetching proveedores:', error);
          $q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'warning',
            message: 'Error al obtener los proveedores'
          });
        }
      };
  
      const selectProveedor = (proveedor) => {
        selectedProveedor.value = proveedor;
      };
  
      const updateProveedor = async () => {
        try {
          const updatedProveedor = {
            rut: selectedProveedor.value.rut,
            nombre: selectedProveedor.value.nombre,
            direccion: selectedProveedor.value.direccion,
          };
          
          // Enviar datos de actualización al servidor
          const response = await axios.put(`/proveedor/${selectedProveedor.value._id}`, updatedProveedor);
          $q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'cloud_done',
            message: 'Se han actualizado los datos exitosamente'
          });
          
          // Actualizar la lista de usuarios con los datos actualizados
          fetchProveedor();
          selectedProveedor.value = null;
        } catch (error) {
          console.error('Error updating proveedor:', error);
          $q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'warning',
            message: 'Error al actualizar el proveedor'
          });
        }
      };
  
      fetchProveedor();
  
      return {
        proveedores,
        selectedProveedorId,
        selectedProveedor,
        fetchProveedor,
        selectProveedor,
        updateProveedor,
      };
    },
  };
  </script>
  
  <style>
  /* Añadir algunos estilos básicos */
  *{
    box-sizing: border-box;
  }
  #user-management {
    max-width: 600px;
    margin: 0 auto;
  }
  h1 {
    font-size: 3em;
    line-height: 1.1;
    font-weight: 700;
  }
  form {
    margin-top: 20px;
  }
  .mg-t{
    margin-top: 40px;
  }
  </style>
  