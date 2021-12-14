<template>
<div class="componente-leccion" :key="this.id">
    <h1> {{ titulo }} </h1>
  
    <img class = "planetas"   src = "../../Imagenes/planetas.png">
    <img class = "telescopio" src = "../../Imagenes/telescopio.png">
    
    
    <div class= letrasNucleo> 
        <span v-for="letra in letras" :key="letra"> {{letra}}-&nbsp;</span><br/>
    </div>

    <!--Retroalimentación sobre la tecla oprimida (se debe aún ubicar y estilizar correctamente):-->
    <!--div id="retroAnterior" :key="retroAnterior">{{ retroAnterior }} </div-->

    <!--Información sobre la tecla a oprimir (se debe aún ubicar y estilizar correctamente):-->
    <!--div id="retroSiguiente" :key="retroSiguiente">{{ retroSiguiente }} </div-->

    <input :placeholder="!leccionEnCurso ? 'Empezar' : 'Continuar'"
            id="inputTexto" v-on:click="empezarLeccion(false)" v-on:keypress="teclaPresionada($event)" v-on:keydown.backspace="borrarPresionada($event)"
            v-on:keydown="teclaAbajo($event.code, $event)" v-on:keyup="teclaArriba($event.code, $event)" 
            v-on:blur="salidoDeInput" readonly>

    <div id="texto-leccion">
        <span v-html="texto_html" :key="i_posRelActual"/>
    </div>


    <CompModalLeccion v-if="modalAbierto" v-on:msjCerrarModal="cerrarModal" :key="modalAbierto"
                      v-on:msjReiniciarLeccion="cerrarModalYReiniciar"
                      :segundos="milisegundos_tot/1000" :cpme="cpm_efectiva" :precision="porc_acierto"
                      :cpm_min1="cpmMin1" :cpm_min2="cpmMin2" :cpm_min3="cpmMin3" :cpm_min4="cpmMin4"
                      v-on:msjContinuar="cargarSiguienteLeccion"/>
    <Designs/>

    <img class= "cuerpo_celeste" :src="imagen">


</div>
</template>

<script>

import CompModalLeccion from "./CompModalFinLeccion.vue";
import gql              from "graphql-tag";


