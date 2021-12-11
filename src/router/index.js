import { createRouter, createWebHistory } from 'vue-router'
import Home                               from '../views/Home.vue'
import ViewLeccionDB                  from '@/views/ViewLeccionDB.vue'
import Designs                            from '@/components/Designs.vue'
import ViewInicioSesion                   from '@/views/ViewInicioSesion.vue'
import ViewRegistrarNivel                 from '@/views/ViewRegistrarNivel.vue'
import ViewVerNiveles                     from '@/views/ViewVerNiveles.vue'
import ViewVerLecciones                   from '@/views/ViewVerLecciones.vue'
import LocalFingers                       from '@/components/LocalFingers.vue'
import ViewNivelesCrud 			              from '@/views/ViewNivelesCrud.vue'
import RegistroCuenta                     from '@/views/RegistroCuenta.vue'
import ViewLeccionesCrud                  from '@/views/ViewLeccionesCrud.vue'
import ViewPerfil                             from '@/views/ViewPerfil.vue'


import gql from "graphql-tag";

import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/aprende/leccionDB',
    name: 'Leccion de DB',
    component: ViewLeccionDB,
    props: ruta => ({idLeccion: ruta.query.id}) // /leccionDB?id=09342jr => Prop idLeccion = 09342jr
  },
  {
    path: '/designs',
    name: 'designs',
    component: Designs
  },
  {
    path: '/iniciar-sesion',
    name: 'iniciar-sesion',
    component: ViewInicioSesion
  },
  {
    path: '/registrar-nivel',
    name: 'registrar-nivel',
    component: ViewRegistrarNivel,
    meta: {
      requiereAut: true
    }
  },
  {
    path: '/lista-niveles',
    name: 'lista-niveles',
    component: ViewVerNiveles
  },
  {
    path: '/lista-lecciones',
    name: '/lista-lecciones',
    component: ViewVerLecciones,
    meta: {
      requiereAut: false
    },
    props: ruta => ({nNivel: parseInt(ruta.query.nivel)})  // Esto hará que al ir a /lista-leccione s?nivel=2, se le pase al componente el prop nNivel = 2
  },
  {
    path: '/lista-niveles-adm',
    name: '/lista-niveles-adm',
    component: ViewNivelesCrud
  },
  {
    path: '/lista-lecciones-adm',
    name: '/lista-lecciones-adm',
    component: ViewLeccionesCrud
  },
  {
    path: '/registro-cuenta',
    name: '/registro-cuenta',
    component: RegistroCuenta
  },
  {
    path: '/ubicacion-dedos',
    name: 'Ubicación de dedos',
    component: LocalFingers
  },
  {
    path: '/perfil',
    name: 'ViewPerfil',
    component: ViewPerfil
  }
]


const router = createRouter({
  history: createWebHistory(),
  routes
})


// Cliente auxiliar de Apollo: MEJORAR
const { linkApiGateway } = require("../servidor");

const clienteDeApollo = new ApolloClient({
  link: createHttpLink({ uri:  linkApiGateway}),
  cache: new InMemoryCache()
})

// Funcion auxiliar para el salto entre componentes: la persona esta autenticada?
async function sePudoAutenticar() {
  console.log("Se entro a verificar si la persona se puede (re)autenticar");
  if (localStorage.getItem("token_access") === null ||
      localStorage.getItem("token_refresh") === null) {
      return false;
  }

  try { // Intentar reautenticación
      var respuesta = await clienteDeApollo.mutate({
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

      localStorage.setItem("token_access", respuesta.data.actualizarToken.access);

      return true;

  } catch (error) {
      localStorage.clear();
      alert("No se pudo verificar su identidad. Error:", error);

      return false;
  }
}

// Funcion que se ejecutara antes de cada SALTO entre componentes. Mucho campo para la creatividad
router.beforeEach(async (to, from) => {
  // TODO Mejorar
  if (to.meta.requiereAut) {
    if (await sePudoAutenticar()){
      return true
    }
    alert("¡Necesita estar autenticado para acceder a esta funcionalidad!");
    return {name: 'Home'} // Para redireccionar a Home
  }
})


export default router
