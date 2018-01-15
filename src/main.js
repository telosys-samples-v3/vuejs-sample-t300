import Vue from 'vue'
import App from './App.vue'
import router from './router.js'
import VueResource from 'vue-resource'

Vue.use(VueResource);
Vue.config.productionTip = false;

new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: {App}
});