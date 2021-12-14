<template>
  
  <div class="view-inicio-sesion">
    <div class="header">
            Inicia Sesión
        </div><br/>
    <div class="container">
      <img class= "planetas" src= "../../Imagenes/planetas.png">
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

.planetas{
  top: 80pt;
  left:160pt;
  width: 200pt;
  height: 120pt;

}

.view-inicio-sesion {
    text-align: center;
    margin: 100px 0 20px 0;
    display: flex;
    justify-content: center;
    align-items: center;

    flex-direction: column;
    position: relative;
    top: -4.5rem;
    padding-top: 4.5rem;
    margin: 0;
    padding: 0;
    height: calc(100% + 4rem);
    width: 100%;
}

/* .redondeado {
    border-radius: 25px;
    padding: 8px;
    width: 100%;
    font-family: Arial;
    font-size: 25px;
    font-style: italic;
    
    border: 1px solid turquoise;
    background-color: powderblue;
    color: black;
 }

.btnIniciar{
  padding: 8px;
  width: 50%;
  background-color: Rgb(30,174,152);
  color: white;
} */

.header{
    position: relative;
    text-align: center;
    background: transparent;
    font-size: 2rem;
    height: 2rem;
    color: rgb(50,82,136);
    /* top: 0; */
}

.container {
    /* Centra el contenedor*/
    position: static;
    top: 0rem;
    margin-left: auto;
    margin-right: auto;
    /* height: 50vh; */

    /* width: 90vw; */
    
    /* display: flex;
    flex-direction: column; */
    justify-content: center;
    align-items: center;
}

@supports (display: grid) {
    form {
        display: grid;
        grid-template-columns: repeat(1, 24rem);
        /* grid-row: 1/2; */
        /* grid-gap: 0.3rem; */
        grid-auto-rows: minmax(3rem, auto);
    }
    .view-perfil {
        display: grid;

    }
}

label {
    /* Necesario para poderle dar un width, porque de lo contrario el label es un inline-element */
    display: inline-block; 
    font-family: Questa Grande;
    font-size: 1.1rem;
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
    font-size: 1.1rem;
}

td {
    text-align: center;
}

button {
    width: 8rem;
    height: 3rem;

    color: #E5E7E9;
    background: rgb(50,82,136);
    border: 1px solid #E5E7E9;

    border-radius: 5px;
    align-content: center;

    font-family: Questa Grande;
    font-size: 1rem;
}

button:hover{
    color: #E5E7E9;
    background: turquoise;
    border: 1px solid turquoise;
}
</style>