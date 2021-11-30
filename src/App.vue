<template>
  <div id="app" class="app">
    <title>La nebulosa de Qwerty</title>
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    

    <div class = header>
       <div class="headcontainer titulo-nav-contenedorBoton">
         <div class="titulo">
            <h1>La nebulosa<br />&nbsp;de Qwerty</h1>

          <div class= "nav">
            <router-link to = "/">Inicio</router-link> |
            <router-link to = "/prueba-leccion">Aprende</router-link> |
            <router-link to = "/login">Únete</router-link> | 
            <!-- <router-link to="/designs"> diseño teclado </router-link> -->
          </div>

          <div class="contenedorBoton">
            <input type="checkbox" id="toggleLog" />
            <label for="toggleLog" class="buttonLoginOut"></label>

            <nav class="navLog">
              <router-link to="/Login" id="Abrir sesión">*Inicia Sesión</router-link>
              <router-link to="/Home" id="Cerrar sesión">*Cierra Sesión</router-link>
            </nav>
          </div>
          </div>
      </div>
    </div>
     <div class="content">
      <!--<router-view
        v-on:UserLoginSuccesful="methodUserLogin"
        v-on:completedSignUp="methodSignup"
     
      /> -->
    </div>

    <br />

    <footer>
      <h3>La nebulosa de Qwerty</h3>
    </footer>


  <router-view/>
  </div>
</template>

<script>
import CompLeccion from '@/components/CompLeccion.vue';
import Designs from '@/components/Designs.vue';
export default {
  components: {
    CompLeccion,
    Designs,
  }
}
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


/*#app {
  font-family             : Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing  : antialiased;
  -moz-osx-font-smoothing : grayscale;
  text-align              : center;
  color                   : #2c3e50;
}*/


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
  padding: 10px;
  background: transparent;
  height: 10pt;
  position:absolute;
  right: 60pt;
  top:20pt;
  
}

.nav a {
  font-family:Questa Grande;
  font-weight: bold;
  font-size:10pt;
  color:white;

}

.nav a.router-link-exact-active {
  color:turquoise;
}

</style>

<style scoped>
h1 {
  text-align: left;
  align-items: justify;
  font-family:Autery;
  font-size: 22pt;
  color:white;
  margin-top:17pt;
  margin-left:10pt;
}

/*Botón login y signup*/

.buttonlogout,
.buttonLoginOut,
.navLog{
  position: absolute;
  top:20pt;
  right:-25pt;
}

.buttonlogout{
  margin:auto;
  top:1pt;
  left:80%;
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
}

#toggleLog{
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

.buttonLoginOut{
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
  height: 50px;
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

