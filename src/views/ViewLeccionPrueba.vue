<template>
<div class="view-leccion-prueba">
    
    <CompLeccion :texto="textoDePrueba" :letras="['a', 'ñ']"/>
   
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
            textoDePrueba:'Es la segunda estrella más brillante de la constelación Canis Major. Su principal significado es «flor de azahar». Es una estrella binaria, su estrella principal es una supergigante azul o gigante luminosa. Distante 430 años luz de la tierra. Adhara es la fuente ultravioleta extrema más brillante conocida en el cielo. Si pudiéramos ver en longitudes de onda ultravioleta, eclipsaría a todas las demás estrellas. '
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
    background-position: absolute;
   
    display: flex;
    justify-content: space-between;
    justify-items: auto;
    height: 100vh;
    margin:-8px;
    padding: 0;

 
}

</style>