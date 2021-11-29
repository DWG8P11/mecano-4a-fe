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
  
  methods: {
    cerrarModal() {
        console.log("En modal: se dio la orden de cerrar.");
      this.$emit("msjCerrarModal");
    },
  },

  components: {
  },

  props: [],
};
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
  background: #ffffff;
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