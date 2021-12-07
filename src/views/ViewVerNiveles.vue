<template>
    <div class="view-ver-niveles">
        <body>
            <div class="subtitle">Niveles</div>

            <div class="contenedor-galeria">
                <div class="galeria" :key="nivelCargaNiveles">
                    <div
                        class="galeria-item"
                        v-for="nivel of this.listaNiveles"
                        :key="nivel"
                    >
                        <img class="galeria-imagen" :src="diccionarioImagenes.get(nivel.id)" />

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
                        query TraerNiveles {
                            traerNiveles {
                                id
                                nombre
                                descripcion
                            }
                        }
                    `,
                })
                .then(respuesta => {
                    this.listaNiveles = respuesta.data.traerNiveles;
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
            let promesasImagenes = [];

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
                        this.nivelCargaNiveles += 1;
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
    display: flex;
    margin: 0pt;
    margin-top: -70pt;
    align-items: center;
    justify-content: center;
    height: 100vh;
}

.subtitle {
    position: relative;
    left: 0;

    font-family: Blue-Fonte;
    color: rgb(28, 11, 127);
    font-size: 46pt;

    width: 140pt; /* El tamaño de Arrecife */
    left: calc(50vw - 70pt);
}

body {
    position: absolute;
    top: 75pt;
    left: 0;
    width: 100%;
}

img {
    display: block;
}

.contenedor-galeria {
    position: relative;
    max-width: 93.5rem;
    top: 80pt;
    margin: 0 auto;
    padding: 0 2rem;
}

.galeria {
    display: flex;
    flex-wrap: wrap;
    margin: -1rem -1rem;
    padding-bottom: 3rem;
}

.galeria-item {
    position: relative;
    flex: 1 0 22rem;
    margin: 1rem;
    color: #fff;
    cursor: pointer;

    /* Para mostrar como circulos */
    border-radius: 50%;
    overflow: hidden;
    width: 100%;
    height: 0;
    padding-bottom: 50%;
    padding-top: 50%;

    border: solid;
    border-color: black;
}

.galeria-imagen {
    width: 100%;
    height: 100%;

    object-fit: cover;

    /* Para ajustar la imagen al contenedor de tamaño 0 */
    position: absolute; /* Para ignorar el height 0 del contenedor*/
    top: 0;
}
/*
The following code will only run if your browser supports CSS grid.
*/
@supports (display: grid) {
    .galeria {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(22rem, 1fr));
        grid-gap: 2rem;
    }

    .galeria-item,
    .galeria {
        width: auto;
        margin: 0;
    }
}

.galeria-item-info {
    display: none;
}

.galeria-item-info li {
    display: inline-block;
    font-size: 1.5rem;
    font-weight: 400;

    /* Para centrar el texto */
    width: 100%;
}

.galeria-item:hover .galeria-item-info,
.galeria-item:focus .galeria-item-info {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.2);
}
</style>