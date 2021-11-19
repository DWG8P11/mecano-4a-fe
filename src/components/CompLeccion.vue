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
            var textoConHtml = this.texto.normalize(); // Tener un formato unico para las tildes... hay varias formas de escribir á
            var codigoInicioLetra = "2346025796834";
            var codigoFinLetra    = "2983465908237";
            var letrasConTilde = {'a': ['á', 'Á'], 'e': ['é', 'É'], 'i': ['í', 'Í'], 'o': ['ó', 'Ó'], 'u': ['ú', 'Ú']};

            // Para reemplazar cada una de las letras de la leccion en el texto
            this.letras.forEach(letra => {
                textoConHtml = textoConHtml.replace(new RegExp(`${letra.toLowerCase()}`, 'g'), `${codigoInicioLetra}${letra.toLowerCase()}${codigoFinLetra}`);
                textoConHtml = textoConHtml.replace(new RegExp(`${letra.toUpperCase()}`, 'g'), `${codigoInicioLetra}${letra.toUpperCase()}${codigoFinLetra}`);
            });

           // Para reemplazar letras con tilde
           for (var letraTilde in letrasConTilde) {
               if (this.letras.includes(letraTilde)) {
                   textoConHtml = textoConHtml.replace(new RegExp(`${letrasConTilde[letraTilde][0]}`, 'g'), `${codigoInicioLetra}${letrasConTilde[letraTilde][0]}${codigoFinLetra}`);
                   textoConHtml = textoConHtml.replace(new RegExp(`${letrasConTilde[letraTilde][1]}`, 'g'), `${codigoInicioLetra}${letrasConTilde[letraTilde][1]}${codigoFinLetra}`);
               }
           }
            // La `span` tag hace que el resultado sea un elemento inline.
            textoConHtml = textoConHtml.replace(new RegExp(`${codigoInicioLetra}`, 'g'), '<span class="letra-leccion">')
            textoConHtml = textoConHtml.replace(new RegExp(`${codigoFinLetra}`, 'g'), '</span>')
            
            // TODO: Lidiar con cambios de linea
            

            return textoConHtml;
        },
    }
}
</script>

<style>
:root {
    --tamano-fuente: 16pt;
}

.componente-leccion {
    background:rgb(25, 8, 63);
}

#texto-leccion {
    position: relative;
    font-size: 14pt;
    color: whitesmoke;
}

.letra-leccion{
    display: inline-block;
    width: calc(var(--tamano-fuente)*1.1);
    height: calc(var(--tamano-fuente)*1.1);
    color: white;
    font-weight: 600;
    background: black;
    font-family: 'Courier New', Courier, monospace;
    border-radius: 20%;
    border-style: solid;
    border-width: 1px;
}

</style>