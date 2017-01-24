import Vue from 'vue'
import VueResource  from 'vue-resource'
import VueRouter  from 'vue-router'
import Login from './components/login.vue'
require('./scss/reset.scss')
require('./scss/layout.scss')

Vue.use(VueResource)
Vue.use(VueRouter)

const router= new VueRouter({    
    routes:[
    	{path:'/',component:Login}
    ]
});

new Vue({
    router,
    el:'#app'
});