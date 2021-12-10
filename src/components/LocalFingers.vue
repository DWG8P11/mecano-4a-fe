<template>
  <div class="ubicacion_dedos">
    <h1>¡Empieza el viaje!</h1>

    <div class="Introduccion">
      <p>
        Descubre la estación base en donde posar tus dedos cuando la ingravidez
        te desoriente.<br>
        En la estación Fagua encuentras las teclas guías 
        que son aquellas en donde tus dedos se <br>ubicaran desde el inicio del
        viaje y durante todo el recorrido.
      </p>
    </div>


    <div class= "teclas_guias"> 
        <ul  class="teclas_izq" id="asdfg">

	    	<li><div class="key KeyA"><span>a</span></div></li>
	    	<li><div class="key KeyS"><span>s</span></div></li>
	    	<li><div class="key KeyD"><span>d</span></div></li>
	    	<li><div class="key KeyF"><span>f</span></div></li>
	    	<li><div class="key KeyG"><span>g</span></div></li>
	    	
	    
        </ul>

        <ul class="teclas_der" id="hjklñ">

	    	<li><div class="key KeyH"><span>h</span></div></li>
	    	<li><div class="key KeyJ"><span>j</span></div></li>
	    	<li><div class="key KeyK"><span>k</span></div></li>
	    	<li><div class="key KeyL"><span>l</span></div></li>
            <li><div class="key KeyÑ"><span>ñ</span></div></li>
	    
        </ul>

        
		<ul class="barra_espaciadora" id="bottomrow">
	    	<li><div class="key Space" id="spacebar"></div></li>	
        </ul>

    </div>

    <div class="localFingers">
        <img class="hands" src="../../Imagenes/iconosUbicacion/slide18.png" />
            <div class="iconos_ubicacion_der">
                <img class="Moon"         src="../../Imagenes/iconosUbicacion/slide13.png"/>
                <img class="Saturno"      src="../../Imagenes/iconosUbicacion/slide14.png"/>
                <img class="Sol"          src="../../Imagenes/iconosUbicacion/slide.png" />
                <img class="Tierra"       src="../../Imagenes/iconosUbicacion/slide16.png" />
                <img class="Constelacion" src="../../Imagenes/iconosUbicacion/slide17.png" />
            </div>

             <div class="iconos_ubicacion_izq">
                <img class="Moon2"         src="../../Imagenes/iconosUbicacion/slide13.png"/>
                <img class="Saturno2"      src="../../Imagenes/iconosUbicacion/slide14.png"/>
                <img class="Sol2"          src="../../Imagenes/iconosUbicacion/slide.png" />
                <img class="Tierra2"       src="../../Imagenes/iconosUbicacion/slide16.png" />
                <img class="Constelacion2" src="../../Imagenes/iconosUbicacion/slide17.png" />
            </div>

    </div>



  </div>
</template>

<script>
export default {
  name: "LocalFingers",
};
</script>


<style scoped>

/* Estilo contenedor principal */
.ubicacion_dedos {
  margin: -8px;
  padding: 0;
  background-image: url(../../Imagenes/aurora.jpg);
  background-size: cover;
  background-position: absolute;
  background-repeat: no-repeat;
  height:100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

/* Importación de fuente */

@font-face {
  font-family: Questa Grande;
  src: url(../../fuentes/Questa_Grande_Regular.otf) format("Opentype");
}

@font-face {
  font-family: Autery;
  src: url(../../fuentes/Autery.ttf) format("truetype");
}

/* Título de sección*/

h1 {
    position:absolute;
    top:30pt;
    color: white;
    text-align: center;
    font-family: Autery;

}

/* Animación párrafo*/

.Introduccion p {
  border-right: 0.15em solid white;
  white-space: nowrap;
}

.Introduccion p:nth-child(1) {
  width: 37em;
  -webkit-animation: type 15s steps(40, end),
    blink 0.15s step-end infinite alternate;
  animation: type 5s steps(40, end), blink 0.5s step-end infinite alternate;
  -webkit-animation-fill-mode: forwards;
  animation-fill-mode: forwards;
}

@keyframes type {
  0% {
    width: 0;
  }
  1% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}

@-webkit-keyframes type {
  0% {
    width: 0;
  }
  1% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}

@keyframes blink {
  50% {
    border-color: transparent;
  }
}
@-webkit-keyframes blink {
  50% {
    border-color: transparent;
  }
}

p {
 
  font-family: Questa Grande;
  font-size: 13pt;
  color: white;
  position: relative;
  bottom: 80pt;
  left: 510pt;
  right: 30pt;
  text-align: justify;
}

/* Estilo teclas guías */

.teclas_guías{
	position: absolute;
	left:55pt;
	width: 30px;
	height: 40px;
	background:	rgba(170, 170, 170, 0.1);
	border-top-left-radius: 7px 21px;
	border-top-right-radius: 7px 21px;
	border-bottom-right-radius: 10px;
	border-bottom-left-radius: 10px;
    overflow: hidden;
}

ul {list-style-type: none; width: 784px; margin: 0 auto;}
li {float: left;}

.key{
	display: block;
	color:white;
	font-family: Questa Grande;
    font-size:10pt;
	text-decoration: none;
	text-align: center;
	width: 25px;
	height: 20px;
	margin: 4px;
	background:transparent; 
	border-radius: 4px;
	border-top: 1px solid #222;
	border-bottom:1px solid #222;
	border-right:1px solid #222;
	border-left: 1px solid #222;
	border-color:rgb(250, 250, 250); 
	box-shadow: 1px 1px 1px 1px rgb(248, 252, 252);
    text-shadow: black 0.1em 0.1em 0.2em;
	}
.teclas_izq{
    position:absolute;
    left:230pt;
    top:150pt;
}

#asdfg li div span {
	display: block;
	margin: 13px 0 0;
	text-transform: capitalize;
	line-height: 0pt;
	}
