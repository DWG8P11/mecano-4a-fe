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

    <input v-on:keypress="teclaPresionada($event)" v-on:keydown.backspace="borrarPresionada($event)">

    <div id="texto-leccion">
        <span v-html="texto_html" :key="i_posRelActual"/>
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
            default: ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'ñ', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', ';', ':', ,'¿', '?', '¡', '!', '"', "'", '\n', ' ', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '#', '$', '%', '&', '/', '(', ')', '=', '+', '*', '[', ']', '{', '}', '-', '_', '°', '|', '¬', '\\', '`', '~', '^', '@'],
        }
    },

    data: function() {
        return {
            i_posRelActual: 0, // Necesario ponerla acá para que sirva como key de renderización del texto
        }
    },

    created: function() {
        // Estandarizar el texto y las letras
        this.textoN = this.texto.normalize(); // Tener un formato unico para las tildes... hay varias formas de escribir á
        this.letrasN = this.letras.map(letra => { // Normalizar y pasar a minúsculas las letras
            return letra.normalize().toLowerCase();
        })

        this.tiempo_i; // Tiempo de inicio de la leccion

        // Variables de puntaje
        this.milisegundos_tot; // Milisegundos de duración de la lección
        this.n_car_ok = 0; // Número de caracteres correctos
        this.porc_acierto; // Porcentaje efectivo de aciertos
        this.cpm_bruta;
        this.wpm_bruta;
        this.cpm_efectiva;
        this.wpm_efectiva;
        this.puntaje_final;
        
        //this.n_car_prom_palabra = 4.938; // https://www.slideshare.net/quesadagranja/distribucin-por-longitud-de-las-palabras-de-diferentes-idiomas-presentation
        this.n_car_prom_palabra = 4.5;// https://www.um.es/lacell/aelinco/contenido/pdf/51.pdf
        this.letra_aprobada = "letra-aprobada";
        this.letra_leccion = "letra-leccion";
        this.letra_reprobada = "letra-reprobada";
        var letrasConAdiciones = {'á': 'a', 'Á': 'A', 
                                  'é': 'e', 'É': 'E', 
                                  'í': 'i', 'Í': 'I', 
                                  'ó': 'o', 'Ó': 'O', 
                                  'ú': 'u', 'Ú': 'U',
                                  'ü': 'u', 'Ü': 'U',
                             }; // Ya están normalizadas
        // Normalizar letras (para tildes y diéresis)? Pasar a minusculas, al menos

        /* 
            Representaremos el estado actual del texto con la posición actual y
            con un array que indica el estilo que tiene aplicado cada letra.
            Para asegurar el orden correcto, se guardarán las posiciones dentro 
            de las del texto de las letras que hacen parte de la lección.
        */

        // Inicialización de variables globales mencionadas
        this.i_posRelActual = 0; // Posicion global del caracter actual. Poner id
        this.aTexto = this.textoN.split(""); // Texto completo, como array
        this.aPosicionesDeLeccion = []; // Posiciones globales de letras que pertenecen a la lección
        this.aTextoEstilo = []; // Array donde el índice indica la posición relativa de cada letra de la lección con su estilo

        // Llenar aPosicionesDeLeccion y aTextoEstilo
        this.aTexto.forEach((caracter, i) => {
            if (this.letras.includes(caracter.toLowerCase())) {
                this.aPosicionesDeLeccion.push(i);
                this.aTextoEstilo[i] = {clases: [this.letra_leccion], id: undefined};
            }
            
            // Estilizar letras con tilde y diéresis... TODO no hacer? Booleano en DB?
            else if (caracter in letrasConAdiciones && this.letras.includes(letrasConAdiciones[caracter].toLowerCase())) {
                this.aPosicionesDeLeccion.push(i);
                this.aTextoEstilo[i] = {clases: [this.letra_leccion], id: undefined};
            }
            
        })

        // Empezar leccion
        this.empezarLeccion();
    },

    methods: {
        hacerTextoHtmlActual: function() {
            var textoConHtml = ""; // Tener un formato unico para las tildes... por ejemplo, hay varias formas de escribir á
            
            this.aTexto.forEach((letra, i) => {
                textoConHtml += this.htmlLetra(letra, this.aTextoEstilo[i]);
            });

            return textoConHtml;
        },

        htmlLetra: function(letra, atributos) {
            // Si es caracter de cambio de linea
            if (letra == "\n") {
                return "<br/>"
            }

            // Si no tiene estilo definido
            if ( atributos == undefined || (atributos["clases"] == undefined && atributos["id"] == undefined) ) {
                return letra;
            }

            // Iniciar contender en linea para la letra: etiqueta span
            var resultado = '<span';

            // Si tiene clases, agregarlas a la etiqueta
            if (atributos["clases"] != undefined) {
                resultado += ' class="';
                
                atributos["clases"].forEach(clase => {
                    resultado += clase + " ";
                });
                resultado = resultado.substring(0, resultado.length - 1) + '"';
            }

            // Si tiene id definido
            if (atributos["id"] != undefined) {
                resultado += ` id="${atributos["id"]}"`
            }

            // Cerrar etiqueta span
            resultado += `>${letra}</span>`;

            return resultado;
        },

        empezarLeccion: function() {
            this.leccionEnCurso = true;

            this.tiempo_i = new Date();
            this.n_car_ok = 0;

            // Actualizar estilo, basado en primera posición de letra de lección
            var i_posGlobActual = this.aPosicionesDeLeccion[this.i_posRelActual];
            this.aTextoEstilo[i_posGlobActual]["id"] = "letra-actual";

            // Actualizar texto estilizado
            //this.texto_html = this.htmlLetra('p', {})  + this.htmlLetra('r', {clases: [this.letra_leccion]}) + this.htmlLetra('u', {clases: [this.letra_leccion, this.letra_reprobada]}) + this.htmlLetra('e', {clases: [this.letra_leccion, this.letra_aprobada]}) + this.htmlLetra('b', {clases: [this.letra_leccion, this.letra_reprobada], id: "letra-actual"}) + this.htmlLetra('a', {clases: [], id: "letra-actual"});
            this.texto_html = this.hacerTextoHtmlActual();
        },

        acabarLeccion: function(error) {
            // TODO

            // Si no habia leccion en curso, no hacer nada
            if (!this.leccionEnCurso) {
                return;
            }

            if (error != undefined){
                alert(error);
            }

            // Calcular puntajes finales
            this.milisegundos_tot = (new Date() - this.tiempo_i);
            this.leccionEnCurso = false;
            
            this.cpm_bruta = 60000 * this.aPosicionesDeLeccion.length / this.milisegundos_tot;
            this.cpm_efectiva = 60000 * this.n_car_ok / this.milisegundos_tot;
            this.wpm_bruta = this.cpm_bruta / this.n_car_prom_palabra;
            this.wpm_efectiva = this.cpm_efectiva / this.n_car_prom_palabra;

            if (this.aPosicionesDeLeccion.length == 0) {
                this.porc_acierto = 1;
            } else {
                this.porc_acierto = this.n_car_ok / this.aPosicionesDeLeccion.length;
            }

            this.puntaje_final = this.porc_acierto * this.cpm_efectiva;
            
            
            alert(`Acabaste la leccion!\nTiempo de lección: ${this.milisegundos_tot/1000} segundos\nPorcentaje de acierto: ${100*this.porc_acierto}%\nCaracteres por minuto (brutos): ${this.cpm_bruta}\nCaracteres por minuto (efectivos): ${this.cpm_efectiva}\nPalabras por minuto (brutas): ${this.wpm_bruta}\nPalabras por minuto (efectivas): ${this.wpm_efectiva}\nPUNTAJE FINAL: ${this.puntaje_final}`);
            console.log("Acabaste la leccion");
        },

        teclaPresionada: function(evento) {
            // Seguro para evitar que la animacion pueda cambiar si no se esta en medio de una animacion
            if (!this.leccionEnCurso) {
                return;
            }

            // Seguro para evitar que la animacion pueda cambiar si ya no hay más texto
            var i_posGlobActual = this.aPosicionesDeLeccion[this.i_posRelActual];

            if (this.i_posRelActual >= this.aPosicionesDeLeccion.length) {
                this.acabarLeccion(Error("No puedes seguir avanzando!"));
                return   
            }
            
            // Ignorar teclas que no producen output: hecho por defecto por keypress

            // Actualizar Puntaje y 
            // Avanzar la animación: de acuerdo a si fue acierto o no
            if (evento.key == this.aTexto[i_posGlobActual]) {
                this.avanzarAnimacionTextoUno(true);
                this.n_car_ok += 1;
            } else {
                this.avanzarAnimacionTextoUno(false);
            }
            
            
            // Si se llega al final del texto...
            if (this.i_posRelActual > this.aPosicionesDeLeccion.length) {
                this.acabarLeccion("Hubo un error en el programa, se avanzó de más en la lección.");
                return
            }

            // Si se acaba de pasar la ultima letra...
            if (this.i_posRelActual == this.aPosicionesDeLeccion.length) {
                // Si fue correcta
                if (this.aTextoEstilo[i_posGlobActual]["clases"].includes(this.letra_aprobada)) {
                    this.acabarLeccion();
                    return
                }

                // Si fue incorrecta: dar un último chance para corregir
                this.ultimoChance = true;

            }
        },

        borrarPresionada: function(evento) {
            // Seguro para evitar que la animacion pueda cambiar si no se esta en medio de una animacion
            if (!this.leccionEnCurso) {
                return;
            }

            // No hacer nada si nos encontramos al inicio
            if (this.i_posRelActual <= 0) {
                this.i_posRelActual = 0;
                return;
            }
            
            // Actualizar puntaje
            let i_posGlobAnterior = this.aPosicionesDeLeccion[this.i_posRelActual - 1];
            if (this.aTextoEstilo[i_posGlobAnterior]["clases"].includes(this.letra_aprobada)) {
                this.n_car_ok -= 1;
            }

            this.retrocederAnimacionTextoUno();
        },

        avanzarAnimacionTextoUno: function(fueAcierto) {
            /* Asume que se puede avanzar */

            // Cambiar el estilo de la tecla actual, dependiendo de si fue acierto o no
            let i_posGlobActual = this.aPosicionesDeLeccion[this.i_posRelActual];
            
            if (this.aTextoEstilo[i_posGlobActual]["id"] == undefined) {
                acabarLeccion(Error('Hubo un problema con la lógica de la lección!'));
            }
            delete this.aTextoEstilo[i_posGlobActual]["id"];

            if (fueAcierto) {
                this.aTextoEstilo[i_posGlobActual]["clases"].push('letra-aprobada');
            } else {
                this.aTextoEstilo[i_posGlobActual]["clases"].push('letra-reprobada');
            }
            

            // Actualizar la posicion actual
            this.i_posRelActual  += 1;

            // Si ya se llegó al final, acabar el juego
            if (this.i_posRelActual >= this.aPosicionesDeLeccion.length) {
                this.texto_html = this.hacerTextoHtmlActual();
                return;
            }
            // De lo contrario
            // Actualizar el estilo de la nueva posicion
            i_posGlobActual = this.aPosicionesDeLeccion[this.i_posRelActual];
            this.aTextoEstilo[i_posGlobActual]["id"] = "letra-actual"

            // Actualizar el html del texto basado en los nuevos estilos
            this.texto_html = this.hacerTextoHtmlActual();
        },

        retrocederAnimacionTextoUno: function() {
            /* Asume que se puede retroceder */

            // Restaurar estilo tecla actual
            let i_posGlobActual = this.aPosicionesDeLeccion[this.i_posRelActual];
            this.aTextoEstilo[i_posGlobActual] = {"clases": [this.letra_leccion]};

            // Asignar estilo correspondiente a la tecla anterior
            this.i_posRelActual -= 1;
            i_posGlobActual = this.aPosicionesDeLeccion[this.i_posRelActual];
            this.aTextoEstilo[i_posGlobActual] = {"clases": [this.letra_leccion], "id": "letra-actual"}

            // Actualizar el html del texto basado en los nuevos estilos
            this.texto_html = this.hacerTextoHtmlActual();
        }

        
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