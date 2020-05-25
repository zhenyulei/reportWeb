<template>
	<div class="list-wrapper">
		<div class="line-min-part">
            <span class="pro-name">需求名称</span>
            <input class="input-box" placeholder="请输入需求名称" v-model="listData.proName" @blur="changeData" />
        </div>
        <div class="line-max-part">
            <span class="pro-name">需求背景</span>
            <textarea class="area-box" placeholder="请输入需求背景" v-model="listData.proBg" @blur="changeData" :disabled="listData.proBg=='null'"></textarea>
            <nut-switch :active="listData.proBg|typeData" @change="onChange($event,'proBg')" class="my-switch"></nut-switch>
        </div>
        <div class="line-min-part">
            <span class="pro-name">计划排期</span>
            <input class="input-box" placeholder="请输入计划排期" v-model="listData.proPlan" @blur="changeData" :disabled="listData.proPlan=='null'" />
            <nut-switch :active="listData.proPlan|typeData" @change="onChange($event,'proPlan')" class="my-switch"></nut-switch>
        </div>
        <div class="line-min-part">
            <span class="pro-name">目前进度</span>
            <input class="input-box" placeholder="请输入目前需求进度" v-model="listData.proProgress" @blur="changeData" :disabled="listData.proProgress=='null'"/>
            <nut-switch :active="listData.proProgress|typeData" @change="onChange($event,'proProgress')"  class="my-switch"></nut-switch>
        </div>
        <div class="line-max-part">
            <span class="pro-name">遇到问题</span>
            <textarea class="area-box" placeholder="请输入遇到问题" v-model="listData.proProblem" @blur="changeData" :disabled="listData.proProblem=='null'"></textarea>
            <nut-switch :active="listData.proProblem|typeData" @change="onChange($event,'proProblem')" class="my-switch"></nut-switch>
        </div>
        <div class="line-max-part">
            <span class="pro-name">今日工作</span>
            <textarea class="area-box" placeholder="请输入今日具体工作" v-model="listData.proWork" @blur="changeData" :disabled="listData.proWork=='null'"></textarea>
            <nut-switch :active="listData.proWork|typeData" @change="onChange($event,'proWork')" class="my-switch"></nut-switch>
        </div>
        <div class="line-min-part">
            <span class="pro-name">研发人员</span>
            <input class="input-box" v-model="listData.proPerson"/>
        </div>
        <div class="delete-btn" @click="deletePro">删除该项目</div>
	</div>
</template>

<script>
import Vue from 'vue';

export default {
    components: {},
    props:{
        projectData:{
            type:Object,
            default:()=>{
                return {}
            }
        }
    },
	data() {
		return {
            listData:this.projectData
		};
    },
    watch:{
        projectData(val){
            this.listData = val;
        }
    },
    computed: {
        
    },
	created() {

    },
	mounted() {

	},
    destroyed() {},
    filters:{
        typeData(val){
            if(val == 'null'){
                return false;
            }else{
                return true;
            }
        }
    },
	methods: {
        changeData(){
            let listData = JSON.parse(JSON.stringify(this.listData).replace(/(\'|\‘)/,'‘'));
            this.$emit("changeProject",listData);
        },
        deletePro(){
            this.$emit("deletePro",this.listData);
            this.$toast.text('删除成功')
        },
        onChange($event,value){
            if(!$event){
                this.listData[value] = 'null';
            }else{
                this.listData[value] = '';
            }
            this.$emit("changeProject",this.listData);
        }
	}
};
</script>
<style lang="scss" scoped>
.list-wrapper{
    padding:20px 30px;
    border:1px solid #ccc;
    margin: 0 auto;
    margin-bottom: 20px;
    position: relative;
    .delete-btn{
        position: absolute;
        top: 20px;
        right: -100px;
        width: 100px;
        height: 50px;
        border: 1px solid #eee;
        background: #4e596bbd;
        text-align: center;
        line-height: 50px;
        font-size: 16px;
        color: #fff;
        cursor: pointer;
    }
    .line-min-part{
        height: 50px;
        line-height: 50px;
        display: flex;
        align-items: center;
        margin-bottom: 10px;
    }
    .pro-name{
        height: 40px;
        line-height: 40px;
        margin-right: 10px;
    }
    .input-box{
        border:1px solid #ccc;
        padding-left:10px;
        height: 40px;
        line-height: 40px;
        flex: 1;
        outline: none;
    }
    .my-switch{
        margin:0 20px;
    }
    .line-max-part{
        height: 160px;
        display: flex;
        align-items: flex-start;
        margin-bottom: 10px;
            .area-box{
                border:1px solid #ccc;
                padding-left:10px;
                height: 150px;
                line-height: 30px;
                flex: 1;
                resize:none;
                outline: none;
            }
    }

}



</style>