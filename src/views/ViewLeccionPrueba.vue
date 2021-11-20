<template>
    <h1> Vista de Leccion de Prueba </h1>

    <CompLeccion :texto="textoDePrueba" :letras="['a', 'b', 'c', 'v', 'i', 'u', 'e', 'o']"/>
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
            textoDePrueba: "Texto de prueba para una leccion de La Nebulosa de Qwerty.\n\n Nueva linea.\
            ASI SE VE UN TEXTO QUE QUEDE EN MAYÚSCULA. \
            Ásí sé vén lás tíldés üÜ\
            ÑñÑñÑñÑñ"
        }
    }
}
</script>