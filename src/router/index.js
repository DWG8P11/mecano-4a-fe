import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import ViewLeccionPrueba from '@/views/ViewLeccionPrueba.vue'
import Desings from           '@/components/Desings.vue'
import Desing from           '@/components/Desing.vue'


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
    path: '/desings',
    name: 'desings',
    component: Desings
  },
  {
    path: '/desing',
    name: 'desing',
    component: Desing
  }
  
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
