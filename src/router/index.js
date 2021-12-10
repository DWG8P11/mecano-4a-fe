import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import ViewLeccionPrueba from '@/views/ViewLeccionPrueba.vue'
import Designs from           '@/components/Designs.vue'
import ViewInicioSesion from '@/views/ViewInicioSesion.vue'
import ViewRegistrarNivel from '@/views/ViewRegistrarNivel.vue'
import ViewVerNiveles from '@/views/ViewVerNiveles.vue'
import ViewVerLecciones from '@/views/ViewVerLecciones.vue'
import LocalFingers from           '@/components/LocalFingers.vue'


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/prueba-leccion',
    name: 'Leccion de Prueba',
    component: ViewLeccionPrueba
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
      requiereAut: false
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
    }
  },
  {
    path: '/ubicacion-dedos',
    name: 'Ubicación de dedos',
    component: LocalFingers
  }
]


const router = createRouter({
  history: createWebHistory(),
  routes
})


// Funcion auxiliar para el salto entre componentes: la persona esta autenticada?
async function estaAutenticado() {
  if (localStorage.getItem("token_access") === null ||
      localStorage.getItem("token_refresh") === null) {

      return false;
  }

  try { // Intentar reautenticación

      var respuesta = await apolloClient.mutate({
          mutation: gql`
          mutation ($refresh: String!) {
                  actualizarToken(refresh: $refresh) {
                      access
              }
          }
   `,
          variables: {
              refresh: localStorage.getItem("token_refresh"),
          },
      })

      localStorage.setItem("token_access", respuesta.data.actualizarToken.access);

      return true;

  } catch {
      localStorage.clear();
      alert("Su sesión expiró, por favor vuelva a iniciar sesión");

      return false;
  }
}

// Funcion que se ejecutara antes de cada SALTO entre componentes. Mucho campo para la creatividad
router.beforeEach(async (to, from) => {
  // TODO Mejorar
  if (to.meta.requiereAut) {
    if (await estaAutenticado()){
      return true
    }
    return {name: Home}
  }
})


export default router
