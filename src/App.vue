<template>
  
  <div id="nav">
    <h1> La nebulosa de Qwerty</h1>
    <router-link to = "/">Home</router-link> |
    <router-link to = "/about">About</router-link> | 
    <router-link to = "/prueba-leccion">Leccion de Prueba </router-link>
  </div>

  <router-view/>
</template>

<script>
import CompLeccion from '@/components/CompLeccion.vue';
export default {
  components: {
    CompLeccion,
  }
}
</script>

<style>
/*@font-face {
  font-family: Autery;
  src: url(../../../fuentes/Autery.ttf) format("truetype");
}
@font-face {
  font-family: Questa Grande;
  src: url(../../fuentes/Questa_Grande_Regular.otf) format("Opentype");
}*/

#app {
  font-family             : Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing  : antialiased;
  -moz-osx-font-smoothing : grayscale;
  text-align              : center;
  color                   : #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  /*font-family:Questa Grande;*/
  font-weight: bold;
  color: #2c3e50;

}

#nav a.router-link-exact-active {
  color: #42b983;
}

h1 {
  text-align: left;
  align-items: justify;
  font-family: Georgia, 'Times New Roman', Times, serif;
}
</style>
