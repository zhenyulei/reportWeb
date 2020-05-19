import Vue from "vue";
import Vuex from "vuex";
import createLogger from "vuex/dist/logger";
import project from "./modules/project";
import user from "./modules/userInfo";


/*
 * modlues 是vuex 对state 的模块化管理，便于代码的组装而不是所有的state都堆在一起
 */

Vue.use(Vuex);
const debug = process.env.NODE_ENV != "production";

export default new Vuex.Store({
    modules: {
        project,
        user
    },
    strict: debug,
    plugins: debug ? [createLogger()] : []
});
