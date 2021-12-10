<template>
    <div class="container">

        <div class="formulario">
        <h1>Crear Niveles</h1>
        <section class="formu">
            <form v-on:submit.prevent="processListNivel">
                <input type="text" v-model="Niveles.nombre" placeholder="Nombre">
                <input type="text" v-model="Niveles.descripcion" placeholder="Descripcion">
                <input type="text" v-model="Niveles.imagen" placeholder="Imagen">            
                <!-- Botón para añadir -->
                <button type="submit">Guardar</button>
            </form>
        </section>


        <section class="datas">
         <center>   <h1>Listado de niveles</h1> </center>
                    <table class="table">
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
                            <tr v-for="variable in listaNiveles" v-bind:key="variable.id" >

                                        <td>{{ variable.id }}</td>
                                        <td>{{ variable.nombre }}</td>
                                        <td>{{ variable.descripcion }}</td>
                                        <td>{{ variable.imagen }}</td>
                                        <button @click="UpdateNivel(variable.id)" class="btn btn-primary"> Editar  </button>
                                        <button @click="DeleteNivel(variable.id)" class="btn btn-danger"> Eliminar</button>                           
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
                id: 0,
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
            console.log(resultado)
            this.listaNiveles = respuesta.data.eliminarNivel;
            console.log(this.listaNiveles)
            this.traerTodosNiveles();

        })
        .catch(error => {
            console.log("error", error);
        });
      }

      
      
    },
    
    mounted(){
    this.traerTodosNiveles();
    }
};
</script>


<style scoped>

.container h1 {
    text-align: center;
    margin: 80px 0 20px 0;
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
    background-color: Rgb(50,82,136);
    color: white;
}
    .container h1{
        font-size: 20px;
        color: Rgb(50,82,136);
    }

    .container tr:nth-child(even){background-color: #f2f2f2;}

    .container tr:hover {background-color: #ddd;}

    .container th, td {
        text-align: left;
        vertical-align: top;
        border: 0.5px solid Rgb(50,82,136);
        border-collapse: collapse;
    }

</style>