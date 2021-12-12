<template>
  <div class="view-ver-niveles">
    <body>
      <div class="contenedor-galeria">
        <!-- <div class="galeria" :key="nivelCargaNiveles"> -->
        <div class="galeria">
          <div
            :id="'nivel-' + nivel.id"
            class="galeria-item"
            v-for="nivel of this.listaNiveles"
            :key="nivel"
          >
            <img
              class="galeria-imagen"
              :id="'astro-' + nivel.id"
              :src="diccionarioImagenes.get(nivel.id)"
              :key="diccionarioImagenes.get(nivel.id)"
            />

            <router-link
              :to="`/lista-lecciones?nivel=${nivel.id}`"
              class="galeria-item-info"
            >
              <ul>
                <li class="galeria-item-nombre">
                  <i class="nivel-nombre" aria-hidden="true"> </i>
                  {{
                    `Nivel ${nivel.id}: "${nivel.nombre}"` ||
                    "Nivel Sin Identificar"
                  }}
                </li>
              </ul>
            </router-link>
          </div>
        </div>
      </div>

      <div class="iconos_niveles">
        <img class="Luna7" src="../../Imagenes/otrosIconos/Diapositiva11.png" />
        <img
          class="Saturno7"
          src="../../Imagenes/otrosIconos/Diapositiva9.png"
        />
        <img
          class="Planeta1"
          src="../../Imagenes/otrosIconos/Diapositiva12.png"
        />
        <img
          class="Planeta2"
          src="../../Imagenes/otrosIconos/Diapositiva13.png"
        />
        <img
          class="Luna_llena"
          src="../../Imagenes/otrosIconos/Diapositiva10.png"
        />
      </div>

      <div class="orbitas">
        <div id="orbita_xue"></div>
        <div id="orbita_chia"></div>
        <div id="orbita_fagua"></div>
      </div>
    </body>
  </div>
</template>


<script>
import gql from "graphql-tag";

export default {
  name: "ViewGaleriaNiveles",

  data: function () {
    return {
      listaNiveles: [],

      nivelCargaNiveles: 0,

      diccionarioImagenes: new Map(),
    };
  },

  created: async function () {
    this.traerTodosNiveles();
  },

  methods: {
    traerTodosNiveles: async function () {
      await this.$apollo
        .mutate({
          mutation: gql`
            query TraerNivelesLigeros {
              traerNivelesLigeros {
                id
                nombre
                descripcion
              }
            }
          `,
        })
        .then((respuesta) => {
          this.listaNiveles = respuesta.data.traerNivelesLigeros;
          this.listaNiveles.sort((a, b) => {
            return a.id - b.id;
          });

          this.nivelCargaNiveles += 1; // Establece que deberia cargar de nuevo la galeria

          this.traerImagenes();
        })
        .catch((error) => {
          console.log("error", error);
          this.nivelCargaNiveles = 0;
        });

      return;
    },

    traerImagenes: async function () {
      for (const nivel of this.listaNiveles) {
        let id = nivel.id;

        this.$apollo
          .mutate({
            mutation: gql`
              query TraerNivel($idNivel: Int!) {
                traerNivel(idNivel: $idNivel) {
                  id
                  imagen
                }
              }
            `,
            variables: {
              idNivel: id,
            },
          })
          .then((respuesta) => {
            this.diccionarioImagenes.set(id, respuesta.data.traerNivel.imagen);
            // this.nivelCargaNiveles += 1;
          })
          .catch((error) => {
            this.diccionarioImagenes.set(id, "");
          });
      }
      console.log(
        "Diccionario de imagenes hasta ahora",
        this.diccionarioImagenes
      );

      this.nivelCargaNiveles += 1; // Establece que deberia cargar de nuevo la galeria
    },
  },
};
</script>


<style scoped>
.view-ver-niveles {
  margin: -8px;
  padding: 0;
  background-image: url(../../Imagenes/sky.png);
  background-size: cover;

  background-repeat: no-repeat;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
  top: -8.5rem;
}


.galeria-item {
  position: relative;
  /* Para mostrar como circulos */
  border-radius: 50%;
  overflow: hidden;
  width: 40vh;
  height: 0;
  padding-bottom: 20vh;
  padding-top: 20vh;
  justify-items: center;
  justify-content: center;
}

.galeria-imagen {
  margin-left: 50%; transform: translate(-50%, -50%);  
  object-fit: cover;
  width: 90%;
  align-items: center;
}

.galeria-item-info {
  display: none;
}

.galeria-item-info li {
  display: inline-block;
  font-size: 1.5rem;
  font-weight: 400;
  font-family: Questa Grande;
  color: white;
  /* Para centrar el texto */
  width: 100%;
}

.galeria-item:hover .galeria-item-info,
.galeria-item:focus .galeria-item-info {
  display: flex;
  align-items: center;
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
}

.nivel-nombre {
  font-family: Questa Grande;
  color: white;
}

#nivel-1 {
  z-index: 999;
  position: absolute;
  right: 230pt;
  bottom:90pt;
}

#nivel-2 {
  z-index: 999;
  position: absolute;
  left: 240pt;
  bottom: 25pt;
}

#nivel-3 {
  z-index: 999;
  position: absolute;
  left: 460pt;
  bottom: 205pt;
}

#astro-2 {
  width: 280pt;
  position: absolute;
 
}


#orbita_xue {
  position: absolute;
  left:205pt;
  bottom:3pt;
  width: 350px;
  height: 350px;
  border-radius: 1000px;
  background: transparent;
  border: solid;
  border-color: white;
}

#orbita_chia {
  position: absolute;
  left:130pt;
  bottom:-80pt;
  width: 650px;
  height: 650px;
  border-radius: 1000px;
  background: transparent;
  border: solid;
  border-color: white;
}
#orbita_fagua {
  position: absolute;
  left:100pt;
  bottom:-230pt;
  width: 950px;
  height: 950px;
  border-radius: 1000px;
  background: transparent;
  border: solid;
  border-color: white;
}

/*Contenedor Iconos*/ 


.Luna7{
    position: absolute;
    width: 150pt;
    left:595pt;
    bottom:380pt;
  

}

.Saturno7{
    position: absolute;
    width: 170pt;
    left:395pt;
    bottom:80pt;
}

.Planeta1 {
  position: absolute;
  width: 150pt;
  left:230pt;
  bottom:350pt;
}
    


.Planeta2{
  position: absolute;
  width: 150pt;
  left:740pt;
  bottom:45pt;

}
.Luna_llena{
  position: absolute;
  width: 110pt;
  left:562pt;
  bottom:160pt;

}
</style>