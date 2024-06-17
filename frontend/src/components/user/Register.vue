<template>
  <div class="q-pa-md" style="max-width: 400px">
    <h1> Registrar Usuario</h1>
    <q-form
      @submit="register"
      class="q-gutter-md"
    >
      <q-input
        filled
        v-model="user.rut_usuario"
        label="RUT *"
        hint="RUT"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please enter RUT']"
      />

      <q-input
        filled
        v-model="user.nombre_usuario"
        label="Nombre *"
        hint="Nombre"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please enter Nombre']"
      />

      <q-input
        filled
        v-model="user.apellido"
        label="Apellido *"
        hint="Apellido"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please enter Apellido']"
      />

      <q-input
        filled
        v-model="user.fono"
        label="Fono *"
        hint="Fono"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please enter Fono']"
      />

      <q-input
        filled
        v-model="user.correo"
        label="Correo *"
        hint="Correo"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please enter Correo']"
      />

      <q-input
        filled
        v-model="user.rol"
        label="Rol *"
        hint="Rol"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please enter Rol']"
      />

      <q-input
        filled
        type="password"
        v-model="user.contrasenia"
        label="Contraseña *"
        hint="Contraseña"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please enter Contraseña']"
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
    const user = ref({
      rut_usuario: "",
      nombre_usuario: "",
      apellido: "",
      contrasenia: "",
      fono: "",
      correo: "",
      rol: ""
    });
    const message = ref("");

    const register = async () => {
      try {
        const response = await axios.post("/usuario", user.value);
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
      user,
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
  font-size: 3.5em;
  line-height: 1.1;
  font-weight: 700;
  padding: 10px;
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