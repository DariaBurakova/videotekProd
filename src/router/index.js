import Vue from 'vue'
import VueRouter from 'vue-router'
import MainPage from '../components/MainPage.vue'
import FilmPage from '../components/FilmPage.vue'
import Films from '../components/Films.vue'
import Media from '../components/Media.vue'
import PersonPage from '../components/PersonPage.vue'
import Login from '../components/Login.vue'
import Registration from '../components/Registration.vue'
import NewsArticlesPage from '../components/NewsArticlesPage.vue'
import Page404 from '../components/Page404.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: MainPage
  },
  {
    path: '/main',
    name: 'MainPage',
    component: MainPage
  },
  {
    path: '/films',
    name: 'Films',
    component: Films
  },
  {
    path: '/films/:route',
    name: 'filmPage',
    component: FilmPage
  },
  {
    path: '/person/:route',
    name: 'PersonPage',
    component: PersonPage
  },
  {
    path: '/serials',
    name: 'Serials',
    component: Films,
  },
  {
    path: '/media',
    name: 'Media',
    component: Media
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/registration',
    name: 'Registration',
    component: Registration
  },
  
  {
    path: '/media/:route',
    name: 'NewsArticlesPage',
    component: NewsArticlesPage
  },
  {
    path: '*',
    name: '404',
    component: Page404
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})

export default router
