<template>
  <q-layout view="hHh Lpr fFf">
    <q-page-container>
      <q-page class="login-page">
        <q-card class="login-card">
          <q-card-section>
            <q-card-title class="text-h4">Iniciar Sesión</q-card-title>
            <q-form @submit="login">
              <q-input v-model="correo" type="email" label="Correo" dense outlined />
              <q-input style="margin-top: 5px;" v-model="contrasenia" type="password" label="Contraseña" dense outlined />
              <q-btn type="submit" color="green-10" label="Iniciar Sesión" class="q-mt-md" />
            </q-form>
            <q-space />
            <div v-if="message" class="text-negative">{{ message }}</div>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>

  </q-layout>
</template>

<script>
import axios from '../axios';

export default {
  data() {
    return {
      correo: '',
      contrasenia: '',
      message: ''
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('/usuario/login', {
          correo: this.correo,
          contrasenia: this.contrasenia
        });
        const token = response.data.token;
        localStorage.setItem('token', token);
        this.$router.push('/dashboard');
        this.$root.isAuthenticated = true;
        this.$root.userId = JSON.parse(atob(token.split('.')[1])).userId;
      } catch (error) {
        if (error.response && error.response.status === 401) {
          this.showMessage('Credenciales incorrectas');
        } else {
          this.showMessage('Error al iniciar sesión');
        }
      }
    },
    showMessage(message) {
      this.$q.notify({
        color: 'negative',
        position: 'top',
        message: message,
        icon: 'report_problem'
      });
    }
  }
};
</script>

<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.login-card {
  max-width: 500px;
  width: 100%;
}

.text-h4 {
  font-size: 1.875rem; /* 30px */
  line-height: 1.33;
  margin-bottom: 1rem;
  font-weight: 700;
}

.q-mt-md {
  margin-top: 1.5rem; /* 24px */
}

.text-negative {
  color: red;
}
</style>
