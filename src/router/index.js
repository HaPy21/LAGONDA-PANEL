import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../views/Login.vue'
import CreateUsuarioPanel from '../views/UsuarioPanel/CreateUsuarioPanel.vue'
import ListarUsuarioPanel from '../views/UsuarioPanel/ListarUsuarioPanel.vue'
import EditarUsuarioPanel from '../views/UsuarioPanel/EditarUsuarioPanel.vue'

import CreateProductoPanel from '../views/ProductosPanel/CreateProductoPanel.vue'
import ListarProductosPanel from '../views/ProductosPanel/ListarProductosPanel.vue'
import Dashboard from '../views/dashboard.vue'
import store from '@/store'
import jwtDecode from 'jwt-decode'


Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'Login', component: Login,meta: { requiresAuth: false }},
  { path: '/UsuarioPanel/create', name: 'CreateUsuarioPanel', component: CreateUsuarioPanel,meta: { requiresAuth: true }},
  { path: '/UsuarioPanel', name: 'ListarUsuarioPanel', component: ListarUsuarioPanel,meta: { requiresAuth: true }},
  { path: '/UsuarioPanel/Edit/:id', name: 'EditarUsuarioPanel', component: EditarUsuarioPanel, meta: { requiresAuth: true }},
  { path: '/Dashboard', name: 'dashboard', component: Dashboard, meta: { requiresAuth: true }},
  { path: '/about', name: 'about'},
  //Productos
  { path: '/ProductoPanel/create', name: 'CreateProductoPanel', component: CreateProductoPanel,meta: { requiresAuth: true }},
  { path: '/ProductoPanel', name: 'ListarProductosPanel', component: ListarProductosPanel,meta: { requiresAuth: true }}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from,next) => {
  console.log(to)
  if(to.matched.some(item => item.meta.requiresAuth)){
    if(!store.state.token){
      next({
        name: 'Login'
      })
      
    }
    try {
      jwtDecode(store.state.token)
      
    } catch (error) {
      next({
        name: 'Login'
      })
    }
    console.log('Es privada')
    
  }
  else{
    console.log('Es publica')
    next()
  }
  if(jwtDecode(store.state.token).exp*1000<= new Date().getTime()){
    next({
      name: 'Login'
    })
  }
  next()
  
})

export default router
