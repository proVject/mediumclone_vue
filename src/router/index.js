import Vue from 'vue'
import VueRouter from 'vue-router'
import GlobalFeed from '../views/GlobalFeed'
import Register from '@/views/Register'
import Login from '@/views/Login'
import TagFeed from '@/views/TagFeed'
import YourFeed from '@/views/YourFeed'
import Article from '@/views/Article'
import CreateArticle from '@/views/CreateArticle'
import EditArticle from '@/views/EditArticle'
import Settings from '@/views/Settings'
import UserProfile from '@/views/UserProfile'

Vue.use(VueRouter)

const routes = [
  {
    path: '/register',
    name: 'register',
    component: Register,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/',
    name: 'globalFeed',
    component: GlobalFeed,
  },
  {
    path: '/feed',
    name: 'yourFeed',
    component: YourFeed,
  },
  {
    path: '/tags/:slug',
    name: 'tagFeed',
    component: TagFeed,
  },
  {
    path: '/articles/new',
    name: 'createArticle',
    component: CreateArticle,
  },
  {
    path: '/articles/:slug',
    name: 'article',
    component: Article,
  },
  {
    path: '/articles/:slug/edit',
    name: 'editArticle',
    component: EditArticle,
  },
  {
    path: '/settings',
    name: 'settings',
    component: Settings,
  },
  {
    path: '/profiles/:slug',
    name: 'userProfile',
    component: UserProfile,
  },
  {
    path: '/profiles/:slug/favorites',
    name: 'userProfileFavorites',
    component: UserProfile,
  },
  {
    path: '*',
    name: '404',
    component: UserProfile,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
