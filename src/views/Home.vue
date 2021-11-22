<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <h1> La Nebulosa de Qwerty </h1>
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
  background-color:darkblue;
}

h1 {
  color: white;
  font-family: Autery;
  font-size:60pt
}
</style>
