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
            correo: this.usuario.correo,
            token_access: result.data.logIn.access,
            token_refresh: result.data.logIn.refresh,
          };
          // this.$emit("msjLogInCompletado", dataLogIn);

          console.log("dataLogIn.data.logIn.access", result.data.logIn.access)
          localStorage.setItem("correo", result.data.logIn.correo);
			    localStorage.setItem("token_access", result.data.logIn.token_access);
			    localStorage.setItem("token_refresh", result.data.logIn.token_refresh);

          alert("Inicio de sesion exitoso: " + this.usuario.correo);
          
			// alert("Autenticación Exitosa");
        })
        .catch((error) => {
            console.log(error)
          alert("ERROR 401: Credenciales Incorrectas.");
        });
    },
  },
};
</script>