#asdfg li .KeyA {
    background:rgb(30, 174, 152);

}

#asdfg li .KeyS {
    background:rgb(255, 255, 199);

}

#asdfg li .KeyD {
    background:rgb(255, 99, 71);

}

#asdfg li .KeyF {
    background:rgb(115, 239, 249);
    text-decoration: underline;

}

#asdfg li .KeyG {
    background:rgb(115, 239, 249);

}

.teclas_der{
    position:absolute;
    left:373pt;
    top:150pt;
}

#hjklñ li div span {
	display: block;
	margin: 13px 0 0;
	text-transform: capitalize;
	line-height: 0pt;
    

	}
#hjklñ li .KeyH {
     background:rgb(115, 239, 249);
     

}
#hjklñ li .KeyJ {
     background:rgb(115, 239, 249);
     text-decoration: underline;

}
#hjklñ li .KeyK {
     background:rgb(255, 99, 71);

}

#hjklñ li .KeyL {
    background:rgb(255, 255, 199);
}

#hjklñ li .KeyÑ {
     background:rgb(30, 174, 152);

} 

#spacebar {
	width: 110px;
	height: 14.6pt;
	position: absolute;
	left:350pt ;
  bottom:105pt;
  background:rgb(58, 35, 189) ;
}


/* Imagen con ubicación de dedos*/

.hands {
    z-index: 1;
    display:flex;
    position:relative;
    top: 67pt;
    right: 550pt;
    width: 120vh;
    height: 60vh;
}

.iconos_ubicacion_der{
    z-index: 2;
    position:relative;
    right: 290pt;
    top:18pt;
}

.Moon{
    position:relative;
    bottom:90pt;
    left: 20pt;
    width: 50pt;
    height: 30pt;

}

.Saturno{
    position:relative;
    bottom:70pt;
    right: 16pt;
    width: 60pt;
    height: 30pt;

}

.Sol{
    position:relative;
    bottom:105pt;
    right: 118pt;
    width: 60pt;
    height: 30pt;

}

.Tierra{
    position:relative;
    bottom:95pt;
    right: 195pt;
    width: 52pt;
    height: 30pt;

}
.Constelacion{
    position:relative;
    bottom:60pt;
    right: 273pt;
    width: 52pt;
    height: 30pt;
    filter: shadow(color white 1px 1px 1px 1px );

}


.iconos_ubicacion_izq{
    z-index: 2;
    position:relative;
    right: 435pt;
    top:18pt;
}

.Moon2{
    position:relative;
    bottom:125pt;
    left: -24pt;
    width: 50pt;
    height: 30pt;

}

.Saturno2{
    position:relative;
    bottom:107pt;
    right: 101pt;
    width: 60pt;
    height: 30pt;

}

.Sol2{
    position:relative;
    bottom:140pt;
    right: 118pt;
    width: 60pt;
    height: 30pt;

}

.Tierra2{
    position:relative;
    bottom:130pt;
    right: 152pt;
    width: 52pt;
    height: 30pt;

}
.Constelacion2{
    position:relative;
    bottom:100pt;
    right: 182pt;
    width: 52pt;
    height: 30pt;
    filter: shadow(color white 1px 1px 1px 1px );

}
	
</style>