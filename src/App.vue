<template>
  <div id="app" class="app">
    <title>La nebulosa de Qwerty</title>
    <meta name="viewport" content="width=device-width,initial-scale=1" />

    <div class="header">
      <div class="headcontainer titulo-nav-contenedorBoton">
        <div class="titulo">
          <h1>La nebulosa<br />&nbsp;de Qwerty</h1>
        </div>
        <div class="nav">
          <router-link to="/">Inicio | </router-link>
          <keep-alive>
            <router-link to="/lista-niveles" v-if="estaAutenticado"> Aprende | </router-link>
          </keep-alive>
          <router-link to="/registro-cuenta" v-if="!estaAutenticado">Únete | </router-link>
          <!-- <router-link to="/designs"> diseño teclado </router-link> -->
          <router-link to="/aprende/leccionDB/61ae3051f4a898570c2f303c">Lección de Prueba | </router-link>
          <router-link to="/lista-niveles-adm" v-if="estaAutenticado"> Crear Niveles | </router-link>
          <router-link to="/lista-lecciones-adm" v-if="estaAutenticado"> Crear Lecciones  </router-link>
          <router-link to="/perfil" v-if="estaAutenticado">| Perfil </router-link>
        </div>
        
        
        <div class="contenedorBoton">
          <span v-if="estaAutenticado">{{ darNombreUsuario() }}</span>
          <input type="checkbox" id="toggleLog" />
          <label for="toggleLog" class="buttonLoginOut"></label>

          <nav class="navLog">
            <router-link
              to="/iniciar-sesion"
              id="Abrir sesión"
              v-if="!estaAutenticado"
              >*Inicia Sesión</router-link
            >
            <button 
              to="/" 
              id="Cerrar sesión" 
              v-if="estaAutenticado"
              v-on:click="cerrarSesion"
              >*Cierra Sesión</button
            >
          </nav>
        </div>

      </div>
    </div>
    <div class="content">
      <!-- Lo que carga los contenidos de los router links: -->
      <router-view v-on:msjLogInCompletado="completarLogIn"/>
    </div>

    <br />

    <footer>
      <h3>La nebulosa de Qwerty</h3>
    </footer>
  </div>
</template>

<script>
import CompLeccion      from '@/components/CompLeccion.vue';
import Designs          from '@/components/Designs.vue';
import LocalFingers     from '@/components/LocalFingers.vue';

import gql              from "graphql-tag"
import jwt_decode       from 'jwt-decode';

import sePudoAutenticar from "@/SePuedeAutenticar";

export default {
  components: {
    CompLeccion,
    Designs,
    LocalFingers,
  },

  computed: {
    estaAutenticado: function(){
      // sePudoAutenticar(this.$apollo) // Actualizar la variable en local storage... OJO: la actualización puede no ocurrir para el momento en que la siguiente línea se ejecute
      console.log("Se evalue la computed prop estaAutenticado a", localStorage.getItem("estaAutenticado") == true, "y en el localStorage vale", localStorage.getItem("estaAutenticado"))
      return localStorage.getItem("estaAutenticado") == true;
    }
  },

  // computed: {
  //   /*
  //    * Variables que se van a reevaluar frecuentemente
  //    */
  //   estaAutenticado: {
  //     get: function () {
  //       console.log("Esta calculando estaAutenticado", localStorage.getItem("token_access") != null || localStorage.getItem("token_access") != undefined)
  //       return localStorage.getItem("token_access") != null || localStorage.getItem("token_access") != undefined;
  //     },
  //     set: function () {},
  //   },
  // },
  created: function() {
    this.tocarMicroservicios();
    this.actualizarAutenticacion();
  },

  beforeUpdate: function() {
    console.log("Antes de actualizar App, estaAutenticado vale", this.estaAutenticado);
    this.actualizarAutenticacion();
  },

  methods: {
    tocarMicroservicios: function() {
      this.$apollo.query({
        query: gql`
        query Query {
          tocarMicroServicios
        }`
      }).then(respuesta => console.log("Microservicios tocados", respuesta)).catch(error => console.log("Error.", error))
    },

    completarLogIn: function (data) {
      console.log("Se recibio mensaje de inicio de sesion");
      localStorage.setItem("usuario", data.usuario);
      localStorage.setItem("correo", data.correo);
      localStorage.setItem("es_administrador", data.es_administrador);
      localStorage.setItem("token_access", data.token_access);
      localStorage.setItem("token_refresh", data.token_refresh);
      localStorage.setItem("estaAutenticado", true);
      console.log("Se hicieron los cambios permitentes en el localStorage para asegurar que la persona esta autenticada");
      this.$forceUpdate();
      this.$router.push({name: "Home"});
      alert(`¡Bienvenid@ ${data.usuario}!`);
    },

    darNombreUsuario: function () {
      return localStorage.getItem("usuario");
    },

    cerrarSesion: function() {
      console.log("Cerrando sesion");
      localStorage.clear();
      alert("Cerraste sesión");
      this.$router.push({name: "Home"});
      this.$forceUpdate();
    },

    actualizarAutenticacion: function() {
      console.log("Se entro a actualizarAutenticacion en App");
      sePudoAutenticar(this.$apollo);
      console.log("Al hacer la verificacion en App se concluyo que estaAutenticado vale", this.estaAutenticado)
      // console.log(rta);
    }
  },
};
</script>

