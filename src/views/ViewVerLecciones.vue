<template>
    <div class="view-ver-lecciones">
        <body>
            <div class="subtitle">Fagua{{ nNivel? `: Nivel ${nNivel}` :  ''}} 
                <img class="icono-tele"  src="../../Imagenes/otrosIconos/tele.svg"/>
                <img class="abc"         src="../../Imagenes/otrosIconos/planetitas.svg"/>
                <img class="estrellitas" src="../../Imagenes/otrosIconos/estrellasypuntitos.svg"/>
            </div>  

            <div class="contenedor-galeria">
                <div class="galeria">
                    <router-link :to="`/aprende/leccionDB?id=${leccion.id}`"
                        class="galeria-item"
                        v-for="leccion of this.listaLecciones"
                        :key="leccion"
                    >
                        <img class="galeria-imagen" :src="diccionarioImagenes.get(leccion.id)" :key="diccionarioImagenes.get(leccion.id)"/>

                        <div class="galeria-item-info">
                            <ul>
                                <li class="galeria-item-nombre">
                                    <i class="leccion-nombre" aria-hidden="true"> </i>
                                    {{ `${leccion.n_leccion}. ${leccion.titulo}` || "Leccion Sin Identificar" }}
                                </li>
                            </ul>
                        </div>
                    </router-link>
                </div>
            </div>
        </body>
    </div>
</template>


<script>
import gql from "graphql-tag";

export default {
    name: "ViewGaleriaLecciones",

    props: {
        nNivel: {
            type: Number,
            default: 1
        }
    },

    data: function () {
        return {
            listaLecciones: [],

            leccionCargaLecciones: 0,

            diccionarioImagenes: new Map(),
        };
    },

    created: async function () {
        this.traerTodosLecciones();
    },

    methods: {
        traerTodosLecciones: async function () {
            await this.$apollo
                .mutate({
                    mutation: gql`
                        query TraerLeccionesLigeras($nivel: Int) {
                            traerLeccionesLigeras(nivel: $nivel) {
                                id
                                titulo
                                nivel
                                n_leccion
                            }
                        }
                    `,
                    variables: {
                        nivel: this.nNivel // En el router me aseguro de que sea un entero
                    }
                })
                .then(respuesta => {
                    this.listaLecciones = respuesta.data.traerLeccionesLigeras;

                    // Ordenar por numero de nivel y luego por # leccion
                    this.listaLecciones.sort((a, b) => { 
                        if (a.nivel != b.nivel) {
                            return a.nivel - b.nivel
                        } 
                        return a.n_leccion - b.n_leccion
                    });

                    this.leccionCargaLecciones += 1; // Establece que deberia cargar de nuevo la galeria

                    this.traerImagenes();
                })
                .catch(error => {
                    console.log("error", JSON.stringify(error.networkError));
                    this.leccionCargaLecciones = 0;
                });

            return;
        },

        traerImagenes: async function () {

            for (const leccion of this.listaLecciones) {
                let id = leccion.id;

                this.$apollo.mutate({
                        mutation: gql`
                            query TraerLeccionPorId($idLeccion: String!) {
                                traerLeccionPorId(idLeccion: $idLeccion) {
                                    id
                                    imagen
                                }
                            }
                        `,
                        variables: {
                            idLeccion: id
                        }
                    })
                    .then((respuesta) => {
                        console.log("RESPUESTA", respuesta.data);
                        this.diccionarioImagenes.set(id, respuesta.data.traerLeccionPorId.imagen);
                        // this.leccionCargaLecciones += 1;
                    })
                    .catch(error => {
                        console.log("Error", error, ". Cargando la imagen de la leccion", id);
                        this.diccionarioImagenes.set(id, "");
                    });
            }
            console.log("Diccionario de imagenes hasta ahora", this.diccionarioImagenes);

            this.leccionCargaLecciones += 1; // Establece que deberia cargar de nuevo la galeria
        },
    },
};
</script>


<style scoped>
.view-ver-lecciones {
    margin: -8pt;
    padding: 0;
    display: flex; 
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color:#062f55;
    overflow-y: scroll;
    overflow-x: hidden;
    position: relative;
    top: -145px;
}

.subtitle {
    position: relative;
    text-align: center;
    font-family: Autery;
    color: white;
    font-size: 46pt;

    width: 140pt; /* El tamaño de Arrecife */
    left: calc(50vw - 70pt);
}

.icono-tele{
    position:absolute;
    bottom:-80pt;
    left:-220pt;
    width: 320pt;
    
}


.abc{
    position:absolute;
    bottom:-30pt;
    left:-60pt;
    width: 450pt; 

}

.estrellitas{
    position:absolute;
    bottom:-70pt;
    left:-250pt;
    width: 450pt; 

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
    border:solid;
    border-color:white;
    border-width: 5px;
    box-shadow: 0 0 30px rgb(247, 253, 253);
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
        grid-template-columns:repeat(5, minmax(10rem, 1fr));
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