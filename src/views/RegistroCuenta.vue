<template>

    <div class="signUp_user">
      
        <div class="container_signUp_user">
            <center>  <h2>Registro</h2> </center>

            <form v-on:submit.prevent="processSignUp" >
                
                <input type="text" v-model="users.nombre" placeholder="Nombre">
                <br>

                <input type="text" v-model="users.usuario" placeholder="Usuario">
                <br>

                <input type="text" v-model="users.correo" placeholder="Correo">
                <br>
                
                <input type="number" v-model="users.telefono" placeholder="Telefono">
                <br>

                <input type="text" v-model="users.pais" placeholder="Pais">
                <br>

                <input type="text" v-model="users.departamento" placeholder="Departamento">
                <br>

                <input type="text" v-model="users.ciudad" placeholder="Ciudad">
                <br>      

                <input type="password" v-model="users.password" placeholder="Contraseña">
                <br> 
                
                <h4><input type="checkbox" v-model="users.is_staff" placeholder="Eres administrador"> Administrador </h4>
                <br> 
            
                <button type="submit">Registrarse</button>
            </form>
        </div>

    </div>

</template>

<script>
import gql from "graphql-tag";

export default {
    name: "user",

    data: function() {
        return {
        users: {
            nombre: null,
            usuario: null,
            correo: null,
            telefono: 0,
            pais: null,
            departamento: null,
            ciudad: null,
            password: null,
            is_staff: false,
         },
        };
},

methods: {
    processSignUp: async function() {
        await this.$apollo
        .mutate({
            mutation: gql`
            mutation($registroInput : UsuarioIn!) {
                registrarUsuario(registroInput:$registroInput) {
                  refresh
                  access
                }
            }
            `,
        variables: {
            registroInput: this.users,
        },
      })
        .then((result) => {
          let dataLogIn = {
            usuario: this.users.usuario,
            token_access: result.data.registrarUsuario.access,
            token_refresh: result.data.registrarUsuario.refresh,
            };

          this.$emit("registroExitoso", dataLogIn);
          alert("Registro exitoso: " + this.users.usuario);

        })
        .catch((error) => {
          alert("Error registrando al usuario. " + error);
           console.log(JSON.stringify(error))
        });

      },
    },
}
</script>



<style scoped>
@font-face {
  font-family: Questa Grande;
  src: url(../../fuentes/Questa_Grande_Regular.otf) format("Opentype");
}
    h1 {
        color:black;
        text-shadow: black 0.1em 0.1em 0.2em;
    }

    .signUp_user{
        margin: 0;
        padding: 0%;
        height: 150%;
        width: 100%;
    
        display: flex;
        justify-content: center;
        align-items: center;
    }

       .container_signUp_user {
        border: 2px solid  black;
        border-radius: 5px;
        width: 20%;
        height: 50%;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 50px 0 20px 0;
    }

    .signUp_user h2{
      color: black;
    }

    .signUp_user form{
        width: 70%; 
    }

        .signUp_user button{
        width: 100%;
        height: 40px;

        color: #E5E7E9;
        background: black;
        border: 1px solid #E5E7E9;

        border-radius: 5px;
        padding: 10px 25px;
        margin: 5px 0 25px 0;
    }

    .signUp_user button:hover{
        color: #E5E7E9;
        background: turquoise;
        border: 1px solid black;
    }

</style>