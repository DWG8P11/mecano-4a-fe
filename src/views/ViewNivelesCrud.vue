<template>
    <div class="container">

        <div class="formulario">
        <h1>Crear Niveles</h1>
        <section class="formu">
            <form v-on:submit.prevent="GuardarNiveles">
                <input class="redondeado"  type="number" v-model="Niveles.id" placeholder="# Nombre" />
                <input class="redondeado"  type="text"   v-model="Niveles.nombre" placeholder="Nombre" />
                <input class="redondeado"  type="text"   v-model="Niveles.descripcion" placeholder="Descripción" />
                <input class="seleccionar" type="file"   v-on:change="codificarImagenComoURL" />           
                <!-- Botón para añadir -->
                
                <button class="btnGuardar" type="submit">Guardar</button>
            </form>
        </section>


        <section class="datas">
         <center>   <h1>Listado de niveles</h1> </center>
                    <table class="tables" :key="listaNiveles">
                        <thead class="thead-green">
                            <tr class="celdas">
                                <th scope="col">Id</th>
                                <th scope="col">Nombres</th>
                                <th scope="col">Descripción</th>
                                <th scope="col">Imagen</th>                         
                                <th scope="col" style="width: 14%">Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="data" v-for="variable in listaNiveles" v-bind:key="variable.id" v-on:click="metActualizarCampos(variable)">

                                        <td>{{ variable.id }}</td>
                                        <td>{{ variable.nombre }}</td>
                                        <td>{{ variable.descripcion }}</td>
                                        <td>{{ variable.imagen }}</td>
                                        <button @click="UpdateNivel(variable.id)" class="btnUpdate" style="width: 50%"> Editar  </button>
                                        <button @click="DeleteNivel(variable.id)" class="btnDelete" style="width: 50%"> Eliminar</button>                           
                            </tr>
                        </tbody>
                    </table>
        </section>
        </div>
    </div>
</template>


<script>
import gql from "graphql-tag";

export default {
    name: "ViewTableNiveles",

    data: function () {
        return {
            Niveles: {
                id: "",
                nombre: "",
                descripcion: "",
                imagen: "",
            },
            listaNiveles:[],
        };
    },

    methods: {
        traerTodosNiveles: async function () {
            await this.$apollo
                .mutate({
                    mutation: gql`
                        query traerNiveles {
                            traerNivelesLigeros {
                                id
                                nombre
                                descripcion
                                imagen
                            }
                        }
                    `,
                })
                    .then(respuesta => {
                    this.listaNiveles = respuesta.data.traerNivelesLigeros;
                    console.log(this.listaNiveles)

                })
                .catch(error => {
                    console.log("error", error);
                });
        },

        DeleteNivel(idNivel) {
        this.$apollo.mutate({
            mutation: gql`
            mutation($idNivel: Int!) {
                eliminarNivel(idNivel: $idNivel) 
            }
            `,
            variables: {
            idNivel: idNivel,
            },
        })

        .then(respuesta => {
            alert("Nivel Eliminado");
            this.listaNiveles = respuesta.data.eliminarNivel;
            this.traerTodosNiveles();
        })
        .catch(error => {
            console.log("error", error);
        });
      },

    metActualizarCampos: function (ocup) {
      this.Niveles = { ...ocup }; // Clonando shallow, no pasando referencia al objeto
      delete this.Niveles.__typename;
    },

    UpdateNivel(idNivelViejo) {
        this.$apollo.mutate({
            mutation: gql`
            mutation ActualizarNivel($idNivelViejo: Int!, $nivelNuevo: NivelIn!) {
                actualizarNivel(idNivelViejo: $idNivelViejo, nivelNuevo: $nivelNuevo) {
                    id
                    nombre
                    descripcion
                    imagen
                }
            }
            `,
            variables: {
            idNivelViejo: idNivelViejo,
            nivelNuevo: this.Niveles
            },
        })

        .then(respuesta => {
            alert("Editado");
            this.listaNiveles = respuesta.data.actualizarNivel;
            this.traerTodosNiveles();
        })
        .catch(error => { console.log(`error`,{error}, JSON.stringify(error.networkError))});
      },

    codificarImagenComoURL: async function (evento) {
      var archivo = evento.target.files[0];
      let imagenComoUrl = await this.leerArchivoAsync(archivo);
      this.Niveles.imagen = imagenComoUrl;
      this.Niveles.id = parseInt(this.Niveles.id)
    },

    leerArchivoAsync: function (file) {
      return new Promise((resolve, reject) => {
        let reader = new FileReader();

        reader.onload = () => {
          resolve(reader.result);
        };

        reader.onerror = reject;

        reader.readAsDataURL(file);
      });
     },
     
     GuardarNiveles: async function () {
      await this.$apollo.mutate({
        mutation: gql`
          mutation RegistrarNivel($nivel: NivelIn!) {
            registrarNivel(nivel: $nivel) {
              id
              nombre
              descripcion
              imagen
            }
          }
        `,
        variables: {
          nivel: this.Niveles,
        },
      }).then(respuesta => {
        console.log(`respuesta ${respuesta}`);
        alert("Registro de nivel exitoso")
            this.traerTodosNiveles();
        }).catch(error => { console.log(`error`,{error}, JSON.stringify(error.networkError))   });
    },

    },
    mounted(){
    this.traerTodosNiveles();
    }
};
</script>


