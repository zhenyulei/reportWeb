<template>
	<div class="wrapper-model">
		<div class="line-part" v-if="isShowFun(reportItem.proName)">
            <span class="pro-name">{{reportItem.proName}}</span>
        </div>
        <div class="line-part" v-if="isShowFun(reportItem.proBg)">
            <span class="pro-name">需求背景：</span>
            <span class="pro-content">{{reportItem.proBg}}</span>
        </div>
        <div class="line-part" v-if="isShowFun(reportItem.proPlan)">
            <span class="pro-name">计划排期：</span>
			<span class="pro-content">{{reportItem.proPlan}}</span>
        </div>
        <div class="line-part" v-if="isShowFun(reportItem.proProgress)">
            <span class="pro-name">目前进度：</span>
			<span class="pro-content">{{reportItem.proProgress}}</span>
        </div>
        <div class="line-part" v-if="isShowFun(reportItem.proProblem)">
            <span class="pro-name">遇到问题：</span>
			<span class="pro-content">{{reportItem.proProblem}}</span>
        </div>
        <div class="line-part" v-if="isShowFun(reportItem.proWork)">
            <span class="pro-name">今日工作：</span>
			<span class="pro-content">{{reportItem.proWork}}</span>
        </div>
        <div class="line-part" v-if="isShowFun(reportItem.proPerson)">
            <span class="pro-name">研发人员：</span>
			<span class="pro-content">{{reportItem.proPerson}}</span>
        </div>
		<div class="tap">占位符</div>
	</div>
</template>

<script>
import Vue from 'vue';
export default {
	components: {},
	props:{
		reportItem:{
			type:Object,
			default:()=>{
				return {}
			}
		}
	},
	data() {
		return {
		};
	},
	created() {},
	mounted() {
		//console.log(this.reportItem);
	},
	destroyed() {},
	methods: {
		isShowFun:function(val){
			if(val == "" || val == "null"){
				return false;
			}else{
				return true;
			}
		}
	}
};
</script>
<style lang="scss" scoped>
.wrapper-model{
    width: 100%;
	padding-top: 20px;
	.line-part{
		display: flex;
		font-size: 16px;
		line-height: 30px;
		.pro-name{
			text-align: left;
			font-weight: bold;
			color: #000;
		}
		.pro-content{
			flex: 1;
			color: #333;
		}
	}
	.tap{
		color: #fff;
		width: 100%;
		height: 30px;
		background:transparent;
	}
}
</style>