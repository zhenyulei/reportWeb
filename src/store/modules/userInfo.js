// 全局状态管理的地方
const state = {

};

// 简单处理state的地方
const getters = {
    // getters 里面不仅可以拿到本地全局state 还能拿到getters和根节点的全局state
};

// 处理异步数据的地方
const actions = {

};

// 类似redux的reduce 其实就是一个同步函数,建议用大写，与actions区分
const mutations = {

};

export default {
    namespaced: true, //  module 命名空间，以后在引用的时候都需要用到文件名/action 或者 mutations 或者 state
    state,
    getters,
    actions,
    mutations
};
