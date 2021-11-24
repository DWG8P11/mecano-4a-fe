<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> | 
    <router-link to="/prueba-leccion">Leccion de Prueba </router-link>| 
    <router-link to="/desings"> diseño teclado </router-link>|
    <router-link to="/desing"> diseño teclado 2 </router-link>
  </div>

  <router-view/>
</template>

<script>
import CompLeccion from '@/components/CompLeccion.vue';
import Desings from '@/components/Desings.vue';
import Desing from '@/components/Desing.vue';
export default {
  components: {
    CompLeccion,
    Desings,
    Desing,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
