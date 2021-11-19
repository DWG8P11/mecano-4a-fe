<template>
    <h1> Vista de Leccion de Prueba </h1>

    <CompLeccion :texto="textoDePrueba" />
    Dentro de Vista de Leccion de Prueba, luego de haber cargado el componente de Leccion con un texto de prueba.
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
            textoDePrueba: "Texto de prueba definido en la vista ViewLeccionPrueba"
        }
    }
}
</script>