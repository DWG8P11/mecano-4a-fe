<template>
  <div class="view-inicio-sesion">
    <h2>Iniciar sesión</h2>

    <form v-on:submit.prevent="procesarInicioSesion">
      <input type="text" v-model="usuario.correo" placeholder="Correo" />
      <br />
      <input type="password" v-model="usuario.password" placeholder="Contraseña" />
      <br />
      <button type="submit">Iniciar Sesión</button>
    </form>
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
.view-inicio-sesion{
  margin: 5rem;
}
</style>