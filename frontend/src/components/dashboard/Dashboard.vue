<template>
    <nav>
      <div class="link-container">
          <router-link to="/register">Registrar</router-link>
          <router-link to="/userslist">Listar Usuarios</router-link>
          <router-link to="/update">Actualizar Usuario</router-link>
          <router-link to="/delete">Eliminar Usuario</router-link>
          <router-link :to="`/change-password/${userId}`">Cambiar Contraseña</router-link>
      </div>
      <div>
          <button @click="logout">Cerrar Sesión</button>
      </div>
    </nav>
</template>
<script>
</script> 
<style scoped>
nav {
  display: flex;
  gap: 20px;
  justify-content:flex-end;
  align-items: center;
}
.link-container{
 display: flex;
 flex-direction: row;
 flex-wrap: wrap;
 align-items: baseline;
 gap:20px;
}
</style>