import Designs from '@/components/Designs.vue'
export default {
    name: 'CompLeccion',

    props: {
        id: {
            type: String,
            default: "LeccionNoIdentificada"
        },

        titulo: {
            type: String,
            default: "Título de la Lección"
        },

        texto: {
            type: String,
            default: "No se cargó un texto para esta lección.",
        },

        letras: {
            type: Array,
            default: ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'ñ', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', ';', ':', ,'¿', '?', '¡', '!', '"', "'", '\n', ' ', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '#', '$', '%', '&', '/', '(', ')', '=', '+', '*', '[', ']', '{', '}', '-', '_', '°', '|', '¬', '\\', '`', '~', '^', '@'],
        },

        imagen: {
            type: String
        },

        cpmMin1: {
            type: Number,
            default: 100
        },

        cpmMin2: {
            type: Number,
            default: 200
        },
        
        cpmMin3: {
            type: Number,
            default: 300
        },
        
        cpmMin4: {
            type: Number,
            default: 400
        },

        ignorarMayus: {
            type: Boolean,
            default: true,
        },

        ignorarTildes: {
            type: Boolean,
            default: true,
        },

        ignorarDieres: {
            type: Boolean,
            default: true,
        },

        nivel: {
            type: Number
        },

        nLeccion: {
            type: Number
        }
    },

    components: {
        CompModalLeccion,
        Designs,
        },


    data: function() {
        return {
            i_posRelActual: 0, // Necesario ponerla acá para que sirva como key de renderización del texto
            retroAnterior: "", // Mensaje de retroalimentación tecla oprimida
            retroSiguiente: "", // Mensaje de retroalimentación sobre tecla a oprimir
            modalAbierto: false, // Indica si el componente modal (ventana emergente) está abierto
        }
    },

    updated: function() {
        let letraActualHtml = document.getElementById(this.letra_actual)
        if (letraActualHtml)letraActualHtml.scrollIntoView({block: "center", behavior: "smooth"});
    },

    created: function() {
        this.borrarKeyACode = {}
        this.borrarCodeAKeys = {}
        // Estandarizar el texto y las letras
        this.textoN = this.texto.normalize(); // Tener un formato unico para las tildes... hay varias formas de escribir á
        this.letrasN = this.letras.map(letra => { // Normalizar y pasar a minúsculas las letras
            return letra.normalize().toLowerCase();
        })

        // Variables para puntaje
        this.tiempo_i; // Tiempo de inicio de la leccion

        this.milisegundos_tot; // Milisegundos de duración de la lección
        this.n_car_ok; // Número de caracteres correctos
        this.porc_acierto; // Porcentaje efectivo de aciertos
        this.cpm_bruta;
        this.wpm_bruta;
        this.cpm_efectiva;
        this.wpm_efectiva;
        this.puntaje_final;
        
        // Constantes
        //this.n_car_prom_palabra = 4.938; // https://www.slideshare.net/quesadagranja/distribucin-por-longitud-de-las-palabras-de-diferentes-idiomas-presentation
        this.n_car_prom_palabra = 4.5;// https://www.um.es/lacell/aelinco/contenido/pdf/51.pdf
        this.letra_aprobada = "letra-aprobada";
        this.letra_leccion = "letra-leccion";
        this.letra_reprobada = "letra-reprobada";
        this.letra_actual = "letra-actual";
        
        this.keysACodes = {
                "0": "Digit0",
                "1": "Digit1",
                "2": "Digit2",
                "3": "Digit3",
                "4": "Digit4",
                "5": "Digit5",
                "6": "Digit6",
                "7": "Digit7",
                "8": "Digit8",
                "9": "Digit9",
                "°": "Backquote",
                "|": "Backquote",
                "¬": "Backquote",
                "!": "Digit1",
                "\"": "Digit2",
                "#": "Digit3",
                "$": "Digit4",
                "%": "Digit5",
                "&": "Digit6",
                "/": "Digit7",
                "(": "Digit8",
                ")": "Digit9",
                "=": "Digit0",
                "?": "Minus",
                "'": "Minus",
                "¡": "Equal",
                "¿": "Equal",
                "\\": "Minus",
                "Q": "KeyQ",
                "q": "KeyQ",
                "@": "KeyQ",
                "W": "KeyW",
                "w": "KeyW",
                "E": "KeyE",
                "e": "KeyE",
                "R": "KeyR",
                "r": "KeyR",
                "T": "KeyT",
                "t": "KeyT",
                "Y": "KeyY",
                "y": "KeyY",
                "U": "KeyU",
                "u": "KeyU",
                "I": "KeyI",
                "i": "KeyI",
                "O": "KeyO",
                "o": "KeyO",
                "P": "KeyP",
                "p": "KeyP",
                "¨": "BracketLeft",
                "´": "BracketLeft",
                "*": "BracketRight",
                "+": "BracketRight",
                "~": "BracketRight",
                "]": "Backslash",
                "}": "Backslash",
                "À": "KeyA",
                "a": "KeyA",
                "S": "KeyS",
                "s": "KeyS",
                "D": "KeyD",
                "d": "KeyD",
                "F": "KeyF",
                "f": "KeyF",
                "G": "KeyG",
                "g": "KeyG",
                "H": "KeyH",
                "h": "KeyH",
                "J": "KeyJ",
                "j": "KeyJ",
                "K": "KeyK",
                "k": "KeyK",
                "L": "KeyL",
                "l": "KeyL",
                "Ñ": "Semicolon",
                "ñ": "Semicolon",
                "[": "Quote",
                "{": "Quote",
                "^": "IntlBackslash",
                ">": "IntlBackslash",
                "<": "IntlBackslash",
                "Z": "KeyZ",
                "z": "KeyZ",
                "X": "KeyX",
                "x": "KeyX",
                "C": "KeyC",
                "c": "KeyC",
                "V": "KeyV",
                "v": "KeyV",
                "B": "KeyB",
                "b": "KeyB",
                "N": "KeyN",
                "n": "KeyN",
                "M": "KeyM",
                "m": "KeyM",
                ";": "Comma",
                ",": "Comma",
                ":": "Period",
                ".": "Period",
                "_": "Slash",
                "-": "Slash"
            }

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

        // Inicialización de las variables que determinan el contexto de la leccion.
        this.aTexto = this.textoN.split(""); // Texto completo, como array
        this.aPosicionesDeLeccion = []; // Posiciones globales de letras que pertenecen a la lección
        this.aTextoEstilo = []; // Array donde el índice indica la posición relativa de cada letra de la lección con su estilo

        /*
         * Dar clases e ids HTML iniciales a cada tecla
         */

        // Llenar aPosicionesDeLeccion y aTextoEstilo
        this.aTexto.forEach((caracter, i) => {
            if (this.letrasN.includes(caracter.toLowerCase())) {
                this.aPosicionesDeLeccion.push(i);
                this.aTextoEstilo[i] = {clases: [this.letra_leccion], id: undefined};

                if (caracter == "\n") {
                    this.aTextoEstilo[i]["clases"].push("tecla-enter");
                } else if (caracter == " ") {
                    this.aTextoEstilo[i]["clases"].push("tecla-espacio")
                }
            }
            
            // Estilizar letras con tilde y diéresis... TODO no hacer? Booleano en DB?
            else if (caracter in letrasConAdiciones && this.letrasN.includes(letrasConAdiciones[caracter].toLowerCase())) {
                this.aPosicionesDeLeccion.push(i);
                this.aTextoEstilo[i] = {clases: [this.letra_leccion], id: undefined};
            }
        })

        // Crear HTML estilizado
        //Ejemplo: this.texto_html = this.htmlLetra('p', {})  + this.htmlLetra('r', {clases: [this.letra_leccion]}) + this.htmlLetra('u', {clases: [this.letra_leccion, this.letra_reprobada]}) + this.htmlLetra('e', {clases: [this.letra_leccion, this.letra_aprobada]}) + this.htmlLetra('b', {clases: [this.letra_leccion, this.letra_reprobada], id: this.letra_actual}) + this.htmlLetra('a', {clases: [], id: this.letra_actual});
        this.hacerTextoHtmlActual();
    },

    methods: {
        hacerTextoHtmlActual: function() {
            var textoConHtml = ""; // Tener un formato unico para las tildes... por ejemplo, hay varias formas de escribir á
            
            this.aTexto.forEach((letra, i) => {
                textoConHtml += this.htmlLetra(letra, this.aTextoEstilo[i]);
            });

            this.texto_html = textoConHtml;

            return textoConHtml;
        },

        htmlLetra: function(letra, atributos) {
            /*
             * Asignar HTML a cada letra segun los atributos dados
             */

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

            if (letra == "\n") {
                resultado += "<br/><br/>"
            }

            return resultado;
        },

        empezarLeccion: function(forzar = false) {
            // En caso de que ya haya una lección en curso, no hacer nada
            if (this.leccionEnCurso && !forzar) {
                return;
            }

            // Borrar estilos adicionales a los iniciales
            this.aPosicionesDeLeccion.forEach(i => {
                this.aTextoEstilo[i]["clases"] = this.aTextoEstilo[i]["clases"].filter(clase => {
                    return clase != this.letra_aprobada && clase != this.letra_reprobada
                })

                delete this.aTextoEstilo[i]["id"];
            })

            /*
             * Inicializar variables de estado de la lección
             * y Actualizar estilo, basado en primera posición de letra de lección
             */

            // Inicialización de las variables que determinan el estado de la lección
            this.i_posRelActual = 0;
            var i_posGlobActual = this.aPosicionesDeLeccion[this.i_posRelActual];
            this.n_car_ok = 0;
            this.aTextoEstilo[i_posGlobActual]["id"] = this.letra_actual;
            this.leccionEnCurso = true;

            this.hacerTextoHtmlActual();
            let inputTexto = document.getElementById("inputTexto");
            if (inputTexto == null) acabarLeccion("La página no cargó todos los elementos necesarios para la lección");
            inputTexto.focus();

            console.log("Despues del focus de empezar leccion: document.getElementById(this.letra_actual)", document.getElementById(this.letra_actual));
            

            this.tiempo_i = new Date();

            // Actualizar retroalimentacion sobre tecla siguiente
            this.actRetroalSiguiente(`Oprime '${this.aTexto[this.aPosicionesDeLeccion[this.i_posRelActual]]}'`);

            // Actualizar animacion teclado
            this.actualizarAnimacionTeclado();
        },

        acabarLeccion: function(error) {
            // TODO

            // Si no habia leccion en curso, no hacer nada
            if (!this.leccionEnCurso) {
                // TODO mejorar
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

            this.puntaje_final = 3 * this.porc_acierto * this.cpm_bruta;

            // Guardar en DB
            this.guardarPuntaje();

            // Mostrar ventana con puntaje
            this.modalAbierto = true;

            // Calcular y guardar id de la siguiente leccion
            this.hallarIdSigLec();
            
            
            //alert(`Acabaste la leccion!\nTiempo de lección: ${this.milisegundos_tot/1000} segundos\nPorcentaje de acierto: ${100*this.porc_acierto}%\nCaracteres efectivos por minuto: ${this.cpm_efectiva}\nPalabras brutas por minuto: ${this.wpm_bruta}\nPalabras efectivas por minuto: ${this.wpm_efectiva}\nPUNTAJE FINAL (3 * Porcentaje de Acierto x Palabras brutas por minuto): ${this.puntaje_final}`);
        },

        teclaPresionada: function(evento) {
            
            // Borrar: solo escrito para generar los diccionarios deseados
            if (evento.key in this.borrarKeyACode) {
                this.borrarKeyACode[evento.key].push(evento.code)
            } else {
                this.borrarKeyACode[evento.key] = [evento.code]
            }

            if (evento.code in this.borrarCodeAKeys) {
                this.borrarCodeAKeys[evento.code].push(evento.key)
            } else {
                this.borrarCodeAKeys[evento.code] = [evento.key]
            }

            console.log(this.borrarKeyACode);
            console.log(this.borrarCodeAKeys);

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
            if ( evento.key == this.aTexto[i_posGlobActual] || (evento.key == "Enter" && this.aTexto[i_posGlobActual] == "\n") ) {
                this.avanzarAnimacionTextoUno(true);
                this.animarTecladoPresion(evento.code, true);
                this.actualizarAnimacionTeclado();
                this.n_car_ok += 1;

                // Actualizar Retroalimentación
                this.actRetroalAnterior("Bien!");
            } else {
                this.avanzarAnimacionTextoUno(false);
                this.animarTecladoPresion(evento.code, false);
                this.actualizarAnimacionTeclado();

                // Actualizar retroalimentación
                let debiste;
                if (![' ', '\n'].includes(this.aTexto[i_posGlobActual])) {
                    debiste = this.aTexto[i_posGlobActual];
                } else if (this.aTexto[i_posGlobActual] == "\n") {
                    debiste = "<Enter>";
                } else {
                    debiste = "<Espacio>";
                }
                this.actRetroalAnterior(`¡Uy! Presionaste '${evento.key}', pero debiste oprimir '${debiste}'`);
            }
            
            
            // Si se llega al final del texto...
            if (this.i_posRelActual > this.aPosicionesDeLeccion.length) {
                this.acabarLeccion("Hubo un error en el programa, se avanzó de más en la lección.");
                return
            }

            // Si se acaba de pasar la ultima letra...
            let i_posGlobAnterior = i_posGlobActual;
            if (this.i_posRelActual == this.aPosicionesDeLeccion.length) {
                // Si fue correcta
                if (this.aTextoEstilo[i_posGlobAnterior]["clases"].includes(this.letra_aprobada)) {
                    this.acabarLeccion();
                    return
                }

                // Si fue incorrecta: dar un último chance para corregir
                this.ultimoChance = true;
                this.actRetroalSiguiente("¡Borra!, si quieres continuar.");
            } else { // Es decir, si se sigue en medio de la lección
                // Actualizar retroalimentacion sobre tecla siguiente
                this.actRetroalSiguiente();
            }

        },

        borrarPresionada: function(evento) {
            // Seguro para evitar que la animacion pueda cambiar si no se esta en medio de una animacion
            if (!this.leccionEnCurso) {
                return;
            }

            // Seguro en caso de que hayamos avanzado mucho en el texto
            if (this.i_posRelActual > this.aPosicionesDeLeccion.length) {
                this.acabarLeccion(Error("No puedes seguir avanzando!"));
                return   
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

            // Retroceder animacion del texto
            this.retrocederAnimacionTextoUno();

            // Retroceder animacion del teclado
            this.actualizarAnimacionTeclado();
            
            // Actualizar retroalimentacion sobre tecla anterior
            this.actRetroalAnterior('Borraste');

            // Actualizar retroalimentacion sobre tecla siguiente
            this.actRetroalSiguiente();
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
                this.aTextoEstilo[i_posGlobActual]["clases"].push(this.letra_aprobada);
            } else {
                this.aTextoEstilo[i_posGlobActual]["clases"].push(this.letra_reprobada);
            }
            

            // Actualizar la posicion actual
            this.i_posRelActual  += 1;

            // Si ya se llegó al final, acabar el juego
            if (this.i_posRelActual >= this.aPosicionesDeLeccion.length) {
                this.hacerTextoHtmlActual();
                return;
            }
            // De lo contrario
            // Actualizar el estilo de la nueva posicion
            i_posGlobActual = this.aPosicionesDeLeccion[this.i_posRelActual];
            this.aTextoEstilo[i_posGlobActual]["id"] = this.letra_actual

            // Actualizar el html del texto basado en los nuevos estilos
            this.hacerTextoHtmlActual();
        },

        retrocederAnimacionTextoUno: function() {
            /* Asume que se puede retroceder */

            // Restaurar estilo tecla actual, a menos que estemos en el ultimo chance
            let i_posGlobActual = this.aPosicionesDeLeccion[this.i_posRelActual];
            if (this.i_posRelActual != this.aPosicionesDeLeccion.length) {
                this.aTextoEstilo[i_posGlobActual]["clases"] = this.aTextoEstilo[i_posGlobActual]["clases"].map(clase => {
                    if (clase != this.letra_aprobada && clase != this.letra_reprobada) return clase;
                });
                delete this.aTextoEstilo[i_posGlobActual]["id"];
            }

            // Asignar estilo correspondiente a la tecla anterior
            this.i_posRelActual -= 1;
            i_posGlobActual = this.aPosicionesDeLeccion[this.i_posRelActual];
            this.aTextoEstilo[i_posGlobActual]["clases"] = this.aTextoEstilo[i_posGlobActual]["clases"].map(clase => {
                if (clase != this.letra_aprobada && clase != this.letra_reprobada) return clase;
            });
            this.aTextoEstilo[i_posGlobActual]["id"] = this.letra_actual;

            // Actualizar el html del texto basado en los nuevos estilos
            this.texto_html = this.hacerTextoHtmlActual();
        },

        actRetroalAnterior: function(mensaje) {
            this.retroAnterior= mensaje;
            setTimeout(() => this.retroAnterior = "", 1000);
        },

        actRetroalSiguiente: function(mensaje) {
            if (mensaje != undefined) {
                this.retroSiguiente = mensaje;
                return;
            }
            let i_posGlobActual = this.aPosicionesDeLeccion[this.i_posRelActual];
            // Determinar mensaje para tecla a oprimir
            let oprimir = "";
            if (![' ', '\n'].includes(this.aTexto[i_posGlobActual])) {
                oprimir = this.aTexto[this.aPosicionesDeLeccion[this.i_posRelActual]];
            } else if (this.aTexto[i_posGlobActual] == "\n") {
                oprimir = "<Enter>";
            } else {
                oprimir = "<Espacio>";
            }

            // Determinar si mostrar una adicion al mensaje de tecla a oprimir
            let adicion = "";
            if ( this.i_posRelActual > 0 && this.aTextoEstilo[ this.aPosicionesDeLeccion[this.i_posRelActual - 1] ]["clases"].includes(this.letra_reprobada) ){
                adicion = " o Borra"
            }

            // Actualizar mensaje
            this.retroSiguiente = `Oprime '${oprimir}'${adicion}`;
        },

        cerrarModal: function() {
            // console.log("En CompLeccion: orden de cerrar modal recibida.");
            this.modalAbierto = false;
        },

        teclaAbajo: function(code, evento) {
            console.log(evento);
            let htmlLetra = document.querySelector(`.${code}`);
            if (htmlLetra != undefined) {
                htmlLetra.classList.add("keydown");
            }
        },

        teclaArriba: function(code, evento) {
            let htmlLetra = document.querySelector(`.${code}`);
            if (htmlLetra != undefined) {
                htmlLetra.classList.remove("keydown");
            }
        },

        salidoDeInput: function () {
            // Resetear teclado si me salgo de la lección
            document.querySelectorAll(".key").forEach(htmlTecla => {
                htmlTecla.classList.remove("keydown");
            });
        },

        animarTecladoPresion(code, fueAcierto) {
            let htmlTecla = document.querySelector(`.${code}`)

            if (htmlTecla == undefined){
                return;
            }

            if (fueAcierto) {
                htmlTecla.classList.add("aprobada");
            } else {
                htmlTecla.classList.add("reprobada");
            }

            setTimeout(() =>{
                htmlTecla.classList.remove("reprobada");
                htmlTecla.classList.remove("aprobada");
            }, 1000)
        },

        actualizarAnimacionTeclado: function () {
            // Seguro de que hay tecla siguiente por oprimir
            if (this.i_posRelActual < 0 || this.i_posRelActual >= this.aPosicionesDeLeccion.length - 1) {
                return;
            }

            let key;
            let code;

            // Remover color de actual de la tecla anterior
            if (this.i_posRelActual > 0) {
                key = this.aTexto[ this.aPosicionesDeLeccion[this.i_posRelActual - 1] ];
                code = this.keysACodes[  key  ];
                document.querySelector(`.${code}`).classList.remove("actual");
            }

            if (this.i_posRelActual < this.aPosicionesDeLeccion.length - 1) {
                key = this.aTexto[ this.aPosicionesDeLeccion[this.i_posRelActual + 1] ];
                code = this.keysACodes[  key  ];
                document.querySelector(`.${code}`).classList.remove("actual");
            }

            // Dar estilo a la tecla actual
            key = this.aTexto[ this.aPosicionesDeLeccion[this.i_posRelActual] ];
            code = this.keysACodes[  key  ];
            let htmlTecla = document.querySelector(`.${code}`);

            htmlTecla.classList.add("actual");

        },

        cerrarModalYReiniciar: function() {
            this.cerrarModal();
            this.empezarLeccion(true);
            let inputTexto = document.getElementById("inputTexto");
            if (inputTexto == null) acabarLeccion("La página no cargó todos los elementos necesarios para la lección");
            inputTexto.focus();
        },

        guardarPuntaje: function() {
            console.log("Se va registrar el puntaje en la base de datos...");

            if (!localStorage.getItem("usuario")) {
                alert("¡No estas autenticado!");
                return;
            }

            this.$apollo.mutate({
                mutation: gql`
                mutation ActualizarToken($puntaje: PuntajeIn!) {
                    crearPuntaje(puntaje: $puntaje) {
                        usuario
                        leccionId
                    }
                }
                `,
                variables: {
                    puntaje: {
                        usuario: localStorage.getItem("usuario"),
                        leccionId: this.id,
                        precision: this.porc_acierto,
                        cpm_e: parseInt(this.cpm_efectiva),
                        segundos: this.milisegundos_tot/1000,
                        fecha: String( Date.now() )
                    }
                }}
            ).then(respuesta => {
                alert("¡Puntaje guardado exitosamente!", respuesta);
            }).catch(error => {
                let mensaje = error.message + "\n\n";
                
                if (error.networkError) {
                    error.networkError.result.errors.forEach(errorApi => {
                        mensaje += errorApi.message + "\n";
                    });
                }

                alert(`Error -${mensaje}`);
            });
        },

        hallarIdSigLec: async function() {
            await this.$apollo
                .mutate({
                    mutation: gql`
                        query TraerLeccionesLigeras($nivel: Int) {
                            traerLeccionesLigeras(nivel: $nivel) {
                                id
                                titulo
                                nivel
                                n_leccion
                            }
                        }
                    `,
                    variables: {
                        nivel: null // En el router me aseguro de que sea un entero
                    }
                })
                .then(respuesta => {
                    let listaLecciones = respuesta.data.traerLeccionesLigeras;

                    // Ordenar por numero de nivel y luego por # leccion
                    console.log("Va a ordenar la lista");
                    listaLecciones.sort((a, b) => { 
                        if (a.nivel != b.nivel) {
                            return a.nivel - b.nivel
                        } 
                        return a.n_leccion - b.n_leccion
                    });

                    let encontrado = false;
                    let iEnc = listaLecciones.length;
                    let leccion;
                    console.log("Antes del for");
                    for (let i = 0; i < listaLecciones.length; i++){
                        
                        leccion = listaLecciones[i];
                        console.log("Entro al for", leccion);
                        if (leccion.id == this.id) {
                            console.log("Encontro la actual")
                            encontrado = true;
                            iEnc = i;
                            break;
                        }
                    }
                    
                    console.log("Leccion actual encontrada en el indice", iEnc);
                    if (encontrado && iEnc < listaLecciones.length - 1) {
                        this.idLecSig = listaLecciones[iEnc+1].id;
                    } else {
                        this.idLecSig = listaLecciones[0].id;
                    }
                }).catch(error => {console.log("No se pudo traer la lista actual de lecciones", JSON.stringify(error))});
        },

        cargarSiguienteLeccion: function() {
            // console.log("Justo antes de cargarSiguienteLeccion, el id actual es", this.id);
            // if (this.idLecSig <= 0){
            //     console.log("No hay siguiente leccion.");
            //     this.$router.push({name: "ViewVerNiveles"})
            //     this.$forceUpdate();
            // } else {
            //     console.log("A punto de cargar al  siguiente leccion", this.idLecSig);
            //     this.$router.push({name: `Leccion de DB`, params:{idLeccion: this.idLecSig}})
            //     this.$forceUpdate();
            // }
            // console.log("Justo despues cargarSiguienteLeccion, el id es", this.id);
            // this.cerrarModal();
            // console.log("Justo despues de cerrar el Modal, el id es", this.id);
            // this.$forceUpdate();

            this.$emit("msjCargarLeccion", this.idLecSig);
        }
    }
}
</script>

<style>


@font-face {
  font-family:Questa Grande;
  src: url(../../fuentes/Questa_Grande_Regular.otf) format("OpenType");
}


.componente-leccion{   
    position: relative;
    width: 100%;
    margin-top:5rem;
    height: calc(100vh - 5rem - 3.15rem);
    z-index: 200;

    font-family: Questa Grande; /* Queremos esta fuente. No la estabamos usando */
}

.componente-leccion h1{
    text-align: center;
    line-height: 0pt;
    font-size:16pt;    
}

.planetas{
   
    position:absolute;
    top:1pt;
    width: 80pt;
    height:50pt ;
    transform: translate(-50%);
    left:calc(50vw - 4rem);
}
.telescopio{

    position:absolute;
    top:25pt;
    width: 55pt;
    height:30pt ;
    transform: translate(-50%);
    left:calc(50vw + 4.5rem);
}

.letrasNucleo{
    text-align: center;
    line-height: 6pt;
    font-size: 11pt;
    

}

:root {
    --tamano-fuente: 1rem; /* Variable que determina el tamaño de las cosas */
}


#texto-leccion {
   
    margin-left: 5rem;
    margin-right: 5rem;
    margin-top: 1rem;
    font-size: var(--tamano-fuente);
    color: white;
    background: rgb(0,0,0,0.15);
    text-align: justify;
    position:relative;
    max-height: calc(100vh - 8rem - 3.15rem - 13.25rem - 4rem); /* Toda la vista vertical - encabezado - footer - teclado - margen*/
    overflow:hidden;
  

}

