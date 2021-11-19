import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import CompLeccion from '@/components/CompLeccion.vue'

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
    name: 'Prueba Leccion',
    component: CompLeccion
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
