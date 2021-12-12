<template>
    <div class="view-perfil">
        <div class="header">
            Perfil
        </div>
        <section class="perfil-cuerpo">
            <form id="formulario-usuario-datos">
                <label for="usuario"> Nombre de Usuario</label>
                <input id="usuario" type="text" v-model="usuarioForm.usuario" disabled/>
                <br/>
                <label for="nombre"> Nombre Completo</label>
                <input id="nombre" type="text" v-model="usuarioForm.nombre"  disabled/>
                <br/>
                <label for="correo">Correo </label>
                <input id="correo" type="text" v-model="usuarioForm.correo" disabled/>
                <br/>
                <label for="telefono">Teléfono</label>
                <input id="telefono" type="number" v-model="usuarioForm.telefono" disabled/>
                <br/>
                <label for="pais">País</label>
                <input id="pais" type="text" v-model="usuarioForm.pais"  disabled/>
                <br/>
                <label for="Departamento">Departamento o Estado</label>
                <input id="departamento" type="text" v-model="usuarioForm.departamento" disabled/>
                <br/>
                <label for="Ciudad"> Ciudad </label>
                <input id="ciudad" type="text" v-model="usuarioForm.ciudad"  disabled/>
                <br/>
                <label for="administrador"> ¿Es Administrador? </label>
                <input id="administrador" type="text" v-model="usuarioForm.is_staff" disabled/>
                <br/>
                
                <div class="contenedor-botones-datos">
                    <button id="activar-actualizar-datos" class="btn-crud-usuario" type="button" v-if="!actualizandoDatos"
                            v-on:click="activarModificacionDatos">
                        Actualizar Datos
                    </button>

                    <button id="cancelar-actualizar-datos" class="btn-crud-usuario" type="button" v-if="actualizandoDatos"
                            v-on:click="cancelarModificacionDatos">
                        Cancelar Modificación
                    </button>

                    <button id="submit-actualizar-datos" class="btn-crud-usuario" type="submit" v-if="actualizandoDatos"
                            v-on:click.prevent="actualizarDatos">
                        Actualizar Usuario
                    </button>

                    <button id="activar-actualizar-datos" class="btn-crud-usuario" type="button" v-if="actualizandoDatos"
                            v-on:click="eliminarUsuario">
                        Eliminar Usuario
                    </button>
                </div>
            </form>
        </section>
    </div>
</template>

<script>
import gql from "graphql-tag";

