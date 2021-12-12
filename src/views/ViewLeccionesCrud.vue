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
                    <input class="redondeado" type="number" v-model="Lecciones.mini1" placeholder="# Caract por min minimos 1"> 
                    <input class="redondeado" type="number" v-model="Lecciones.mini2" placeholder="# Caract por min minimos 2"> 
                    </p>
                    <p>
                    <input class="redondeado" type="number" v-model="Lecciones.mini3" placeholder="# Caract por min minimos 3">                                                 
                    <input class="redondeado" type="number" v-model="Lecciones.mini4" placeholder="# Caract por min minimos 4"> 
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
                                <th scope="col" style="width: 14%">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="variable in listaLecciones" v-bind:key="variable.id" >

                                        <td>{{ variable.titulo }}</td>
                                        <td>{{ variable.nivel }}</td>
                                        <td>{{ variable.n_leccion }}</td>
                                        <td>{{ variable.texto }}</td>
                                        <td>{{ variable.teclas }}</td>
                                        <td>{{ variable.mini1 }}</td>
                                        <td>{{ variable.mini2 }}</td>
                                        <td>{{ variable.mini3 }}</td>
                                        <td>{{ variable.mini4 }}</td>
                                        <button @click="UpdateLecciones(variable.id)" class="btn btn-primary"> Editar  </button>
                                        <button @click="DeleteLecciones(variable.id)" class="btn btn-danger"> Eliminar</button>                           
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
        };
    },

    methods: {
        traerTodosLecciones: async function () {
            await this.$apollo
                .mutate({
                    mutation: gql`
                        query TraerLeccionesLigeras {
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

                })
                .catch(error => {
                    console.log("error", error);
                });
        },
    
    guardarLeccion: async function() {
        this.Lecciones.teclas = JSON.parse(this.Lecciones.teclas)
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
            console.log(`error`,{error}, JSON.stringify(error.networkError))   });
           
    },

    codificarImagenComoURL: async function (evento) {
      var archivo = evento.target.files[0];
      let imagenComoUrl = await this.leerArchivoAsync(archivo);
      this.Lecciones.imagen = imagenComoUrl;
      
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
    },

    mounted(){
    this.traerTodosLecciones();
    }
};
</script>

<style scoped>

.container{
    margin: 0;
    padding: 0;
    height: 120vh;
    width: 100vw;
   
    display: flex;
    justify-content: center;
    align-items: center;

}

.container h1 {
    text-align: center;
    margin: 2px 0 10px 0;
}

.container form{
        display: flex;
        justify-content: center;
        align-items: center;
    }

.section {
       text-align: center; 
    }

.formulario section{
        display: flex;
        flex-direction: column;
        align-items: center;
}

.container th {
    padding-top: 10px;
    padding-bottom: 10px;
    text-align: left;
    background-color: Rgb(50,82,136);
    color: white;
}
    .container h1{
        font-size: 20px;
        color: Rgb(50,82,136);
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
        text-align: center;
}
    .formulario button:hover{
    color: #E5E7E9;
    background: turquoise;
    border: 1px solid rgb(28, 11,127);
}


</style>