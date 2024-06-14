<template>
    <div class="q-pa-md" style="max-width: 400px">
      <h1> Registrar Proveedor</h1>
      <q-form
        @submit="register"
        class="q-gutter-md"
      >
        <q-input
          filled
          v-model="proveedor.rut"
          label="RUT *"
          hint="RUT"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please enter RUT']"
        />
  
        <q-input
          filled
          v-model="proveedor.nombre"
          label="Nombre *"
          hint="Nombre"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please enter Nombre']"
        />
  
        <q-input
          filled
          v-model="proveedor.direccion"
          label="Dirección*"
          hint="Dirección"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please enter Apellido']"
        />
        <div>
          <q-btn label="Registrar" type="submit" color="green-10" />
        </div>
      </q-form>
  
      <div v-if="message" class="q-mt-md">
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import axios from "../../axios";
  import { useQuasar } from 'quasar';
  
  export default {
    setup() {
      const $q = useQuasar();
      const proveedor = ref({
        rut: "",
        nombre: "",
        direccion: "",
      });
      const message = ref("");
  
      const register = async () => {
        try {
          const response = await axios.post("/proveedor", proveedor.value);
          message.value = response.data.message;
          $q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'cloud_done',
            message: 'User registered successfully'
          });
        } catch (error) {
          message.value = error.response.data.message || "Error al registrar usuario";
          $q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'warning',
            message: 'Error registering user'
          });
        }
      };
  
      return {
        proveedor,
        message,
        register
      };
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
  .q-pa-md {
    max-width: 600px;
    margin: auto;
  }
  .q-banner {
    border-radius: 8px;
    padding: 10px;
  }
  </style>