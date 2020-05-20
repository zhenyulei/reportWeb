import Vue from 'vue';
import App from './app.vue';
import router from './router';
import store from "./store";


import {Toast, Switch, Backtop} from '@nutui/nutui';
Toast.install(Vue);
Switch.install(Vue);
Backtop.install(Vue);


// 阻止 vue 在启动时生成生产提示
Vue.config.productionTip = false;
export default new Vue({
	el: '#app',
	store,
	router,
	render: h => h(App)
});
