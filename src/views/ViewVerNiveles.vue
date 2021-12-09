<template>
    <div class="view-ver-niveles">
        <body>

            <div class="contenedor-galeria">
                <!-- <div class="galeria" :key="nivelCargaNiveles"> -->
                <div class="galeria">
                    <div
                        :id="'nivel-'+nivel.id"
                        class="galeria-item"
                        v-for="nivel of this.listaNiveles"
                        :key="nivel"
                    >
                        <img class="galeria-imagen" :src="diccionarioImagenes.get(nivel.id)" :key="diccionarioImagenes.get(nivel.id)"/>

                        <div class="galeria-item-info">
                            <ul>
                                <li class="galeria-item-nombre">
                                    <i class="nivel-nombre" aria-hidden="true"> </i>
                                    {{ `Nivel ${nivel.id}: "${nivel.nombre}"` || "Nivel Sin Identificar" }}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </body>
    </div>
</template>


<script>
import gql from "graphql-tag";

export default {
    name: "ViewGaleriaNiveles",

    data: function () {
        return {
            listaNiveles: [],

            nivelCargaNiveles: 0,

            diccionarioImagenes: new Map(),
        };
    },

    created: async function () {
        this.traerTodosNiveles();
    },

    methods: {
        traerTodosNiveles: async function () {
            await this.$apollo
                .mutate({
                    mutation: gql`
                        query TraerNivelesLigeros {
                            traerNivelesLigeros {
                                id
                                nombre
                                descripcion
                            }
                        }
                    `,
                })
                .then(respuesta => {
                    this.listaNiveles = respuesta.data.traerNivelesLigeros;
                    this.listaNiveles.sort((a, b) => {return a.id - b.id});

                    this.nivelCargaNiveles += 1; // Establece que deberia cargar de nuevo la galeria

                    this.traerImagenes();
                })
                .catch(error => {
                    console.log("error", error);
                    this.nivelCargaNiveles = 0;
                });

            return;
        },

        traerImagenes: async function () {

            for (const nivel of this.listaNiveles) {
                let id = nivel.id;

                this.$apollo.mutate({
                        mutation: gql`
                            query TraerNivel($idNivel: Int!) {
                                traerNivel(idNivel: $idNivel) {
                                    id
                                    imagen
                                }
                            }
                        `,
                        variables: {
                            idNivel: id
                        }
                    })
                    .then((respuesta) => {
                        this.diccionarioImagenes.set(id, respuesta.data.traerNivel.imagen);
                        // this.nivelCargaNiveles += 1;
                    })
                    .catch(error => {
                        this.diccionarioImagenes.set(id, "");
                    });
            }
            console.log("Diccionario de imagenes hasta ahora", this.diccionarioImagenes);

            this.nivelCargaNiveles += 1; // Establece que deberia cargar de nuevo la galeria
        },
    },
};
</script>


<style scoped>

.view-ver-niveles {
    display            : flex;
    margin             : -8pt;
    padding            : 0;
    background-image   : url(../../Imagenes/sky.png);
    background-size    : cover;
    background-position: absolute;
    background-repeat  : no-repeat;
    height             : 126vh;
    align-items        : center;
    justify-content    : center;
    overflow           : hidden;
    
}

body {
    position: absolute;
    top     : 75pt;
    left    : 0;
    width   : 100%;

}

img {
    display: block;
}

.contenedor-galeria {
    background: crimson;
    position  : absolute;
    width     : 93.5rem;
    height    : 90vh;
    top       : 30pt;
    margin    : 0;
    padding   : 0 2rem;
}

.galeria {
    background     :greenyellow;
    display        : flex;
    flex-wrap      : wrap;
    margin         : -1rem -1rem;
    padding-bottom : 3rem;
    height         : 60vh;
}

.galeria-item {
    position: relative;
   

    /* Para mostrar como circulos */
    border-radius : 50%;
    overflow      : hidden;
    width         : 30vh;
    height        : 30vh;
    border        : solid;
    border-color  : black;
}

.galeria-imagen {
    width     : 100%;
    height    : 100%;
    object-fit: cover;

    /* Para ajustar la imagen al contenedor de tamaño 0 */
    position: absolute; /* Para ignorar el height 0 del contenedor*/
    top: 0;
}
/*
The following code will only run if your browser supports CSS grid.
*/

.galeria-item-info {
    display: none;
}

.galeria-item-info li {
    display    : inline-block;
    font-size  : 1.5rem;
    font-weight: 400;

    /* Para centrar el texto */
    width: 100%;
}

.galeria-item:hover .galeria-item-info,
.galeria-item:focus .galeria-item-info {
    display          : flex;
    justify-content  : center;
    align-items      : center;
    position         : absolute;
    bottom           : 0;
    width            : 100%;
    height           : 100%;
    background-color : rgba(0, 0, 0, 0.2);
}


</style>