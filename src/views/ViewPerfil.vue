<template>
    <div class="view-perfil">
        <header>
            <h1> Perfil </h1>
        </header>
        <section class="perfil-cuerpo">
            <form v-on:submit.prevent="procesar">
                <input type="text" placeholder="Nombre de Usuario" v-model="usuarioForm.id" /> <br/>
                <input type="text" placeholder="Nombre" v-model="nuevoNivel.nombre" /> <br/>
                <input type="text" placeholder="Descripcion" v-model="nuevoNivel.descripcion"/> <br/>
                <button id="boton-submit-nivel" type="submit" disabled> <br/>
                    Registrar Nivel
                </button>
            </form>
        </section>
    </div>
</template>

<script>
import gql from "graphql-tag";

export default {
    name: "ViewPerfil",

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
                                nombre
                                usuario
                                correo
                                id
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
                console.log(JSON.stringify(respuesta));
            }).catch(error => {
                alert("No se pudo cargar su perfil.", error);
                console.log("Error trayendo los datos del usuario", error);
            });
        }
    }
}
</script>

<style scoped>

</style>