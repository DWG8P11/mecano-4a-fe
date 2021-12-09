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
    </div>

    <img class="localFingers" src="../../Imagenes/hands.jpg" />

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
  background-image: url(../../Imagenes/4.png);
  background-size: cover;
  background-position: absolute;
  background-repeat: no-repeat;
  height: 100vh;
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

/* Título de sección*/

h1 {
    position:absolute;
    top:20pt;
    
    color: white;
    text-align: center;

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
  left: 150pt;
  right: 30pt;
  text-align: justify;
}

/* Estilo teclas guías */

.teclas_guías{
    background: fuchsia;
	position: absolute;
	left:55pt;
	bottom:100px;
	width: 30px;
	height: 40px;
	background:	rgba(170, 170, 170, 0.1);
	border-top-left-radius: 7px 21px;
	border-top-right-radius: 7px 21px;
	border-bottom-right-radius: 10px;
	border-bottom-left-radius: 10px;

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
    left:210pt;
    top:135pt;
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
    top:135pt;
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


/* Imagen con ubicación de dedos*/
.localFingers {
    position:relative;
    top: 40pt;
    right: 250pt;
    width: 100vh;
    height: 40vh;
}
	
</style>