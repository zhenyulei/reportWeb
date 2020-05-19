<template>
    <div class="wrapper">
        <div class="quit" @click="quitLogin">退出出登陆</div>
        <h1>欢迎您：{{currPerson}}</h1>
        <h1 class="title">日报系统</h1>
        <ul class="nav">
            <li :class="['days',{'active':isAbled}]" @click="showFill">填写日报</li>
            <li :class="['days',{'active':!isAbled}]" @click="lookReport">查看日报</li>
        </ul>
        <template v-if="isAbled">
            <div class="default-part" v-if="proData.length==0">暂无数据，请点击增加项目按钮</div>
            <ProjectList 
                v-else
                v-for="item in proData"
                @changeProject = "changeProject"
                :projectData= "item" 
                @deletePro= "deleteProject"
                :key= "item.proId"
            />
            <div class="btns">
                <div class="btn addpro" @click="addProject">增加项目</div>
                <div class="btn submit" @click="submitProjectData">提交</div>
            </div>
        </template>
        <template v-else>
            <div class="default-part" v-if="reportData.length==0">暂无数据</div>
            <ReportModle
                v-for="item in reportData" 
                :reportItem= "item" 
                :key= "item.proId"
            />
        </template>
    </div>
</template>
<script>
import ProjectList from "@/components/projectList.vue";
import ReportModle from "@/components/reportModle.vue";
import {requestPersonInfo,submiProjectList,requestLookData} from "@/api";


export default {
    components: {
        ProjectList,
        ReportModle
    },
    data() {
        return {
            proData:[],
            currErp:"",
            currPerson:"",
            isAbled:true,
            reportData:[]
        }
    },
    created() {

    },
    computed: {
    },
    mounted() {
       this.initPage();
    },
    methods: {
        async initPage(){
            var currUser = sessionStorage.getItem("currUser");
            this.currErp = JSON.parse(currUser).userErp;
            this.currPerson = JSON.parse(currUser).userName;
            let transData = {
                "currErp": this.currErp
            }
            this.proData =  await requestPersonInfo(transData);
        },
        changeProject(val){
            let newArr = this.proData.map((item)=>{
                if(item.proId === val.proId){
                    return val;
                }else{
                    return item;
                }
            })
            this.proData = newArr;
        },
        addProject(){
            let newData = {
                "proName":"",
                "proBg":"",
                "proPlan":"",
                "proProgress":"",
                "proProblem":"",
                "proWork":"",
                "proId": Date.now(),
                "proPerson":this.currPerson,
                "proErp":this.currErp
            };
            this.proData.push(newData);
        },
        async submitProjectData(){
            if(this.proData.length>0){
                let res  = await submiProjectList({currData:this.proData});  
                this.lookReport();
            }
        },
        deleteProject(val){
            let newArr = this.proData.filter((item)=>{
                if(item.proId !== val.proId){
                    return item;
                }
            })
            this.proData = newArr;
        },
        async lookReport(){
            this.isAbled = false;
            let transData = {
                "currErp": this.currErp
            }
            this.reportData = await requestLookData(transData);
            console.log(this.reportData);
        },
        showFill(){
            this.isAbled = true;
            this.initPage();
        },
        quitLogin(){
            sessionStorage.removeItem("currUser");
            this.$router.push("/");
        }
    }
}
</script>

<style lang="scss" scoped>
.wrapper{
    margin: 50px auto;
    width: 60%;
    .quit{
        position: absolute;
        top:0px;
        right: 0px;
        padding:5px 20px;
        border: 1px solid #eee;
        background: #ed4640;
        text-align: center;
        line-height: 50px;
        font-size: 16px;
        color: #fff;
        cursor: pointer;
    }
    .nav{
        height: 50px;
        display: flex;
        justify-content: space-between;
        .days{
            width: 100px;
            height: 50px;
            border: 1px solid #eee;
            background: #ccc;
            text-align: center;
            line-height: 50px;
            font-size: 16px;
            color: #fff;
            cursor: pointer;
            position: relative;
            .tips{
                position: absolute;
                top: 0px;
                right: 0px;
                color: #666;
                font-size: 12px;
            }
        }
        .active{
            background: #ed4640;
        }
    }
    .title{
        text-align: center;
        height: 70px;
        font-size: 30px;
    }
    .default-part{
        width: 100%;
        height: 100px;
        line-height: 100px;
        text-align: center;
        color: #666;
        background: #efefef;
    }
    .btns{
        width: 100%;
        display: flex;
        height: 50px;
        justify-content: space-between;
        align-items: center;
        .btn{
            width: 100px;
            height: 50px;
            border: 1px solid #eee;
            background: #ed4640;
            text-align: center;
            line-height: 50px;
            font-size: 16px;
            color: #fff;
            cursor: pointer;
        }
        .addpro{

        }
        .submit{

        }
    }
}

</style>