export default {
    name: "ViewPerfil",

    data: {
        usuarioForm: {
            nombre: "",
            usuario: "",
            correo: "",
            telefono: "",
            pais: "",
            departamento: "",
            ciudad: "",
            is_staff: "",
        },

        modeloPrueba: {
            texto: ""
        },

        actualizandoDatos: false,
        actualizandoContrasena: false
    },

    created: function() {
        this.traerDetallesUsuario();
    },

    methods: {
        traerDetallesUsuario: async function() {
            this.$apollo.query(
                {
                    query: gql`
                    query Query {
                        detallesUsuarioAutenticado {
                            id
                            nombre
                            usuario
                            correo
                            telefono
                            pais
                            departamento
                            ciudad
                            administrador
                        }
                    }`
                }
            ).then(respuesta => {
                console.log("Detalles de usuario traidos correctamente.");

                // Actualizar campos del formulario (soft clone, para que no diga al modificar el input que estamos modificando objetos que son read only)
                this.actualizarCamposFormularioCon(respuesta.data.detallesUsuarioAutenticado);

                // Guardar los datos recibidos, para poder recuperarlos en caso de que se modifique el formulario
                this.usuarioIn = {... respuesta.data.detallesUsuarioAutenticado};
            }).catch(error => {
                alert("No se pudo cargar su perfil.", error);
                console.log("Error trayendo los datos del usuario", error);
            });
        },

        actualizarCamposFormularioCon: function(objeto) {
            Object.keys(this.usuarioForm).forEach(llave => {
                if (llave != "is_staff" || objeto.is_staff){ 
                    this.usuarioForm[llave] = objeto[llave]
                } else {
                    this.usuarioForm[llave] = objeto["administrador"]
                }
            });
        },

        activarModificacionDatos: async function() {
            console.log("Habilitada modif datos");
            // Cambiar variable que indica que los campos están siendo cargados (esto visibiliza los botones necesarios)
            this.actualizandoDatos = true;

            // Habilitar edicion de campos
            let inputsDatos = document.querySelectorAll("#formulario-usuario-datos input");

            inputsDatos.forEach(elemento => elemento.removeAttribute('disabled'));
        },

        cancelarModificacionDatos: async function() {
            // Cambiar variable de estado de modificacion
            this.actualizandoDatos = false;

            // Deshabilitar edicion de campos
            let inputsDatos = document.querySelectorAll("#formulario-usuario-datos input");

            inputsDatos.forEach(elemento => elemento.setAttribute('disabled', ""));

            // Restaurar campos
            this.actualizarCamposFormularioCon(this.usuarioIn);
            
        },
        
        actualizarDatos: async function() {
            console.log("Orden de actualizar datos recibida.");

            this.$apollo.mutate(
                {
                    mutation: gql`
                    mutation Mutation($idUsuario: Int!, $actualizacionInput: UsuarioAct!) {
                        actualizarUsuario(idUsuario: $idUsuario, actualizacionInput: $actualizacionInput) {
                            id
                            nombre
                            usuario
                            correo
                            telefono
                            pais
                            departamento
                            ciudad
                            administrador
                        }
                    }`,
                    variables: {
                        idUsuario: this.usuarioIn.id,
                        actualizacionInput: this.usuarioForm
                    }
                }
            ).then( respuesta => {
                alert("Usuario actualizado satisfactoriamente.")  

                // Actualizar datos de usuario            
                this.usuarioIn = {... respuesta.data.actualizarUsuario};
                this.actualizarCamposFormularioCon(respuesta.data.actualizarUsuario);

                // Reiniciar edicion de datos
                this.cancelarModificacionDatos();
            }
            ).catch( error => {
                alert("No se pudo actualizar el usuario.")
                console.log("Error actualizando", error, JSON.stringify(error), error.networkError)
            }

            );
        },

        eliminarUsuario: async function() {
            console.log("Orden de eliminar usuario recibida.")

            this.$apollo.mutate(
                {
                    mutation: gql`
                        mutation Mutation($idUsuario: Int!) {
                            eliminarUsuario(idUsuario: $idUsuario)
                        }`,
                    variables: {
                        idUsuario: this.usuarioIn.id
                    }
                }
            ).then(respuesta => {
                alert("Usuario eliminado correctamente. " + respuesta.data.eliminarUsuario)

                this.$router.push({name: "Home"});
            }).catch(error => {
                alert("Error eliminando el usuario." + error);
                console.log(error.networkError);
            });
        }
    }
}
</script>

<style scoped>
.view-perfil{
    position: relative;
    
    top: -4.5rem;
    padding-top: 4.5rem;
    margin: 0;
    padding: 0;
    height: calc(100% + 4rem);
    width: 100%;

    overflow-y: scroll;
    
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    font-size: 1.3rem;
    font-family: Questa Grande;
}
.header{
    position: relative;
    background: yellow;
    font-size: 2rem;
    /* top: 0; */
}

.perfil-cuerpo {
    /* Centra el contenedor*/
    position: static;
    top: 0rem;
    margin-left: auto;
    margin-right: auto;
    height: 50vh;

    /* width: 90vw; */
    
    /* display: flex;
    flex-direction: column; */
    justify-content: center;
    align-items: center;
}

@supports (display: grid) {
    form {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(24rem, auto));
    }
    .view-perfil {
        display: grid;
    }
}

label {
    /* Necesario para poderle dar un width, porque de lo contrario el label es un inline-element */
    display: inline-block; 
}

input{
    display: inline-block;
    flex-direction: row;
    min-width: 20rem;
    height: 3rem;

    box-sizing: border-box;
    padding: 10pt 20pt;
    margin: 0 0;

    border: 1px solid rgb(217,217,217);
    border-radius: 30px;

}

.contenedor-botones-datos {
    display: flex;
    justify-content: center;
}

button {
    width: 8rem;
    height: 3rem;

    color: #E5E7E9;
    background: rgb(28, 11,127);
    border: 1px solid #E5E7E9;

    border-radius: 5px;
    align-content: center;

    font-family: Questa Grande;
    font-size: 
}

button:hover{
    color: #E5E7E9;
    background: crimson;
    border: 1px solid rgb(28, 11,127);
}
</style>