<style>
@font-face {
  font-family: Autery;
  src: url(../fuentes/Autery.ttf) format("truetype");
}
@font-face {
  font-family: Questa Grande;
  src: url(../fuentes/Questa_Grande_Regular.otf) format("Opentype");
}

.header {
  background: black;
  padding: 0rem 0;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  height: 0pt;
  z-index: 100;
}

.titulo-nav-contenedorBoton{
  display: flex;
  justify-content: space-between;
  justify-items: auto;
}

.nav {
  z-index: 400;
  padding: 10px;
  background: transparent;
  height: 10pt;
  position: absolute;
  right: 60pt;
  top: 20pt;
}

.nav a {
  font-family: Questa Grande;
  font-weight: bold;
  font-size: 10pt;
  color: white;
  text-shadow: black 0.1em 0.1em 0.2em;
}

.nav a.router-link-exact-active {
  color: turquoise;
}

body{
  margin: 0;
}
</style>

<style scoped>

.content{
  position: relative;
  width: calc(100vw - 0.5rem);
  left: 0;
  height: calc(100vh + 0.5rem - 3.15rem - 8.5rem);
  padding-top: 8.5rem;
}

h1 {
  text-align: left;
  align-items: justify;
  font-family:Autery;
  font-size: 2.5rem;
  color:white;
  margin-top:1.6666rem;
  margin-left:0.83333rem;
  text-shadow: black 0.1em 0.1em 0.2em;
}

/*Botón login y signup*/

.buttonlogout,
.buttonLoginOut,
.navLog {
  position: absolute;
  top: 20pt;
  right: -25pt;
}

.buttonlogout {
  margin: auto;
  top: 1pt;
  left: 80%;
}

.navLog {
  opacity: 0;
  transition: all 1s ease-in-out;
}

.navLog a {
  margin-top: 40pt;
  margin-right: 30pt;
  text-align: center;
  line-height: 0;
  display: block;
  color: white;
  text-decoration: none;
  font-family: Questa Grande;
  font-size: 8pt;
  text-transform: uppercase;
  transition: all 300ms;
  padding: 0;
  text-shadow: black 0.1em 0.1em 0.2em;
}

#toggleLog {
  display: none;
}

#toggleLog:checked ~ .navLog {
  opacity: 1;
  transform: translateY(10%);
}
#toggleLog:checked ~ .buttonLoginOut {
  transform: rotate(270deg);
  box-shadow: 0 0 0 0 transparent;
}

.buttonLoginOut {
  z-index: 999;
  width: 40px;
  height: 40px;
  background: turquoise;
  background-image: url(../Imagenes/cohete.gif);
  background-repeat: no-repeat;
  background-size: 200%;
  background-position: center;
  border-radius: 100%;
  cursor: pointer;
  margin-top: 5pt;
  margin-right: 50pt;
  transition: all 1s ease-in-out;
}

/*Estilo footer*/
footer {
  display: flex;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 3.15rem;
  left: 0;
  background-color: black;
  justify-content: space-between;
  justify-items: auto;
}

footer h3 {
  margin-top: 20pt;
  margin-left: 10pt;
  font-family: Questa Grande;
  color: white;
  text-align: center;
  line-height: 0em;
}
</style>

