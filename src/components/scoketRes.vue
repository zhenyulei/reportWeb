<template>
	<div class="wrapper-user">
		<div class="my-scoke">
            <span class="user-box">更新用户：</span>
            <ul v-if="timers.length>0" class="timer">
                <li v-for="(value,index) in timers" :key="index" v-show="value.currTime">{{value.userName}}：{{value.currTime}}</li>
            </ul>
        </div>
	</div>
</template>

<script>
import Vue from 'vue';
let isLoc = (() => /localhost|page.jd.com/.test(location.hostname))();
import {getUserInfoTime} from "@/api";

export default {
    components: {},
    props:{
    },
	data() {
		return {
            updateName:[],
            timers:[],
            userErp:"",
            userGroup:"",
		};
    },
    watch:{
    },
    computed: {
        
    },
	created() {

    },
	mounted() {
        var currUser = localStorage.getItem("currUser");
        this.userErp = JSON.parse(currUser).userErp;
        this.userGroup = JSON.parse(currUser).userGroup;
        if(this.userErp &&  this.userGroup){
            this.getTime();
        }
        this.socketConnect();
	},
    destroyed() {},
    filters:{
    },
    watch:{
        updateName(val){
            if(val.length>=5){
                this.updateName = [];
            }
        }
    },
	methods: {
        async getTime(){
            let transData = {
                "userGroup":this.userGroup,
                "userErp":this.userErp //当前登陆人，不允许修改
            }
           this.timers =  await getUserInfoTime(transData);
        },
        socketConnect() {
            let url = '';
            if(isLoc){
                url = 'ws://localhost:3344';
            }else{
                url = 'wss://www.report.xiaozhumaopao.com/websocket';
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
                ws.send('接受到服务端的数据'); 
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
    .user-box{
        display: inline-block;
        margin-bottom: 20px;
    }
    .timer{
        li{
            text-align: left;
        }
    }
}

</style>