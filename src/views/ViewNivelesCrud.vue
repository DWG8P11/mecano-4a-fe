<template>
    <div class="container">

        <div class="formulario">
        <h1>Crear Niveles</h1>
        <section class="formu">
            <form v-on:submit.prevent="GuardarNiveles">
                <input class="redondeado" type="number" v-model="Niveles.id" placeholder="# Nombre" />
                <input class="redondeado" type="text" v-model="Niveles.nombre" placeholder="Nombre" />
                <input class="redondeado" type="text" v-model="Niveles.descripcion" placeholder="Descripcion" />
                <input type="file" v-on:change="codificarImagenComoURL" />           
                <!-- Botón para añadir -->
                
                <button class="btnGuardar" type="submit">Guardar</button>
            </form>
        </section>


        <section class="datas">
         <center>   <h1>Listado de niveles</h1> </center>
                    <table class="tables" :key="listaNiveles">
                        <thead class="thead-green">
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">Nombres</th>
                                <th scope="col">Descripcion</th>
                                <th scope="col">Imagen</th>                         
                                <th scope="col" style="width: 14%">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="variable in listaNiveles" v-bind:key="variable.id" v-on:click="metActualizarCampos(variable)">

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
}

.container{
        display: flex;
        justify-content: center;
        align-items: center;
       
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
    text-align: left;
    background-color: white;
    color: black;
}
    .container h1{
        font-size: 20px;
        color: Rgb(50,82,136);
    }

.btnGuardar{
  width:8%;
  background-color: Rgb(30,174,152);
  color: white;
}

.redondeado{
    width: 12vw;
    height: 3vh;
 
    box-sizing: border-box;
    padding: 10pt 20pt;
    margin: 3pt 0;
 
    border: 1px solid rgb(217,217,217);
    border-radius: 30px;
}

.btnUpdate{
    background-color: Rgb(30,174,152);
    color: white;
}
.btnDelete{
    background-color: red;
    color: white;
}

.tables{
  padding: 3px 10px;
  border-radius: 20px;

}

</style>