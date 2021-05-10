import Vue from 'vue'
import App from './App.vue'
import VueTheMask from 'vue-the-mask'
import * as VueGoogleMaps from 'vue2-google-maps'


Vue.config.productionTip = false
Vue.use(VueTheMask)
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyCqTQRxQotPtzLUcLf_as8-weCmJHo6UXs',
    libraries: 'places',
  }
});
new Vue({
  render: h => h(App),
}).$mount('#app')
