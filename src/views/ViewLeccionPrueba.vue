<template>
<div class="view-leccion-prueba">
    
    <CompLeccion id="61a2e093a98b545e515921df" :titulo="tituloPrueba" :texto="textoDePrueba" :letras="['a', 'ñ']" imagen="../../Imagenes/Canis_major.jpg"
                 :cpmMin1="cpmMin1Prueba" :cpmMin2="cpmMin2Prueba" :cpmMin3="cpmMin3Prueba" :cpmMin4="cpmMin4Prueba"
                 :ignorarMayus="ignorarMayusPrueba" :ignorarTildes="ignorarTildesPrueba" :ignorarDieres="ignorarDieresPrueba"/>
   
</div>
</template>

<script>
import CompLeccion from '@/components/CompLeccion.vue'

export default {
    name: 'ViewLeccionPrueba',
    
    components: {
        CompLeccion
    },

    data: function() {
        return {
            textoDePrueba:'Es la segunda estrella más brillante de la constelación Canis Major. Su principal significado es «flor de azahar». Es una estrella binaria, su estrella principal es una supergigante azul o gigante luminosa. Distante 430 años luz de la tierra. Adhara es la fuente ultravioleta extrema más brillante conocida en el cielo. Si pudiéramos ver en longitudes de onda ultravioleta, eclipsaría a todas las demás estrellas. La estrella tiene un tamaño 13,9 veces mayor que el tamaño del Sol y alrededor de 12,6 masas solares, suficiente para que en el futuro pueda explotar como supernova. La edad estimada de la estrella es de 22,5 millones de años. Un estudio publicado en el año 1995 encontró que la estrella es la fuente más potente de fotones del contínuo de Lyman (fotones emitidos por encima del límite de Lyman, capaces de ionizar átomos de hidrógeno en el gas más cercano),  que desempeña un papel importante en la ionización del hidrógeno en la Nube interestelar local (la nube interestelar que se extiende a lo largo de 30 años luz, a través de la cual se mueve el Sol).',
            tituloPrueba: "Adhara",
            imagenPrueba: "../../Imagenes/Canis_major.jpg",
            cpmeMin1Prueba: 100,
            cpmeMin2Prueba: 200,
            cpmeMin3Prueba: 300,
            cpmeMin4Prueba: 400,
            ignorarMayusPrueba: false,
            ignorarTildesPrueba: false,
            ignorarDieresPrueba: false
        }
    }
}
</script>

<style scoped>
h1 {
    text-align: center;
    color:black;
}

.view-leccion-prueba{
    
    color: white;
    text-align: left;
    background-image: url(../../Imagenes/sky.png);
    background-size: cover;
    background-attachment: fixed;
   
    display: flex;
    justify-content: space-between;
    justify-items: auto;
    height: 100%;
    margin:-8px;
    padding: 0;
    z-index: 0;
}


</style>