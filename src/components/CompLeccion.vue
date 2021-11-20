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
        var letrasConTilde = {'á': 'a', 'Á': 'A', 
                              'é': 'e', 'É': 'E', 
                              'í': 'i', 'Í': 'I', 
                              'ó': 'o', 'Ó': 'O', 
                              'ú': 'u', 'Ú': 'U'
                             };
        // Normalizar letras (para tildes y diéresis)? Pasar a minusculas, al menos

        /* 
            Representaremos el estado actual del texto con la posición actual y
            con un array que indica el estilo que tiene aplicado cada letra.
            Para asegurar el orden correcto, se guardarán las posiciones dentro 
            de las del texto de las letras que hacen parte de la lección.
        */

        // Inicialización de variables globales mencionadas
        this.i_posRelActual = 0; // Posicion global del caracter actual. Poner id
        this.aTexto = this.texto.split(""); // Texto completo, como array
        this.aPosicionesDeLeccion = []; // Posiciones globales de letras que pertenecen a la lección
        this.aTextoEstilo = []; // Array donde el índice indica la posición relativa de cada letra de la lección con su estilo

        // Llenar aPosicionesDeLeccion y aTextoEstilo
        this.aTexto.forEach((caracter, i) => {
            if (this.letras.includes(caracter.toLowerCase())) {
                this.aPosicionesDeLeccion.push(i);
                this.aTextoEstilo[i] = {clases: ["letra-leccion"], id: undefined};
            }
            
            // Estilizar letras con tilde... TODO no hacer? Booleano en DB?
            else if (caracter in letrasConTilde && this.letras.includes(letrasConTilde[caracter])) {
                this.aPosicionesDeLeccion.push(i);
                this.aTextoEstilo[i] = {clases: ["letra-leccion"], id: undefined};
            }
            
        })
        //console.log(this.aPosicionesDeLeccion, this.aTextoEstilo);

        // Actualizar estilo, basado en primera posición de letra de lección
        var i_posGlobActual = this.aPosicionesDeLeccion[this.i_posRelActual];
        this.aTextoEstilo[i_posGlobActual]["id"] = "letra-actual";

        // Actualizar texto estilizado
        this.texto_procesado = this.htmlLetra('p', {})  + this.htmlLetra('r', {clases: ["letra-leccion"]}) + this.htmlLetra('u', {clases: ["letra-leccion", "letra-reprobada"]}) + this.htmlLetra('e', {clases: ["letra-leccion", "letra-aprobada"]}) + this.htmlLetra('b', {clases: ["letra-leccion", "letra-reprobada"], id: "letra-actual"}) + this.htmlLetra('a', {clases: [], id: "letra-actual"});
        //this.texto_procesado = this.hacerTextoHtmlActual();
        

        //this.texto_procesado = this.procesarTextoAHtml();
    },

    methods: {
        hacerTextoHtmlActual: function() {
            var textoConHtml = this.texto.normalize(); // Tener un formato unico para las tildes... hay varias formas de escribir á
            var codigoInicioLetra = "2346025796834";
            var codigoFinLetra    = "2983465908237";

            return textoConHtml;
        },

        htmlLetra: function(letra, atributos) {
            if (atributos == undefined || atributos["clases"] == undefined) {
                return letra;
            }

            var resultado = '<span class="';

            atributos["clases"].forEach(clase => {
                resultado += clase + " ";
            });

            resultado = resultado.substring(0, resultado.length - 1) + '"';

            if (atributos["id"] != undefined) {
                resultado += ` id="${atributos["id"]}"`;
            }

            resultado += `>${letra}</span>`;

            return resultado;
        },

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
            textoConHtml = textoConHtml.replace(new RegExp(`${codigoInicioLetra}`, 'g'), '<span class="letra-leccion">');
            textoConHtml = textoConHtml.replace(new RegExp(`${codigoFinLetra}`, 'g'), '</span>');
            
            // TODO: Lidiar con cambios de linea
            textoConHtml = textoConHtml.replace(new RegExp("\n", 'g'), '<br/>');

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

.letra-leccion {
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

#letra-actual {
    color: yellow;
    border-color: yellow;
    border-width: 2px;
}

.letra-aprobada {
    color: green;
}

.letra-reprobada {
    color: red;
}

</style>