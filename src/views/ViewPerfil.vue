<template>
    <div class="view-perfil">
        <header>
            <h1> Perfil </h1>
        </header>
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
                <input id="administrador" type="text" v-model="usuarioForm.administrador" disabled/>
                <br/>

                <button id="activar-actualizar-datos" class="btn-crud-usuario" type="button" v-if="!actualizandoDatos"
                        v-on:click="activarModificacionDatos">
                    Actualizar Datos
                </button>

                <button id="cancelar-actualizar-datos" class="btn-crud-usuario" type="button" v-if="actualizandoDatos"
                        v-on:click="cancelarModificacionDatos">
                    Cancelar Modificación
                </button>

                <button id="submit-actualizar-datos" class="btn-crud-usuario" type="submit" v-if="actualizandoDatos"
                        v-on:click="actualizarDatos">
                    Actualizar Usuario
                </button>

                <button id="activar-actualizar-datos" class="btn-crud-usuario" type="button" v-if="actualizandoDatos"
                        v-on:click="eliminarUsuario">
                    Eliminar Usuario
                </button>
                
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
            id: "",
            nombre: "",
            usuario: "",
            correo: "",
            telefo: "",
            pais: "",
            departamento: "",
            ciudad: "",
            es_administrador: "",
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
                this.usuarioForm = {...respuesta.data.detallesUsuarioAutenticado}

                // Guardar los datos recibidos, para poder recuperarlos en caso de que se modifique el formulario
                this.usuarioIn = {... this.usuarioForm};
            }).catch(error => {
                alert("No se pudo cargar su perfil.", error);
                console.log("Error trayendo los datos del usuario", error);
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
            this.usuarioForm = {... this.usuarioIn};
            
        },
        
        actualizarDatos: async function() {
            console.log("Orden de actualizar datos recibida.");
        },

        eliminarUsuario: async function() {
            console.log("Orden de eliminar usuario recibida.")
        }

    }
}
</script>

<style scoped>

</style>