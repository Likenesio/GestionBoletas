<template>
  <div class="q-pa-md">
    <q-layout view="lHh Lpr lff" container style="height: 100vh" class="shadow-2 rounded-borders">
      <q-header elevated style="background-color: #355e3b">
        <q-toolbar>
          <q-toolbar-title>Nutriver</q-toolbar-title>
          <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
        </q-toolbar>
      </q-header>

      <q-drawer v-model="drawer" show-if-above :width="200" :breakpoint="400">
        <q-scroll-area style="
            height: calc(100% - 150px);
            margin-top: 150px;
            border-right: 1px solid #ddd;
          ">
          <q-list id="list">
            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="person" />
              </q-item-section>
              <q-item-section>
                <div class="q-pa-sm">
                  <q-btn-dropdown class="dropdown" color="light-green-9" label="Usuario">
                    <q-list>
                      <q-item clickable v-close-popup @click="onItemClick('/dashboard/register')">
                        <q-item-section>
                          <q-item-label>Agregar Usuario</q-item-label>
                        </q-item-section>
                      </q-item>

                      <q-item clickable v-close-popup @click="onItemClick('/dashboard/userslist')">
                        <q-item-section>
                          <q-item-label>Listar Usuario</q-item-label>
                        </q-item-section>
                      </q-item>

                      <q-item clickable v-close-popup @click="onItemClick('/dashboard/update')">
                        <q-item-section>
                          <q-item-label>Actualizar Usuario</q-item-label>
                        </q-item-section>
                      </q-item>
                    </q-list>
                  </q-btn-dropdown>
                </div>
              </q-item-section>
            </q-item>

            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="business" />
              </q-item-section>
              <q-item-section>
                <div class="q-pa-sm">
                  <q-btn-dropdown class="dropdown" color="light-green-9" label="Proveedor">
                    <q-list>
                      <q-item clickable v-close-popup @click="onItemClick('/dashboard/register-proveedor')">
                        <q-item-section>
                          <q-item-label>Agregar Proveedor</q-item-label>
                        </q-item-section>
                      </q-item>

                      <q-item clickable v-close-popup @click="onItemClick('/dashboard/proveedor-list')">
                        <q-item-section>
                          <q-item-label>Listar Proveedor</q-item-label>
                        </q-item-section>
                      </q-item>

                      <q-item clickable v-close-popup @click="onItemClick('/dashboard/update-proveedor')">
                        <q-item-section>
                          <q-item-label>Actualizar Proveedor</q-item-label>
                        </q-item-section>
                      </q-item>
                    </q-list>
                  </q-btn-dropdown>
                </div>
              </q-item-section>
            </q-item>

            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="receipt" />
              </q-item-section>
              <q-item-section>
                <div class="q-pa-sm">
                  <q-btn-dropdown class="dropdown" color="light-green-9" label="Boleta">
                    <q-list>
                      <q-item clickable v-close-popup @click="onItemClick('/dashboard/register-boleta')">
                        <q-item-section>
                          <q-item-label>Agregar Boleta</q-item-label>
                        </q-item-section>
                      </q-item>

                      <q-item clickable v-close-popup @click="onItemClick('/dashboard/boleta-list')">
                        <q-item-section>
                          <q-item-label>Listar Boleta</q-item-label>
                        </q-item-section>
                      </q-item>

                      <q-item clickable v-close-popup @click="onItemClick('/dashboard/update-boleta')">
                        <q-item-section>
                          <q-item-label>Actualizar Boleta</q-item-label>
                        </q-item-section>
                      </q-item>
                    </q-list>
                  </q-btn-dropdown>
                </div>
              </q-item-section>
            </q-item>

            <q-item clickable v-ripple>

              <q-item-section avatar>
                <q-icon name="power_settings_new" />
              </q-item-section>
              <div class="q-pa-sm">
                <q-btn class="dropdown" @click="logout" color="red-10" text-color="white" label="Salir"></q-btn>
              </div>
            </q-item>
          </q-list>
        </q-scroll-area>

        <q-img class="absolute-top" style="height: 150px; background-color: #355e3b">
          <div class="absolute-bottom bg-transparent">
            <q-avatar size="56px" class="q-mb-sm">
              <img src="../../assets/images/batman_hero.webp" />
            </q-avatar>
            <div class="text-weight-bold">{{ nombre }} {{ apellido }}</div>
            <div>@{{ rol }}</div>
          </div>
        </q-img>
      </q-drawer>

      <q-page-container>
        <q-page padding>
          <router-view />
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from 'vue-router';

export default {
  setup() {
    const drawer = ref(false);
    const router = useRouter();

    const navigateTo = (path) => {
      router.push(path);
    };

    const onItemClick = (path) => {
      navigateTo(path);
    };

    return {
      drawer,
      onItemClick
    };
  },
  created() {
    this.checkAuth();
  },
  methods: {
    checkAuth() {
      const token = localStorage.getItem("token");
      if (token) {
        const decoded = JSON.parse(atob(token.split(".")[1]));
        this.userId = decoded.userId;
        this.rol = decoded.rol;
        this.nombre = decoded.nombre;
        this.apellido = decoded.apellido;
        this.isAuthenticated = true;
        this.$router.push("/dashboard"); // Redirigir al dashboard si está autenticado
      } else {
        this.$router.push("/login"); // Redirigir a login si no está autenticado
      }
    },
    logout() {
      localStorage.removeItem("token");
      this.isAuthenticated = false;
      this.userId = null;
      this.$router.push("/login"); // Redirigir a login después de cerrar sesión
    },
  },
};
</script>

<style>
#list {
  margin-top: 30px;
}

.dropdown {
  width: 110px;
}
</style>