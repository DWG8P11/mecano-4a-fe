<template>
<div class="componente-leccion">
    <h1> Adhara </h1>
    
    <div class= letrasNucleo> 
        <span v-for="letra in letras" :key="letra"> {{letra}}-&nbsp;</span><br/>
    </div>

    <!--Retroalimentación sobre la tecla oprimida (se debe aún ubicar y estilizar correctamente):-->
    <div id="retroAnterior" :key="retroAnterior">{{ retroAnterior }} </div>

    <!--Información sobre la tecla a oprimir (se debe aún ubicar y estilizar correctamente):-->
    <div id="retroSiguiente" :key="retroSiguiente">{{ retroSiguiente }} </div>

    <input :placeholder="!leccionEnCurso ? 'Empezar Lección' : 'Continuar Lección'"
            id="inputTexto" v-on:click="empezarLeccion" v-on:keypress="teclaPresionada($event)" v-on:keydown.backspace="borrarPresionada($event)"
            v-on:keydown="teclaAbajo($event.code, $event)" v-on:keyup="teclaArriba($event.code, $event)" 
            v-on:blur="salidoDeInput" readonly>

    <div id="texto-leccion">
        <span v-html="texto_html" :key="i_posRelActual"/>
    </div>

    <Designs/>

</div>
</template>

