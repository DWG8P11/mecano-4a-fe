<template>
  <div class="home">
    <div class="css-typing">
      <p>A una tecla más cerca de las estrellas...</p>
    </div>
    
    <img class= "telescopio" src= "../../Imagenes/telescopio2.png">  
    <img class= "maquina"    src= "../../Imagenes/maquina.png"> 
   

  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'Home'
}
</script>


<style scoped>
@font-face {
  font-family: Autery;
  src: url(../../fuentes/Autery.ttf) format("truetype");
}

.home {
    margin: -8px;
    padding: 0;
    background-image: url(../../Imagenes/pexels.jpg);
    background-size: cover;
    background-position: absolute;
    background-repeat: no-repeat;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    
}

.css-typing p {
    
    border-right: .15em solid white;
    white-space: nowrap;
  
}

.css-typing p:nth-child(1) {
    width: 37em;
    -webkit-animation: type 15s steps(40, end), blink .15s step-end infinite alternate;
    animation: type 5s steps(40, end), blink .5s step-end infinite alternate;
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
  font-family:Questa Grande;
  font-size: 20pt;
  color: white;
  position: relative;
  top:0pt;
  left:300pt;

}

.telescopio{
  position: relative;
  top: -6pt;
  left:-500pt;
  width: 90pt;
  height: 55pt;

}

.maquina {
  position: relative;
  top: 25pt;
  right:240pt;
  width: 90pt;
  height: 60pt;

}

</style>
