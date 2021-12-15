<template>

    <div class="signUp_user">


        <div class="container_signUp_user">
             <h2>Registro</h2> 
            <form v-on:submit.prevent="processSignUp" >
                
                <input type="text" v-model="users.nombre" placeholder="Nombre">
                <img   class="nombre" src="../../Imagenes/otrosIconos/tele.svg"/>
                <br>

                <input type="text" v-model="users.usuario" placeholder="Usuario">
                <br>

                <input type="text" v-model="users.correo" placeholder="Correo">
                <br>
                
                <input type="number" v-model="users.telefono" placeholder="Teléfono">
                <br>

                <input type="text" v-model="users.pais" placeholder="País">
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
            nombre: null,
            usuario: null,
            correo: null,
            telefono: null,
            pais: null,
            departamento: null,
            ciudad: null,
            password: null,
            is_staff: false,

         },
        };
},

mounted: function() {
    document.querySelector("#toggleLog").checked = true;
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

.signUp_user{
    margin: -8px;
    padding: 0;
    height: 100vh;
    background-image: url(../../Imagenes/cieloHome.jpg);
    background-size: cover;
    position: relative;
    background-repeat: no-repeat;      
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    top: -8rem;

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
    background-color: transparent;
    border: 1px solid rgb(217,217,217);
    border-radius: 30px;
    font-family: Questa Grande;
    text-shadow:black 0.1em 0.1em 0.2em;
    box-shadow: 0 0 10px rgb(235, 245, 239);
}
 
.signUp_user button{
    position:absolute;
    left:180pt;
    width: 10vw;
    height: 5vh;
    font-family: Questa Grande;
    color: #E5E7E9;
    background:turquoise;
    border: none;
    box-shadow: 1px 1px 1px 1px rgb(248, 252, 252);
    border-radius: 16px;
    align-content: center;
}
 
.signUp_user button:hover{
    color: #E5E7E9;
    background: rgb(30, 212, 185);
}

 .signUp_user h4 {
    display: flex;
    justify-content: center;
    align-items: center;
    color:white;
    font-size: 20px;
}

 .signUp_user h2 {
    display: flex;
    justify-content: center;
    align-items: center;
    color:white;
    font-size: 20px;
}

.nombre{
     position: absolute; top: 2px; right: 5px;
}


</style>