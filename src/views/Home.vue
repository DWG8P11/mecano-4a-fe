<template>
  <div class="home">
    <div class="css-typing">
      <p>A una tecla más cerca de las estrellas</p>
</div>
    
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'Home'
}
</script>


<style>
@font-face {
  font-family: Autery;
  src: url(../../fuentes/Autery.ttf) format("truetype");
}
.home {
  background-color:darkblue;
}
.css-typing p {
    border-right: .15em solid white;
    white-space: nowrap;
    overflow: hidden;
}

.css-typing p:nth-child(1) {
    width: 37em;
    -webkit-animation: type 15s steps(40, end), blink .10s step-end infinite alternate;
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
  font-family:Autery;
  font-size: 30pt;
  color: white;


}



</style>
