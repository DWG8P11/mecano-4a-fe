<template>
    <h1> Componente de Leccion </h1>

    <!-- Des-Comentar las siguientes lineas para ver 
    que las propiedades se cargan correctamente -->

    <!--p> El texto de la leccion es: <i>{{ texto }}</i></p>

    <p> Las letras que se practicaran en esta leccion es: </p>
    <ul>
        <li v-for="letra in letras" :key="letra">
            {{ letra }}
        </li>
    </ul-->


    <div id="texto-leccion">
        {{this.texto_procesado}}
    </div>


</template>

<script>
export default {
    name: 'CompLeccion',

    props: {
        texto: {
            type: String,
            default: "No se cargo un texto para esta leccion",
        },

        letras: {
            type: Array,
            default: ['a', 's', 'D', 'f', 'g', 'ñ', 'l', 'k', 'j', 'h']
        }
    },

    mounted: function() {
        // Pasar letras a minusculas
        // this.letrasMin = this.letras.forEach((letra, i) => {
        //     return letra.toLowerCase();
        // })

        console.log("En mounted", this.letras);
        this.texto_procesado = this.procesarTextoAHtml();
    },

    methods: {
        procesarTextoAHtml: function (){
            var textoConHtml = this.texto;

            this.letras.forEach(letra => {
                textoConHtml = textoConHtml.replace(letra.toLowerCase(), `93jf29834${letra}98qf3498b`)
                textoConHtml = textoConHtml.replace(letra.toUpperCase(), `93jf29834${letra}98qf3498b`)
            });

            textoConHtml = textoConHtml.replace("93jf29834", '<div class="letra-leccion">')
            textoConHtml = textoConHtml.replace("98qf3498b", '</div>')
            console.log(textoConHtml)
            return textoConHtml;
        },
    }
}
</script>

<style scoped>

.texto {
    font-size: 14pt;
}

.letra-leccion .letra-leccion {
    background: black;
    font-weight: 600;
}

</style>