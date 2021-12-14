import gql        from "graphql-tag";
import jwt_decode from 'jwt-decode';

// Funcion auxiliar para el salto entre componentes: la persona esta autenticada?
const sePudoAutenticar = async function(clienteApolloParam)  {
    console.log("Se entro a verificar si la persona se puede (re)autenticar");
    // Si no hay tokens
    if (localStorage.getItem("token_access") === null ||
        localStorage.getItem("token_refresh") === null) {
        localStorage.clear();
        console.log("No se pudo autenticar. No hay tokens");
        // TODO: mandar un mensaje que indique a las paginas (para que escuchen si les intereasa) que la persona ya no esta autenticada?
        localStorage.setItem("estaAutenticado", false);
        return false;
    }
  
    try { // Intentar reautenticación
        console.log("Va a realizar la peticion de reautenticacion");
        // Usa el cliente de Apollo pasado por parametro
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
        console.log("Hizo la peticion de reautenticacion, ahora guarda el nuevo token y se actualiza la info del usuario");
        localStorage.setItem("token_access", respuesta.data.actualizarToken.access);

        // Actualizar la info del usuario de acuerdo al token obtenido
        let infoUsuario = jwt_decode(respuesta.data.actualizarToken.access)
        // console.log("La info en el nuevo token es", infoUsuario);
        
        localStorage.setItem("token_access", respuesta.data.actualizarToken.access);
        localStorage.setItem("usuario", infoUsuario.usuario);
        localStorage.setItem("es_administrador", infoUsuario.es_administrador);

        localStorage.setItem("estaAutenticado", true);        
        return true;
  
    } catch (error) { // Si no fue posible la reautenticacion
        localStorage.clear();

        console.log("No se pudo autenticar. Hubo un error verificando el token", error);

        // TODO: mandar un mensaje que indique a las paginas (para que escuchen si les intereasa) que la persona ya no esta autenticada?
  
        localStorage.setItem("estaAutenticado", false);
        return false;
    }
  }

export default sePudoAutenticar;
