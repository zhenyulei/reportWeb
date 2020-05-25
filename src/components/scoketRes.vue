<template>
	<div class="wrapper-user">
		<div class="my-scoke">
            <span>更新用户：</span>
            <span v-for="(item,index) in updateName" :key="index">{{item+';'}}</span>
            <span v-if="updateName.length>=5">全部更新</span>
        </div>
	</div>
</template>

<script>
import Vue from 'vue';
import socket from 'socket.io-client';
let isLoc = (() => /localhost|page.jd.com/.test(location.hostname))();

export default {
    components: {},
    props:{
    },
	data() {
		return {
            updateName:[]
		};
    },
    watch:{
    },
    computed: {
        
    },
	created() {

    },
	mounted() {
        this.socketConnect();
	},
    destroyed() {},
    filters:{
    },
    watch:{
        updateName(val){
            if(val.length>5){
                this.updateName = [];
            }
        }
    },
	methods: {
        socketConnect() {
            let url = '';
            if(isLoc){
                url = 'ws://localhost:3344';
            }else{
                url = 'ws://www.report.xiaozhumaopao.com:3344';
            }
            // 客户端与服务器进行连接
            let ws = new WebSocket(url); // 返回`WebSocket`对象，赋值给变量ws
            // 连接成功回调
            ws.onopen = e => {
                ws.send('我发送消息给服务端'); // 客户端与服务器端通信
            }
            // 监听服务器端返回的信息
            ws.onmessage = e => {
                console.log(e.data);
                if(!this.updateName.includes(e.data)){
                    this.updateName.push(e.data)
                }
                // ws.send('给服务端的数据'); 
            }
        }
	}
};
</script>
<style lang="scss" scoped>
.wrapper-user{
    margin: 20px 0px;
    .my-scoke{
        padding:20px 0px;
        text-align: left;
    }
}

</style>