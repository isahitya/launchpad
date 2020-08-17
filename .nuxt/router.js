import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _55e67d9e = () => interopDefault(import('../pages/login.vue' /* webpackChunkName: "pages/login" */))
const _d4d203ea = () => interopDefault(import('../pages/register.vue' /* webpackChunkName: "pages/register" */))
const _0b651e1a = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

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
    component: _55e67d9e,
    name: "login"
  }, {
    path: "/register",
    component: _d4d203ea,
    name: "register"
  }, {
    path: "/",
    component: _0b651e1a,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
