<template>
  
  <div class="view-inicio-sesion">
    <div class="container">
    <form v-on:submit.prevent="procesarInicioSesion">
      <input class="redondeado" type="text" v-model="usuario.correo" placeholder="Correo" />
      <br/>
              <img class= "planetas" src= "../../Imagenes/planetas.png">  
      <br>
      <input class="redondeado" type="password" v-model="usuario.password" placeholder="Contraseña" />
      <br/>
      <br>
      <button class="btnIniciar" type="submit">Iniciar Sesión</button>
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

}

.redondeado {
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
}

</style>