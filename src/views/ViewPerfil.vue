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

        <section class="puntajes-usuario">
            <table class="tabla-puntajes-usuario" :key="diccInfoLecciones">
                <tr>
                    <th>fecha</th>
                    <th>Puntaje</th>
                    <th>Precisión</th>
                    <th>Palabras por minuto</th>
                    <th>Nivel</th>
                    <th># Lección</th>
                    <th>ID Lección</th>

                </tr>
                <tr
                    v-for="puntaje in listaPuntajes"
                    :key="puntaje.id"
                >
                    <td>{{ puntaje.fecha }}</td>
                    <td>{{ (3* puntaje.cpm_e).toFixed(0) }}</td>
                    <td>{{ (100 * puntaje.precision).toFixed(0) }}</td>
                    <td>{{ (puntaje.cpm_e/5).toFixed(0) }}</td>
                    <td>{{ diccInfoLecciones.get(puntaje.idLeccion)? diccInfoLecciones.get(puntaje.idLeccion).nivel : null }}</td>
                    <td>{{ diccInfoLecciones.get(puntaje.idLeccion)? diccInfoLecciones.get(puntaje.idLeccion).n_leccion : null }}</td>
                    <td>{{ puntaje.leccionId }}</td>
                </tr>
            </table>
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
        actualizandoContrasena: false,

        listaPuntajes: [],

        diccInfoLecciones: new Map()
    },

    created: function() {
        this.traerDetallesUsuario().then(respuesta => this.traerPuntajes());
        
    },

    methods: {
        traerDetallesUsuario: async function() {
            await this.$apollo.query(
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
        },

        traerPuntajes: async function() {
            console.log("Se estan trayendo los puntajes del usuario.");
            await this.$apollo
                .query({
                    query: gql`
                    query TraerPuntajes($usuario: String) {
                        traerPuntajes(usuario: $usuario) {
                            id
                            usuario
                            leccionId
                            precision
                            cpm_e
                            segundos
                            fecha
                        }
                    }`,
                    variables: {
                        usuario: this.usuarioIn.usuario
                    }
                })
                .then(respuesta => {
                    console.log("Puntajes del usuario traidos correctamente.", respuesta.data.traerPuntajes[0]);
                    this.listaPuntajes = respuesta.data.traerPuntajes;
                    console.log(this.listaPuntajes, typeof(this.listaPuntajes));

                    // this.puntajeCargaPuntajees += 1; // Establece que deberia cargar de nuevo la galeria
                    
                    this.traerInfoLecciones();
                })
                .catch(error => {
                    console.log("Hubo un error trayendo los puntajes del usuario.", error);
                    console.log("error", error);
                    this.puntajeCargaPuntajees = 0;
                });
        },

        traerInfoLecciones: function() {
            for (const puntaje of this.listaPuntajes) {
                console.log(puntaje)
                let id = puntaje.leccionId;
                if (this.diccInfoLecciones.get(id)) continue;

                console.log("Trayendo info de la leccion", id)

                this.$apollo.query({
                        query: gql`
                            query TraerLeccionPorId($idLeccion: String!) {
                                traerLeccionPorId(idLeccion: $idLeccion) {
                                    id
                                    nivel
                                    n_leccion
                                }
                            }
                        `,
                        variables: {
                            idLeccion: id
                        }
                    })
                    .then(respuesta => {
                        console.log("Traida info de leccion", id);
                        this.diccInfoLecciones.set(id, respuesta.data.traerLeccionPorId);
                        // this.puntajeCargaPuntajees += 1;
                    })
                    .catch(error => {
                        console.log("No se pudo traer la info de la leccion", id)
                        console.log("Error", JSON.stringify(error));
                        this.diccInfoLecciones.set(id, {nivel: "#", nLeccion: "#"});
                    });
            }
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
    margin: 0 0;

    border: 1px solid rgb(217,217,217);
    border-radius: 30px;

    font-family: Questa Grande;
    font-size: 1.1rem;
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
    font-size: 1rem;
}

button:hover{
    color: #E5E7E9;
    background: crimson;
    border: 1px solid rgb(28, 11,127);
}
</style>