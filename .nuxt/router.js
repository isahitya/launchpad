import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _9e5398ac = () => interopDefault(import('../pages/login.vue' /* webpackChunkName: "pages/login" */))
const _6d374cf2 = () => interopDefault(import('../pages/register.vue' /* webpackChunkName: "pages/register" */))
const _31a2deda = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/login",
    component: _9e5398ac,
    name: "login"
  }, {
    path: "/register",
    component: _6d374cf2,
    name: "register"
  }, {
    path: "/",
    component: _31a2deda,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
