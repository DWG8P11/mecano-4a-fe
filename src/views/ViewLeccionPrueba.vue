<template>
    <h1> Vista de Leccion de Prueba </h1>

    <CompLeccion :texto="textoDePrueba" :letras="['a', 'e', 'i', 'o', 'u', ',', ' ', '\n', 'ñ']"/>
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
            textoDePrueba: 'Texto de prueba para una lección de "La Nebulosa de Qwerty".\nNueva línea. \
ASÍ SE VE UN TEXTO CON MAYÚSCULAS. \
Ásí sé vén lás tíldés áéíóúÁÉÍÓÚ üaÜa\
ÑñÑñÑñÑñ'
        }
    }
}
</script>