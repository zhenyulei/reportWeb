import Vue from 'vue'
import VueRouter from 'vue-router'

import Index from "./view/index.vue";
import Main from "./view/main.vue";
Vue.use(VueRouter)

const routes = [
    { path: "/", component: Index },
    { path: "/main", component: Main },
];
const router = new VueRouter({
    mode:'hash',
    routes
})

export default router