<script>
import Designs from '@/components/Designs.vue'
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

    components: {
        Designs,
    },

    data: function() {
        return {
            i_posRelActual: 0, // Necesario ponerla acá para que sirva como key de renderización del texto
            retroAnterior: "", // Mensaje de retroalimentación tecla oprimida
            retroSiguiente: "" // Mensaje de retroalimentación sobre tecla a oprimir
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
        this.letra_actual = "letra-actual";
        
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

        // Inicialización de las variables mencionadas que determinan el estado de la leccion.
        this.i_posRelActual = 0; // Posicion global del caracter actual. Poner id
        this.aTexto = this.textoN.split(""); // Texto completo, como array
        this.aPosicionesDeLeccion = []; // Posiciones globales de letras que pertenecen a la lección
        this.aTextoEstilo = []; // Array donde el índice indica la posición relativa de cada letra de la lección con su estilo

        /*
         * Dar clases e ids HTML a cada tecla
         */

        // Llenar aPosicionesDeLeccion y aTextoEstilo
        this.aTexto.forEach((caracter, i) => {
            if (this.letras.includes(caracter.toLowerCase())) {
                this.aPosicionesDeLeccion.push(i);
                this.aTextoEstilo[i] = {clases: [this.letra_leccion], id: undefined};

                if (caracter == "\n") {
                    this.aTextoEstilo[i]["clases"].push("tecla-enter");
                } else if (caracter == " ") {
                    this.aTextoEstilo[i]["clases"].push("tecla-espacio")
                }
            }
            
            // Estilizar letras con tilde y diéresis... TODO no hacer? Booleano en DB?
            else if (caracter in letrasConAdiciones && this.letras.includes(letrasConAdiciones[caracter].toLowerCase())) {
                this.aPosicionesDeLeccion.push(i);
                this.aTextoEstilo[i] = {clases: [this.letra_leccion], id: undefined};
            }
        })

        // Actualizar estilo, basado en primera posición de letra de lección
        var i_posGlobActual = this.aPosicionesDeLeccion[this.i_posRelActual];
        this.aTextoEstilo[i_posGlobActual]["id"] = this.letra_actual;

        // Crear HTML estilizado
        //Ejemplo: this.texto_html = this.htmlLetra('p', {})  + this.htmlLetra('r', {clases: [this.letra_leccion]}) + this.htmlLetra('u', {clases: [this.letra_leccion, this.letra_reprobada]}) + this.htmlLetra('e', {clases: [this.letra_leccion, this.letra_aprobada]}) + this.htmlLetra('b', {clases: [this.letra_leccion, this.letra_reprobada], id: this.letra_actual}) + this.htmlLetra('a', {clases: [], id: this.letra_actual});
        this.texto_html = this.hacerTextoHtmlActual();
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

        empezarLeccion: function() {
            // En caso de que ya haya una lección en curso, no hacer nada
            if (this.leccionEnCurso) {
                return;
            }

            this.leccionEnCurso = true;

            this.tiempo_i = new Date();
            this.n_car_ok = 0;

            // Actualizar retroalimentacion sobre tecla siguiente
            this.actRetroalSiguiente(`Oprime '${this.aTexto[this.aPosicionesDeLeccion[this.i_posRelActual]]}'`);
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

            this.puntaje_final = 3 * this.porc_acierto * this.cpm_bruta;
            
            
            alert(`Acabaste la leccion!\nTiempo de lección: ${this.milisegundos_tot/1000} segundos\nPorcentaje de acierto: ${100*this.porc_acierto}%\nCaracteres efectivos por minuto: ${this.cpm_efectiva}\nPalabras brutas por minuto: ${this.wpm_bruta}\nPalabras efectivas por minuto: ${this.wpm_efectiva}\nPUNTAJE FINAL (3 * Porcentaje de Acierto x Palabras brutas por minuto): ${this.puntaje_final}`);
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
            if ( evento.key == this.aTexto[i_posGlobActual] || (evento.key == "Enter" && this.aTexto[i_posGlobActual] == "\n") ) {
                this.avanzarAnimacionTextoUno(true);
                this.animarTeclado(evento.code, true);
                this.n_car_ok += 1;

                // Actualizar Retroalimentación
                this.actRetroalAnterior("Bien!");
            } else {
                this.avanzarAnimacionTextoUno(false);
                this.animarTeclado(evento.code, false);

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
                this.texto_html = this.hacerTextoHtmlActual();
                return;
            }
            // De lo contrario
            // Actualizar el estilo de la nueva posicion
            i_posGlobActual = this.aPosicionesDeLeccion[this.i_posRelActual];
            this.aTextoEstilo[i_posGlobActual]["id"] = this.letra_actual

            // Actualizar el html del texto basado en los nuevos estilos
            this.texto_html = this.hacerTextoHtmlActual();
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
            document.querySelectorAll(".key").forEach(htmlLetraTeclado => {
                htmlLetraTeclado.classList.remove("keydown");
            });
        },

        animarTeclado(code, fueAcierto) {
            let htmlLetraTeclado = document.querySelector(`.${code}`)

            if (htmlLetraTeclado == undefined){
                return;
            }

            if (fueAcierto) {
                htmlLetraTeclado.classList.add("aprobada");
            } else {
                htmlLetraTeclado.classList.add("reprobada");
            }

            setTimeout(() =>{
                htmlLetraTeclado.classList.remove("reprobada");
                htmlLetraTeclado.classList.remove("aprobada");
            }, 1000)
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
    position:relative;
    top:50pt;

}
.componente-leccion h1{
    text-align: center;
   
}
.componente-leccion p{
    position:absolute;
    top: 50pt;
    text-align: center;

}

.letrasNucleo{
    text-align: center;

}

:root {
    --tamano-fuente: 14pt; /* Variable que determina el tamaño de las cosas */
}


#texto-leccion {
    position: relative;
    font-size: var(--tamano-fuente);
    color: white;
    background: rgb(0,0,0,0.15);
}

.letra-leccion {
    display: inline-block;

    text-align: center;

    width: calc(1rem*1.3);
    height: calc(1rem*1.3);

    color:rgb(243, 239, 201);
    
    font-family: Questa Grande; /* Mejorar */
    font-size: 15pt;

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
    font-size: calc(1.5 * var(--tamano-fuente));
    border: transparent;
    min-height: calc(2 * var(--tamano-fuente));
    text-align: center;
}

#retroSiguiente{
    color: white;
    font-size: calc(1.5 * var(--tamano-fuente));
    border:transparent;
    min-height: calc(2 * var(--tamano-fuente));
    text-align: center;
}

#inputTexto {
    /* TODO hacer que se pueda escribir sin necesidad de estar ubicado sobre esta cajita */

    /* Para centrar el bloque */
    /*display:block;
    margin-right: auto;
    margin-left: auto;

    text-align: center;
    border-radius: 30%;*/
    display:block;
    margin-right: auto;
    margin-left: auto;
    text-align: center;
    font-family: Questa Grande;
    font-size: 15;
   
    right: 50pt;
    width: 15vw;
    height: 1vh;

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

</style>