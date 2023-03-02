import Vue from 'vue'
import App from './App.vue'
import VueKonva from 'vue-konva';
import Konva from "konva"

import './assets/main.css'
Vue.use(Konva);
Vue.use(VueKonva);

new Vue({
  render: (h) => h(App)
}).$mount('#app')
