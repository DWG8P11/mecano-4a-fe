<template>
    <div class="container">
                        

        <div class="formulario">
        <h1>Crear Lecciones</h1>
        <section class="formu">
            <form v-on:submit.prevent="guardarLeccion">
                <ul>
                    <p>
                    <input class="redondeado" type="text" v-model="Lecciones.titulo" placeholder="Titulo">
                    <input class="redondeado" type="number" v-model="Lecciones.nivel" placeholder="# Nivel">
                    </p>
                    <p>
                    <input class="redondeado" type="number" v-model="Lecciones.n_leccion" placeholder="# Numero de lección">
                    <input class="redondeado" type="text" v-model="Lecciones.texto" placeholder="Texto"> 
                    </p>
                    <p>
                    <input class="redondeado" type="text" v-model="Lecciones.teclas" placeholder="Teclas" />
                    <input type="file" v-on:change="codificarImagenComoURL" />
                    </p>
                    <p>                                                           
                    <input class="redondeado" type="number" v-model="Lecciones.mini1" placeholder="# Caracteres por min efectivos 1"> 
                    <input class="redondeado" type="number" v-model="Lecciones.mini2" placeholder="# Caracteres por min efectivos 2"> 
                    </p>
                    <p>
                    <input class="redondeado" type="number" v-model="Lecciones.mini3" placeholder="# Caracteres por min efectivos 3">                                                 
                    <input class="redondeado" type="number" v-model="Lecciones.mini4" placeholder="# Caracteres por min efectivos 4"> 
                    </p>

                    <button class="btnGuardar" type="submit">Guardar</button>
                    
                </ul>
            </form>
        </section>

        <section class="datas">
         <center>   <h1>Listado de Lecciones</h1> </center>
                    <table class="table" :key="listaLecciones">
                        <thead class="thead-green">
                            <tr>
                                <th scope="col">Titulo</th>
                                <th scope="col">Nivel</th>
                                <th scope="col">n_leccion</th>
                                <th scope="col">Texto</th>      
                                <th scope="col">Teclas</th>      
                             <!--   <th scope="col">Imagen</th>     -->
                                <th scope="col">Mini1</th>  
                                <th scope="col">Mini2</th>  
                                <th scope="col">Mini3</th>   
                                <th scope="col">Mini4</th>
                                <th scope="col">Imagen</th>
                                <th scope="col" style="width: 14%">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="variable in listaLecciones" v-bind:key="variable.id" v-on:click="metActualizarCampos(variable)" >

                                        <td>{{ variable.titulo }}</td>
                                        <td>{{ variable.nivel }}</td>
                                        <td>{{ variable.n_leccion }}</td>
                                        <td><textarea v-model="variable.texto"/></td>
                                        <td>{{ variable.teclas }}</td>
                                        <td>{{ variable.mini1 }}</td>
                                        <td>{{ variable.mini2 }}</td>
                                        <td>{{ variable.mini3 }}</td>
                                        <td>{{ variable.mini4 }}</td>
                                        <td><img :src="diccionarioImagenes.get(variable.id)"/></td>
                                        <button @click="UpdateLecciones(variable.id)" class="btnUpdate"> Editar  </button>
                                        <button @click="DeleteLecciones(variable.id)" class="btnDelete"> Eliminar</button>                           
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
    name: "ViewTableLecciones",

    data: function () {
        return {
            Lecciones: {
                titulo   : "",
                nivel    : "",
                n_leccion: "",
                texto: "",
                teclas: "",
                imagen: "",
                mini1: "",
                mini2: "",
                mini3: "",
                mini4: "",
                ignorarMayus:  true,
                ignorarTildes: true,
                ignorarDieres: true,
            },
            listaLecciones:[],

            diccionarioImagenes: new Map()
        };
    },

    methods: {
        traerTodosLecciones: async function () {
            await this.$apollo
                .mutate({
                    mutation: gql`
                        query TraerLecciones {
                            traerLeccionesLigeras {
                                id              
                                titulo          
                                nivel          
                                n_leccion    
                                texto         
                                teclas          
                                imagen       
                                mini1           
                                mini2           
                                mini3          
                                mini4           
                                ignorarMayus    
                                ignorarTildes   
                                ignorarDieres
                            }
                        }
                    `,
                })
                    .then(respuesta => {
                    this.listaLecciones = respuesta.data.traerLeccionesLigeras;
                    console.log(this.listaLecciones)

                    this.traerImagenes();
                })
                .catch(error => {
                    console.log("error", error);
                });
        },

        traerImagenes: async function () {

            for (const leccion of this.listaLecciones) {
                let id = leccion.id;

                this.$apollo.mutate({
                        mutation: gql`
                            query TraerLeccionPorId($idLeccion: String!) {
                                traerLeccionPorId(idLeccion: $idLeccion) {
                                    id
                                    imagen
                                }
                            }
                        `,
                        variables: {
                            idLeccion: id
                        }
                    })
                    .then((respuesta) => {
                        console.log("RESPUESTA", respuesta.data);
                        this.diccionarioImagenes.set(id, respuesta.data.traerLeccionPorId.imagen);
                        // this.leccionCargaLecciones += 1;
                    })
                    .catch(error => {
                        console.log("Error", error, ". Cargando la imagen de la leccion", id);
                        this.diccionarioImagenes.set(id, "");
                    });
            }
            console.log("Diccionario de imagenes hasta ahora", this.diccionarioImagenes);

            this.leccionCargaLecciones += 1; // Establece que deberia cargar de nuevo la galeria
        },
    
    guardarLeccion: async function() {
        delete this.Lecciones.id;
        this.Lecciones.teclas = this.Lecciones.teclas.replace(" ", "").split(",")

        await this.$apollo
        .mutate({
            mutation: gql`
        mutation CrearLeccion($leccion: LeccionIn!) {
            crearLeccion(leccion: $leccion) {
                id              
                titulo          
                nivel          
                n_leccion    
                texto         
                teclas          
                imagen       
                mini1           
                mini2           
                mini3          
                mini4           
            }
          }
        `,
        variables: {
          leccion: this.Lecciones,
        },
      }).then(respuesta => {
        console.log(`respuesta ${respuesta}`);
        alert("Registro de lección exitoso")
        this.traerTodosLecciones();
        })
        .catch(error => {
            alert("Error registrando la lección.")
            console.log(`error`,{error}, JSON.stringify(error.networkError))   });
           
    },

    codificarImagenComoURL: async function (evento) {
      var archivo = evento.target.files[0];
      let imagenComoUrl = await this.leerArchivoAsync(archivo);
      this.Lecciones.imagen = imagenComoUrl;
      this.Lecciones.id = parseInt(this.Lecciones.id)
      delete this.Lecciones.__typename;
      
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

    DeleteLecciones(idLeccion) {
            this.$apollo.mutate({
            mutation: gql`
            mutation EliminarLeccionPorId($idLeccion: String!) {
                eliminarLeccionPorId(idLeccion: $idLeccion) 
            }
            `,
            variables: {
            idLeccion: idLeccion,
            },
        })

        .then(respuesta => {
            alert("Nivel Eliminado");
            this.listaLecciones = respuesta.data.eliminarLeccionPorId;
            this.traerTodosLecciones();

        })
        .catch(error => {
            console.log("error", error);
        });
      },

        UpdateLecciones(idLeccion) {
        this.Lecciones.teclas = this.Lecciones.teclas.replace(" ", "").split(",")

        this.$apollo.mutate({
            mutation: gql`
                mutation ActualizarLeccionPorId($idLeccion: String!, $leccionNueva: LeccionIn!) {
                actualizarLeccionPorId(idLeccion: $idLeccion, leccionNueva: $leccionNueva) {
                    id
                    titulo
                    nivel
                    n_leccion
                    texto
                    teclas
                    imagen
                    mini1
                    mini2
                    mini3
                    mini4
                }
            }
            `,
            variables: {
            idLeccion: idLeccion,
            leccionNueva: this.Lecciones
            },
        })

        .then(respuesta => {
            alert("Editado");
            this.listaLecciones = respuesta.data.actualizarLeccionPorId;
            this.traerTodosNiveles();
        })
        .catch(error => { console.log(`error`,{error}, JSON.stringify(error.networkError))});
      },

    metActualizarCampos: function (ocup) {
      this.Lecciones = { ...ocup }; // Clonando shallow, no pasando referencia al objeto 
      
      this.Lecciones.imagen = this.diccionarioImagenes.get(this.Lecciones.id);
      delete this.Lecciones.id;


      delete this.Lecciones.__typename;
      delete this.Lecciones.id;
      

      console.log("Leccion del formulario", this.Lecciones)
    },

    },

    mounted(){
    this.traerTodosLecciones();
    }
};
</script>

<style scoped>

.container{
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.formulario{
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.container h1 {
    text-align: center;
    margin: 2px 0 10px 0;

    font-size: 20px;
    color: Rgb(50,82,136);
}


.container th {
    padding-top: 10px;
    padding-bottom: 10px;
    text-align: center;
    background-color: white;
    color: black;
}

    .container input{
    width: 20vw;
    height: 3vh;
 
    padding: 10pt 20pt;
    margin: 3pt 0;
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

    .formulario .btnGuardar  {
        color: #E5E7E9;
        background: rgb(28, 11,127);
        border: 1px solid #E5E7E9;
        padding: 5pt 20pt;
        margin: 3pt 0;

        display: flex;
        align-items: center;
}
    .formulario button:hover{
    color: #E5E7E9;
    background: turquoise;
    border: 1px solid rgb(28, 11,127);
}

.btnUpdate{
    background-color: Rgb(30,174,152);
    color: white;
}
.btnDelete{
    background-color: red;
    color: white;
}

img {
    height: 5rem;
}

tr {
    text-align: center;
}

.container {
    font-family: Questa Grande;
}

</style>