.letra-leccion {
    display: inline-block;

    text-align: center;

    width: calc(var(--tamano-fuente)*1.1);
    height: calc(var(--tamano-fuente)*1.2);

    color:rgb(243, 239, 201);
    
    font-family: Questa Grande; /* Mejorar */
    font-size: var(--tamano-fuente);

    border-radius: 20%;
    border-style: solid;
    border-width: 1px;

    position: relative; /* Lo que permite que top, bottom, etc. funcionen */
    bottom: 0pt;
}

#letra-actual {
    /* Mejorar */
    color: rgb(241, 150, 117);
    border-color:orangered;
    border-width: 2px;
}

.letra-aprobada {
    /* Mejorar */
    color:rgb(30, 174, 152);
}

.letra-reprobada {
    /* Mejorar */
    color:crimson;
}

.tecla-enter {
    bottom: -5pt; /* Funciona gracias al position-relative en letra-leccion */

    -webkit-clip-path: polygon(100% 0, 50% 0, 50% 50%, 0 50%, 0 100%, 100% 100%); /* Un polígono (pentágono) */
    clip-path: polygon(100% 0, 50% 0, 50% 50%, 0 50%, 0 100%, 100% 100%); /* En caso de que el primero falle */
}

.tecla-espacio {
    bottom: -5pt; /* Funciona gracias al position-relative en letra-leccion */

    margin-left: 1pt;
    margin-right: 1pt;  

    width: calc(1rem * 2);
    height: calc(1rem * 0.5);
    
    border-radius: 15%;
}

