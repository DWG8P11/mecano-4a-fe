<template>
  
  <div class="view-inicio-sesion">
    
    <div class="header">
            Inicia Sesión
                <img class="icono-tele"  src="../../Imagenes/otrosIconos/tele.svg"/>
            
                <img class="estrellitas" src="../../Imagenes/otrosIconos/estrellasypuntitos.svg"/>
            

        </div><br/>
    <div class="container">
      <!--img class= "planetas" src= "../../Imagenes/planetas.png"-->
    <form v-on:submit.prevent="procesarInicioSesion">
      <label for="correo">Correo </label>
      <input class="redondeado" type="text" v-model="usuario.correo" placeholder="Correo" id="correo"/>
      <br/>
                
      <br>
      <label for="contraseña">Contraseña </label>
      <input class="redondeado" type="password" v-model="usuario.password" placeholder="Contraseña" id="contraseña"/>
      <br/>
      <br>
      <div class="contenedor-botones">
        <button class="btnIniciar" type="submit">Iniciar Sesión</button>
        <button class="btnRegistrar" type="button" v-on:click="$router.push({name: '/registro-cuenta'})">Únete</button>
      </div>
    </form>
    </div>
    <img class= "escafandra-solar" src= "../../Imagenes/escafandra.svg">  
  </div>
</template>

<script>
import gql from "graphql-tag";
import jwt_decode from "jwt-decode";

export default {
  name: "ViewInicioSesion",
  data: function () {
    return {
      usuario: {
        correo: "",
        password: "",
      },
    };
  },
  methods: {
    procesarInicioSesion: async function () {
      await this.$apollo
        .mutate({
          mutation: gql`
            mutation LogIn($credenciales: CredencialesIn!) {
              logIn(credenciales: $credenciales) {
                refresh
                access
              }
            }
          `,
          variables: {
            credenciales: this.usuario,
          },
        })
        .then((result) => {
          let dataLogIn = {
            token_access: result.data.logIn.access,
            token_refresh: result.data.logIn.refresh,
            usuario: jwt_decode(result.data.logIn.access).usuario,
            correo: this.usuario.correo,
            es_administrador: jwt_decode(result.data.logIn.access).es_administrador,
          };
          
          console.log("Se emitira el mensaje a App para completar el inicio de sesion");
          this.$emit("msjLogInCompletado", dataLogIn);

          
			// alert("Autenticación Exitosa");
        })
        .catch((error) => {
          alert("Error realizando la autenticacion:", error);
        });
    },
  },
};
</script>

<style scoped>



.view-inicio-sesion {
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url(../../Imagenes/pexels.jpg);
    background-size: cover;
    flex-direction: column;
    position: relative;
    top: -8.5rem;
    margin: -8px;
    padding: 0;
    height: 100vh;
}


.header{
    position: relative;
    text-align: center;
    background: transparent;
    font-size: 2rem;
    height: 2rem;
    color:white;
    top: 6rem;
    /* top: 0; */
}

.icono-tele{
    position:absolute;
    top:-10pt;
    left:-100pt;
    width: 150pt; 


}
            
.estrellitas{
    position:absolute;
    top:-70pt;
    left:-100pt;
    width: 150pt; 

}
            

.container {
    /* Centra el contenedor*/
    position: relative;
    top: 8rem;
    margin-left: auto;
    margin-right: auto; 

  
    justify-content: center;
    align-items: center;
}

@supports (display: grid) {
    form {
        display: grid;
        grid-template-columns: repeat(1, 24rem);
        /* grid-row: 1/2; */
        /* grid-gap: 0.3rem; */
        grid-auto-rows: minmax(2rem, auto);
    }
}

label {
    /* Necesario para poderle dar un width, porque de lo contrario el label es un inline-element */
    display: inline-block; 
    font-family: Questa Grande;
    font-size: 1.1rem;
    color:white;
   
}

input{
    display: inline-block;
    flex-direction: row;
    min-width: 20rem;
    height: 3rem;

    box-sizing: border-box;
    padding: 10pt 20pt;
    margin: auto;

    border: 1px solid rgb(217,217,217);
    border-radius: 30px;
    font-family: Questa Grande;
    text-shadow:black 0.1em 0.1em 0.2em;
    font-size: 1.1rem;
    background-color: transparent;
    box-shadow: 0 0 10px rgb(235, 245, 239)
    
}

td {
    text-align: center;
}

.contenedor-botones {
    display: flex;
    justify-content: center;
}

button {
    width: 8rem;
    height: 2.3rem;
    color: #E5E7E9;
    background: turquoise;
    border:none;
    box-shadow: 1px 1px 1px 1px rgb(248, 252, 252);
    border-radius: 26px;
    align-content: center; 
    font-family: Questa Grande;
    font-size: 1rem;
    margin:0.3rem;
}

button:hover{
    color: #E5E7E9;
    background: rgb(30, 212, 185);
    
}

.escafandra-solar{
  position: relative;
  width:300pt;
  left:295pt;
  bottom:130pt;
 
}


</style>