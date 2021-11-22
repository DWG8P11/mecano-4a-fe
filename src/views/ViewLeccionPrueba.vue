<template>
<div class="view-leccion-prueba">
    <h1> View de Lección de Prueba </h1>

    Esta es una View creada únicamente para poder probar el Componente de Lección. Para hacer uso de esto basta con:
    <ul>
        <li> Modificar la propiedad <b>letras</b> al componente <i>CompLeccion</i> agregado a esta View. Si se omite por completo esta propiedad, se asume que en la lección se practicarán todas las letras del teclado español latino. </li>
        <li> Modificar la variable <b>textoDePrueba</b> por aquel en el que se quieren practicar las teclas mencionadas. </li>
    </ul>

    <CompLeccion :texto="textoDePrueba" :letras="['a', 'e', 'i', 'o', 'u', ',', ' ', '\n', 'ñ']"/>
    Dentro de Vista de Leccion de Prueba, luego de haber cargado el componente de Leccion con un texto de prueba.
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
            textoDePrueba: 'Texto de prueba para una lección de "La Nebulosa de Qwerty".\nNueva línea. \
ASÍ SE VE UN TEXTO CON MAYÚSCULAS. \
Ásí sé vén lás tíldés áéíóúÁÉÍÓÚ üaÜa\
ÑñÑñÑñÑñ'
        }
    }
}
</script>

<style scoped>
.view-leccion-prueba{
    background: crimson;;
    color: white;
    text-align: left;
}
</style>