#retroAnterior{
   
    color: white;
    font-size: 15pt;
    border: transparent;
    text-align: center;
    line-height: 20pt;
}

#retroSiguiente{
    color: white;
    font-size:15pt;
    border:transparent;
    text-align: center;
    line-height: 30pt;
}

#inputTexto {
    /* TODO hacer que se pueda escribir sin necesidad de estar ubicado sobre esta cajita */

    /* Para centrar el bloque */
    display:block;
    position: relative;
    z-index: 999;
    transform: translate(-50%);
    left: 50vw;
    margin-top: 2pt;
    text-align: center;
    font-family: Questa Grande;
    font-size: 15;
   
    right: 50pt;
    width: 3.8rem;
    height: 0vh;
    line-height: 10pt;

    background: rgb(30, 174, 152);
    border: 1px solid #e5e7e9;
    

    border-radius: 15px;
    padding: 9px 15px;

    color: #e5e7e9;
    background:transparent;
    border: 1px solid rgb(30, 174, 152);
}

#inputTexto::-webkit-input-placeholder{
    color:white;
    font-style: bold;
}

#inputTexto:focus::-webkit-input-placeholder{
    color:transparent;
   
}

#inputTexto:focus{
  outline:none;
  border:none;

}

.cuerpo_celeste{
    position:absolute;
    max-height: 13.25rem; /* Altura del teclado */
    max-width: calc(100% - 10rem - 53.3333rem); /* all - texto margin - size of keyboard*/

    right: 5rem;
    bottom: 1rem;
}

</style>