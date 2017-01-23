import Vue from 'vue'
import VueResource  from 'vue-resource'
import VueRouter  from 'vue-router'
import Login from './components/login.vue'
require('./scss/reset.scss')
require('./scss/layout.scss')

Vue.use(VueResource)
Vue.use(VueRouter)

var loading = new Vue({
	el: '#loading',
	data: {
		showLoading: false
	}
})

Vue.http.interceptors.push((request, next) => {
  loading.showLoading = true;
  next((response) => {
    if(!response.ok){
      loading.showLoading = true;
    }
    loading.showLoading = false;
    return response
  });
});

const router= new VueRouter({    
    routes:[
    	{path:'/',component:Login}
    ]
});

new Vue({
    router,
    el:'#app'
});