<template>
<div class="componente-leccion">
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

    <p> Las letras que se practicaran en esta leccion son: </p>
    <ul>
        <li v-for="letra in letras" :key="letra">
            {{ letra }}
        </li>
    </ul>


    <div id="texto-leccion">
        <span v-html="texto_procesado" :key="texto_procesado" />
    </div>

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

    created: function() {
        // Pasar letras a minusculas
        // this.letrasMin = this.letras.forEach((letra, i) => {
        //     return letra.toLowerCase();
        // })

        console.log("En created", this.letras, typeof(this.letras));
        this.texto_procesado = this.procesarTextoAHtml();
    },

    methods: {
        procesarTextoAHtml: function (){
            var textoConHtml = this.texto;
            var codigoInicioLetra = "2346025796834";
            var codigoFinLetra    = "2983465908237";

            this.letras.forEach(letra => {
                textoConHtml = textoConHtml.replace(new RegExp(`${letra.toLowerCase()}`, 'g'), `${codigoInicioLetra}${letra.toLowerCase()}${codigoFinLetra}`);
                textoConHtml = textoConHtml.replace(new RegExp(`${letra.toUpperCase()}`, 'g'), `${codigoInicioLetra}${letra.toUpperCase()}${codigoFinLetra}`);
            });
            // La `span` tag hace que el resultado sea un elemento inline.
            textoConHtml = textoConHtml.replace(new RegExp(`${codigoInicioLetra}`, 'g'), '<span class="letra-leccion">')
            textoConHtml = textoConHtml.replace(new RegExp(`${codigoFinLetra}`, 'g'), '</span>')
            //textoConHTML = textoConHTML.replace(/\n/g, "<br/>");
            return textoConHtml;
        },
    }
}
</script>

<style>
.componente-leccion {
    background: black;
}

#texto-leccion {
    position: relative;
    font-size: 14pt;
    background:darkblue;
    color: whitesmoke;
}

.letra-leccion{
    color: white;
    font-weight: 600;
    background: black;
    border-radius: 10%;
    font-family: 'Courier New', Courier, monospace;
}

</style>