<template>
    <h1> Componente de Leccion </h1>

    {{ texto }}


</template>

<script>
export default {
    name: 'CompLeccion',

    props: {
        texto: {
            type: String,
            default: "No se cargo un texto para esta leccion",
        }
    }
}
</script>