import gql from "graphql-tag";

// import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'

// // Cliente auxiliar de Apollo: MEJORAR
// const { linkApiGateway } = require("@/servidor");

// const clienteDeApollo = new ApolloClient({
//   link: createHttpLink({ uri:  linkApiGateway}),
//   cache: new InMemoryCache()
// })

// Funcion auxiliar para el salto entre componentes: la persona esta autenticada?
const sePudoAutenticar = async function(clienteApolloParam)  {
    console.log("Se entro a verificar si la persona se puede (re)autenticar");
    if (localStorage.getItem("token_access") === null ||
        localStorage.getItem("token_refresh") === null) {

        console.log("No se pudo autenticar. No hay tokens");
        return false;
    }
  
    try { // Intentar reautenticación
        console.log("Va a realizar la peticion");
        // Usa el cliente auxiliar de Apollo
        var respuesta = await clienteApolloParam.mutate({
            mutation: gql`
            mutation ActualizarToken($tActualizacion: String!) {
              actualizarToken(tActualizacion: $tActualizacion) {
                access
              }
            }
     `,
            variables: {
                tActualizacion: localStorage.getItem("token_refresh"),
            },
        })
        console.log("Hizo la peticion, ahora va a guardar el token");
        localStorage.setItem("token_access", respuesta.data.actualizarToken.access);
        console.log("Guardo el token");
  
        return true;
  
    } catch (error) {
        localStorage.clear();
        alert("No se pudo verificar su identidad. Error:", JSON.stringify(error));
        console.log("No se pudo autenticar. Hubo un error verificando");
  
        return false;
    }
  }

export default sePudoAutenticar;
