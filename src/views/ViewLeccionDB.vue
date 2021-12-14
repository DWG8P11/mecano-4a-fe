<template>
<div class="view-leccion-db">
    
    <CompLeccion :id="id" :titulo="titulo" :texto="texto" :letras="letras" :imagen="imagen"
                 :cpmMin1="cpmMin1" :cpmMin2="cpmMin2" :cpmMin3="cpmMin3" :cpmMin4="cpmMin4"
                 :ignorarMayus="ignorarMayus" :ignorarTildes="ignorarTildes" :ignorarDieres="ignorarDieres"
                 :nivel="nivel" :nLeccion="n_leccion"
                 :key="texto"
                 v-on:msjCargarLeccion="cargarLeccion"/>
   
</div>
</template>

<script>
import CompLeccion from '@/components/CompLeccion.vue'
import gql from "graphql-tag";

export default {
    name: 'ViewLeccionDB',
    
    components: {
        CompLeccion
    },

    props: {
        idLeccion: String
    },

    data: function() {
        return {
            id: "LeccionNoIdentificada",
            texto: "No hay texto.",
            titulo: "No hay título.",
            letras: Array,
            imagen: "",
            cpmeMin1: 100,
            cpmeMin2: 200,
            cpmeMin3: 300,
            cpmeMin4: 400,
            ignorarMayus: false,
            ignorarTildes: false,
            ignorarDieres: false,
            nivel: Number,
            n_leccion: Number
        }
    },

    created: function() {
        console.log("ViewLeccionDB fue creado, y idLeccion vale", this.idLeccion);
        this.traerLeccionPorId(this.idLeccion);
    },

    methods: {
        traerLeccionPorId: async function(idParam) {
            try{ 
                let respuesta = await this.$apollo.query({
                    query: gql`
                        query Query($idLeccion: String!) {
                            traerLeccionPorId(idLeccion: $idLeccion) {
                                id
                                titulo
                                nivel
                                n_leccion
                                texto
                                teclas
                                imagen
                                mini1
                                mini2
                                mini3
                                mini4
                                ignorarMayus
                                ignorarTildes
                                ignorarDieres
                            }
                        }

                    `
                ,
                    variables: {
                        idLeccion: idParam
                    }
                });

                let info = respuesta.data.traerLeccionPorId;

                this.id = info.id;
                this.titulo = info.titulo;
                this.nivel = info.nivel;
                this.n_leccion = info.n_leccion;
                this.texto = info.texto;
                this.letras = info.teclas;
                this.imagen = info.imagen;
                this.mini1 = info.mini1;
                this.mini2 = info.mini2;
                this.mini3 = info.mini3;
                this.mini4 = info.mini4;
                this.ignorarMayus = info.ignorarMayus;
                this.ignorarTildes = info.ignorarTildes;
                this.ignorarDieres = info.ignorarDieres;
            
            } catch(error) {
                alert("Error trayendo la lección.", error)
                console.log("Error trayendo la lección", JSON.stringify(error.networkError))
            
            }
        },

        cargarLeccion: function(idP) {
            this.traerLeccionPorId(idP);
        }

        
    }
}
</script>

<style scoped>
h1 {
    text-align: center;
    color:black;
}

.view-leccion-db{
    
    color: white;
    text-align: left;
    background-image: url(../../Imagenes/sky.png);
    background-size: cover;
    background-attachment: fixed;
   
    display: flex;
    justify-content: space-between;
    justify-items: auto;
    height: calc(100vh - 3.15rem);
    width: 100vw;
    /* margin:-8px; */
    padding: 0;

    position: relative;
    top: -8.5rem;
    /* padding-top:4.5rem; */

}


</style>