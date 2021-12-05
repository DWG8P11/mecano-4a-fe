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

        <img class="luna_nueva" src="../../Imagenes/ICONO_LUNA/2.png" />
        <img class="luna_creciente" src="../../Imagenes/ICONO_LUNA/3.png" />
        <img class="cuarto_creciente" src="../../Imagenes/ICONO_LUNA/4.png" />
        <img class="creciente_gibosa" src="../../Imagenes/ICONO_LUNA/5.png" />
        <img class="luna_llena" src="../../Imagenes/ICONO_LUNA/6.png" />
      </header>

      <section class="modal-body">
        <span> Tiempo de lección: {{ segundos.toFixed(2) }} segundos </span>
        <br />
        <span>
          Velocidad: {{ (cpme / 5).toFixed(0) }} palabras por minuto
        </span>
        <br />
        <span> Precisión: {{ (100 * precision).toFixed(0) }}% </span> <br />
        <span> Puntaje: {{ (3 * cpme).toFixed(0) }} </span> <br /><br />
        <span> Resumen: {{ darFase() }} </span> <br />
        <span> {{ darTextoResumen() }} </span> <br />

        <!-- <button > -->

        <div class="container">
            <input type="checkbox" id="toggle" />
            <label for="toggle" class="button"></label>

            <nav class="nav">
              <router-link to="/prueba-leccion" id="Leccion de Prueba">Intentar de nuevo</router-link>
            </nav>
          </div>

      </section>
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
    cpm_min4: Number,
  },

  created: function () {
    this.calcularResumen();
  },

  methods: {
    cerrarModal: function () {
      console.log("En modal: se dio la orden de cerrar.");
      this.$emit("msjCerrarModal");
    },

    calcularResumen: function () {
      if (this.cpme < this.cpm_min1) {
        this.resumen = 0;
      } else if (this.cpme < this.cpm_min2) {
        this.resumen = 1;
      } else if (this.cpme < this.cpm_min3) {
        this.resumen = 2;
      } else if (this.cpme < this.cpm_min4) {
        this.resumen = 3;
      } else {
        this.resumen = 4;
      }
    },

    darFase: function () {
      switch (this.resumen) {
        case 0:
          return "Luna nueva visible";
          break;
        case 1:
          return "Luna creciente";
          break;
        case 2:
          return "Cuarto creciente";
          break;
        case 3:
          return "Luna gibosa creciente";
          break;
        case 4:
          return "Luna llena";
          break;
        default:
          // TODO Si error
          return "Hubo un error calculando tu puntaje.";
          break;
      }
    },

    darTextoResumen: function () {
      switch (this.resumen) {
        case 0:
          return "¡Uy! Te falto poco para pasar la lección. Intenta de nuevo.";
          break;
        case 1:
          return "¡Bien! Lograste sobrepasar este asteroide que se interponía en tu camino.";
          break;
        case 2:
          return "¡Muy bien! ¡Estás por fuera del Sistema Solar!";
          break;
        case 3:
          return "¡Excelente! ¡Estás muy cerca de llegar al infinito y más allá!";
          break;
        case 4:
          return "¡Increíble! ¡Sobrepasaste los límites de nuestro Espacio-Tiempo!";
          break;
        default:
          // TODO Si error
          return "Hubo un error calculando tu puntaje.";
          break;
      }
    },
  },
};
</script>



<style scoped>
@font-face {
  font-family: Questa Grande;
  src: url(../../fuentes/Questa_Grande_Regular.otf) format("Opentype");
}
.ModalBack {
  z-index: 999;
  background: rgba(50, 82, 136, 0.3);
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Questa Grande;
  text-shadow: black 0.1em 0.1em 0.2em;
}

.ModalCuadro {
  background: rgb(50, 82, 136);
  box-shadow: 2px 2px 20px 1px;

  display: flex;
  flex-direction: column;
  position: relative;
  width: 500pt;
  height: 270pt;
  border-radius: 10pt;
}

.modal-header {
  z-index: 100;
  position: relative;
  background: transparent;
  width: 500pt;
  height: 100pt;
}

.btn-close-X {
  z-index: 100;
  position: absolute;
  top: 0;
  right: 0;
  border: none;
  font-size: 20px;
  padding: 10px;
  cursor: pointer;
  font-weight: bold;
  color: turquoise;
  background: transparent;
}

.luna_nueva {
  position: absolute;
  left: -20pt;
  top: -10pt;
  width: 200pt;
  height: 100pt;
}
.luna_creciente {
  position: absolute;
  left: 70pt;
  top: 20pt;
  width: 200pt;
  height: 100pt;
}
.cuarto_creciente {
  position: absolute;
  left: 150pt;
  top: 27pt;
  width: 200pt;
  height: 100pt;
}
.creciente_gibosa {
  position: absolute;
  right: 80pt;
  top: 20pt;
  width: 200pt;
  height: 100pt;
}
.luna_llena {
  position: absolute;
  right: 0pt;
  top: -10pt;
  width: 200pt;
  height: 100pt;
}

.modal-body {
  position: relative;
  top: 30pt;
  left: 10pt;
  text-align: center;
}

.container,
.button,
.nav {
  position: absolute;
  top:70pt;
  right:370pt;
}

.container {
  margin: auto;
  top: 10%;
  left: 90%;
  margin-left: -20px;
}


#toggle {
  display: none;
}

.button {
  z-index: 999;
  width: 30pt;
  height: 30pt;
  background: transparent;
  background-image: url(../../Imagenes/Gifs/Icons6.gif);
  background-repeat: no-repeat;
  background-size: 400%;
  background-position: center;
  border-radius: 100%;
  transition: all 0.5s ease-in-out;
  text-align: center;
  cursor: pointer;
}

.nav {
  transform: translateY(-10%);
  opacity: 0;
  top: 20pt;
  right: 250pt;
  transition: all 0.5s ease-in-out;
  width: 150pt;
  transform: translateY(0%);
}

.nav a {
  text-align: center;
  display: block;
  margin: 20px 0;
  text-decoration: none;
  font-family: Questa Grande;
  font-size:10pt;
  letter-spacing: 0.5px;
  transition: all 300ms;
}
.nav router-link {
  color:white
}
 

.nav a:hover {
  color:white;
}

#toggle:checked ~ .nav {
  opacity: 1;
  transform: translateY(10%);
}

#toggle:checked ~ .button {
  transform: rotate(135deg);
  box-shadow: 0 0 0 0 transparent;
}

</style>