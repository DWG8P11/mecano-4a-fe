<template>

    <div class="signUp_user">

        <div class="container_signUp_user">
             <h2>Registro</h2> 
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
                
                <input class="check" type="checkbox" v-model="users.is_staff" placeholder="Eres administrador">
                <br> 
                <h4> Administrador </h4>
            
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
            nombre: "",
            usuario: "",
            correo: "",
            telefono: "",
            pais: "",
            departamento: "",
            ciudad: "",
            password: "",
            is_staff: "",
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
           console.log(error)
           alert("Campos Vacios");
        });

      },
    },
}
</script>


<style scoped>

   .signUp_user{
    margin: 0;
    padding: 0;
    height: 60vh;
    width: 100vw;
   
    display: flex;
    justify-content: center;
    align-items: center;
}
 
.container_signUp_user {
    position: relative;
    bottom: 20pt;
    left: 10pt;
    
    width: 50vw;
    height: 60vh;
   
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
 
 
.signUp_user form{
    width: 20vw;
}
 
.signUp_user input{
    width: 20vw;
    height: 3vh;
 
    box-sizing: border-box;
    padding: 10pt 20pt;
    margin: 3pt 0;
 
    border: 1px solid rgb(217,217,217);
    border-radius: 30px;
}
 
.signUp_user button{
    position:absolute;
    width: 20vw;
    height: 5vh;

 
    color: #E5E7E9;
    background: rgb(28, 11,127);
    border: 1px solid #E5E7E9;
 
    border-radius: 5px;
    align-content: center;
}
 
.signUp_user button:hover{
    color: #E5E7E9;
    background: turquoise;
    border: 1px solid rgb(28, 11,127);
}

 .signUp_user h4 {
    display: flex;
    justify-content: center;
    align-items: center;
    color:rgb(28, 11,127);
    font-size: 20px;
}

 .signUp_user h2 {
    display: flex;
    justify-content: center;
    align-items: center;
    color:rgb(28, 11,127);
    font-size: 20px;
}



</style>