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
    <img class="localFingers" src="../../Imagenes/fingers2.png" />
  </div>
</template>

<script>
export default {
  name: "LocalFingers",
};
</script>


<style scoped>
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

@font-face {
  font-family: Questa Grande;
  src: url(../../fuentes/Questa_Grande_Regular.otf) format("Opentype");
}

h1 {
    position:absolute;
    top:20pt;
    
    color: white;
    text-align: center;

}

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
  z-index: 99;
  font-family: Questa Grande;
  font-size: 15pt;
  color: white;
  position: relative;
  bottom: 90pt;
  left: 30pt;
  right: 100pt;
  text-align: justify;
}

.localFingers {
  position: absolute;
  bottom: 40pt;
  height: 50vh;
}
</style>