<style scoped>

.container h1 {
    text-align: center;
    margin: 0px 0 20px 0;
    font-family: Questa Grande;
    color:white;
}

.container{
    display: flex;
    justify-content: center;
    align-items: center;
    margin: -8px;
    padding: 0;
    background-image: url(../../Imagenes/milkyway.jpg);
    background-size: cover;
    background-position: absolute;
    background-repeat: no-repeat;
    height: 100vh;
    overflow: hidden;
    position: relative;
    top: -8.5rem;
       
    }


.section {
       text-align: center; 
    }

.formulario section{
        width: 100%;
        height: 80%;
        display: flex;
        flex-direction: column;
        align-items: center;
}

.container th {
    padding-top: 10px;
    padding-bottom: 10px;
    text-align: center;
    background-color:transparent;
    color: white;
    border-radius:10px;
    border-bottom:1px solid #fcf8f8;
    box-shadow: 0 0 20px rgb(235, 245, 239)
   

}
  

.btnGuardar{
  width:8%;
  background-color:turquoise;
  color: white;
  border-radius: 16px;
  border-color:transparent;
  font-family: Questa Grande;
}

.seleccionar{
   
    font-family: Questa Grande;
    color:white;


}

.redondeado{
    width: 12vw;
    height: 3vh;
    box-sizing: border-box;
    padding: 10pt 20pt;
    margin: 3pt 0;
    border: 1px solid rgb(217,217,217);
    border-radius: 30px;
    font-family: Questa Grande;
}

.btnUpdate{
  background:  turquoise;
  border-radius: 16px;
  border-radius: 16px;
  border:none;
  font-family:Questa Grande;
  font-size:7.8pt;
  color:white;
  box-shadow: 1px 1px 1px 1px rgb(248, 252, 252);
}
.btnDelete{
  background: turquoise;
  border-radius: 16px;
  border-radius: 16px;
  border:none;
  font-family:Questa Grande;
  font-size:7.8pt;
  color:white;
  box-shadow: 1px 1px 1px 1px rgb(248, 252, 252);
  
}
.thead-green{
    font-family: Questa Grande;
  
}

.tables{
  padding: 3px 10px;
  border-bottom:1px solid #fcf8f8;
  box-shadow: 0 0 10px rgb(235, 245, 239)
  
}

.data{
    font-family: Questa Grande;
    color: white;
}


</style>