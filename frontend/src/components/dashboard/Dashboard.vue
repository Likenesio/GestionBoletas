<template>
  <div class="q-pa-md">
    <q-layout view="lHh Lpr lff" container style="height: 100vh" class="shadow-2 rounded-borders">
      <q-header elevated style="background-color: #355E3B;">
        <q-toolbar>
          <q-toolbar-title>Nutriver</q-toolbar-title>
          <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
        </q-toolbar>
      </q-header>

      <q-drawer
        v-model="drawer"
        show-if-above
        :width="200"
        :breakpoint="400"
      >
      <!-- Manejar las rutas a los distintos componentes -->
        <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">
          <q-list padding>
            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="inbox" />
              </q-item-section>

              <q-item-section>
                Registrar
              </q-item-section>
            </q-item>

            <q-item active clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="star" />
              </q-item-section>

              <q-item-section>
                Listar
              </q-item-section>
            </q-item>

            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="send" />
              </q-item-section>

              <q-item-section>
                Actualizar
              </q-item-section>
            </q-item>

            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="eva-" />
              </q-item-section>

              <q-item-section>
                Cambiar Contraseña
              </q-item-section>
            </q-item>

            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="eva-" />
              </q-item-section>
              <button @click="logout">Cerrar Sesión</button> 
              <q-item-section>
                
              </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>

        <q-img class="absolute-top"  style="height: 150px; background-color: #355E3B;">
          <div class="absolute-bottom bg-transparent">
            <q-avatar size="56px" class="q-mb-sm">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png">
            </q-avatar>
            <div class="text-weight-bold">Pablo González</div>
            <div>@user</div>
          </div>
        </q-img>
      </q-drawer>

      <q-page-container>
        <q-page padding>
          <p v-for="n in 15" :key="n">
            <!-- Renderizar aquí el contenido de los componentes -->
          </p>
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup () {
    return {
      drawer: ref(false),
      userId: null,
      isAuthenticated: false
    }
  },
  created() {
    this.checkAuth();
  },
  methods: {
    checkAuth() {
      const token = localStorage.getItem('token');
      if (token) {
        const decoded = JSON.parse(atob(token.split('.')[1]));
        this.userId = decoded.userId;
        this.isAuthenticated = true;
        this.$router.push('/dashboard'); // Redirigir al dashboard si está autenticado
      } else {
        this.$router.push('/login'); // Redirigir a login si no está autenticado
      }
    },
    logout() {
      localStorage.removeItem('token');
      this.isAuthenticated = false;
      this.userId = null;
      this.$router.push('/login'); // Redirigir a login después de cerrar sesión
    }
  }
}
</script>
