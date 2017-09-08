import Vue from 'vue'
import Router from 'vue-router'
import Gallery from '@/components/Gallery'
import Form from '@/components/Form'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/gallery',
      name: 'Gallery',
      component: Gallery
    },
    {
      path: '/form',
      name: 'Form',
      component: Form
    }
  ]
})
