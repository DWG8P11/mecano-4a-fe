<template>
    <div class="view-perfil">
        <header>
            <h1> Perfil </h1>
        </header>    
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
                console.log("Error trayendo los datos del usuario", error);
            });
        }
    }
}
</script>

<style scoped>

</style>