import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import ViewLeccionPrueba from '@/views/ViewLeccionPrueba.vue'
import Designs from           '@/components/Designs.vue'
import ViewInicioSesion from '@/views/ViewInicioSesion.vue'
import ViewRegistrarNivel from '@/views/ViewRegistrarNivel.vue'
import ViewVerNiveles from '@/views/ViewVerNiveles.vue'
import ViewVerLecciones from '@/views/ViewVerLecciones.vue'


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
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
    path: '/inicio-sesion',
    name: 'inicio-sesion',
    component: ViewInicioSesion
  },
  {
    path: '/registrar-nivel',
    name: 'registrar-nivel',
    component: ViewRegistrarNivel
  },
  {
    path: '/lista-niveles',
    name: 'lista-niveles',
    component: ViewVerNiveles
  },
  {
    path: '/lista-lecciones',
    name: '/lista-lecciones',
    component: ViewVerLecciones
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
