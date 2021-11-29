<template>
  <!-- Llena toda la pantalla -->
  <div class="ModalBack">
    <!-- El cuadro donde está la información -->
    <div class="ModalCuadro">
      <!-- Header -->
      <header class="modal-header">
        <button
          type="button"
          class="btn-close-X"
          @click="cerrarModal"
          aria-label="Close modal"
        >
          X
        </button>

        <slot name="header">
          <h2> Componente Modal Lección </h2>
        </slot>

      </header>


      <section class="modal-body">
        
        <span> Tiempo de lección: {{ segundos.toFixed(2) }} </span> <br/>
        <span> Velocidad: {{ cpme.toFixed(0) }} Caracteres por minuto</span> <br/>
        <span> Precisión: {{ (100*precision).toFixed(0) }}% </span> <br/>
        <span> PUNTAJE: {{ 3*cpme }} </span> <br/>
        <span> Resumen: {{ darFase() }} </span> <br/>
        <span> {{ darTextoResumen() }}  </span> <br/>

      </section>

      <!--footer>
        <button v-on:click="metCerrarModal" id="btnCerrarModal">
          Cerrar
        </button>
      </footer-->
    </div>
  </div>
</template>





<script>

export default {
  name: "CompModalFinLeccion",

  props: {
    segundos: Number,
    cpme: Number,
    precision: Number,
    cpm_min1: Number,
    cpm_min2: Number,
    cpm_min3: Number,
    cpm_min4: Number
  },

  created: function() {
    this.calcularResumen();
  },
  
  methods: {
    cerrarModal: function() {
        console.log("En modal: se dio la orden de cerrar.");
      this.$emit("msjCerrarModal");
    },

    calcularResumen: function() {
      if (this.cpme < this.cpm_min1){
        this.resumen = 0;
      } else if (this.cpme < this.cpm_min2){
        this.resumen = 1;
      } else if (this.cpme < this.cpm_min3){
        this.resumen = 2;
      } else if (this.cpme < this.cpm_min4){
        this.resumen = 3;
      } else {
        this.resumen = 4;
      }
    },

    darFase: function() {
      switch(this.resumen) {
        case 0:
          return ""
          break;
        case 1:
          return "Luna nueva visible"
          break;
        case 2:
          return "Cuarto creciente"
          break;
        case 3:
          return "Luna gibosa creciente"
          break;
        case 4:
          return "Luna llena"
          break;
        default:  // TODO Si error
          return "Hubo un error calculando tu puntaje."
          break;
      }
    },

    darTextoResumen: function() {
      switch(this.resumen) {
        case 0:
          return "¡Uy! Te falto poco para pasar la lección. Intenta de nuevo."
          break;
        case 1:
          return "¡Bien! Lograste sobrepasar este asteroide que se interponía en tu camino."
          break;
        case 2:
          return "¡Muy bien! ¡Estás por fuera del Sistema Solar!"
          break;
        case 3:
          return "¡Excelente! ¡Estás muy cerca de llegar al infinito y más allá!"
          break;
        case 4:
          return "¡Increíble! ¡Sobrepasaste los límites de nuestro Espacio-Tiempo!"
          break;
        default:  // TODO Si error
          return "Hubo un error calculando tu puntaje."
          break;
      }
    },
  }
}

</script>





<style>
.ModalBack {
  background: rgba(0, 0, 0, 0.3);
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.ModalCuadro {
  background: rgb(8, 8, 71); /* Perdona, estaba trabajando en dev y no tengo acceso ni a las imagenes, ni a los colores */
  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  position: relative;
}

.btn-close-X{
  position: absolute;
  top: 0;
  right: 0;
  border: none;
  font-size: 20px;
  padding: 10px;
  cursor: pointer;
  font-weight: bold;
  color: rgb(127, 157, 255);
  background: transparent;
}

footer {
  text-align: center;
  margin: 10px;
}

</style>