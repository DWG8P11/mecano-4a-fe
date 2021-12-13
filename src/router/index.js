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
import ViewPerfil                         from '@/views/ViewPerfil.vue'

import sePudoAutenticar                   from '../SePuedeAutenticar'

import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/aprende/leccionDB/:idLeccion',
    name: 'Leccion de DB',
    component: ViewLeccionDB,
    // props: ruta => ({idLeccion: ruta.query.id}) // /leccionDB?id=09342jr => Prop idLeccion = 09342jr
    props: true,
    meta: {
      requiereAut: false, // Para permitir que veal al menos la lección de prueba
      requiereAdmin: false
    }
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
      requiereAut: true,
      requiereAdmin: true
    }
  },
  {
    path: '/lista-niveles',
    name: 'lista-niveles',
    component: ViewVerNiveles,
    meta: {
      requiereAut: true,
      requiereAdmin: false
    }
  },
  {
    path: '/lista-lecciones',
    name: '/lista-lecciones',
    component: ViewVerLecciones,
    meta: {
      requiereAut: true,
      requiereAdmin: false
    },
    props: ruta => ({nNivel: parseInt(ruta.query.nivel)})  // Esto hará que al ir a /lista-leccione s?nivel=2, se le pase al componente el prop nNivel = 2
  },
  {
    path: '/lista-niveles-adm',
    name: '/lista-niveles-adm',
    component: ViewNivelesCrud,
    meta: {
      requiereAut: true,
      requiereAdmin: true
    }
  },
  {
    path: '/lista-lecciones-adm',
    name: '/lista-lecciones-adm',
    component: ViewLeccionesCrud,
    meta: {
      requiereAut: true,
      requiereAdmin: true
    }
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
    component: ViewPerfil,
    meta: {
      requiereAut: true,
      requiereAdmin: false
    }
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

// Funcion que se ejecutara antes de cada SALTO entre componentes. Mucho campo para la creatividad
router.beforeEach(async (to, from) => {
  // TODO Mejorar
  let autenticado = await sePudoAutenticar(clienteDeApollo);
  if (to.meta.requiereAut) {
    if (autenticado){
      return true
    } else {
      alert("¡Necesita estar autenticado para acceder a esta funcionalidad!");
      return {name: 'iniciar-sesion'} // Para redireccionar a Iniciar Sesión
    }
  }
})


export default router
