<template>
    <div class="wrapper">
        <div class="quit" @click="quitLogin">退出登录</div>
        <h1 class="popular">欢迎您：{{userName}}</h1>
        <ScoketRes v-if="userErp === 'zhenyulei'"/>
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
                :key= "item.id"
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
                :key= "item.id"
            />
        </template>
        <nut-backtop 
        :distance="400"
        >
        </nut-backtop>
    </div>
</template>
<script>
import ProjectList from "@/components/projectList.vue";
import ReportModle from "@/components/reportModle.vue";
import ScoketRes from "@/components/scoketRes.vue"
import {requestPersonInfo,submiProjectList,requestLookData,getVersion,deleteData} from "@/api";

export default {
    components: {
        ProjectList,
        ReportModle,
        ScoketRes
    },
    data() {
        return {
            proData:[],
            userErp:"",
            userName:"",
            userGroup:"",
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
       this.$nextTick(()=>{
            document.body.classList.remove("hasbg");
		})
    },
    methods: {
        async initPage(){
            var currUser = localStorage.getItem("currUser");
            this.userErp = JSON.parse(currUser).userErp;
            this.userName = JSON.parse(currUser).userName;
            this.userGroup = JSON.parse(currUser).userGroup;
            let transData = {
                "userErp": this.userErp
            }
            this.proData =  await requestPersonInfo(transData);
            let version = await getVersion();
            console.log(version)
        },
        changeProject(val){
            let newArr = this.proData.map((item)=>{
                if(item.id === val.id){
                    return val;
                }else{
                    return item;
                }
            })
            this.proData = newArr;
        },
        addProject(){
            let newData = {
                "id":Date.now(),
                "addFlag":true,
                "proName":"",
                "proBg":"",
                "proPlan":"",
                "proProgress":"",
                "proProblem":"",
                "proWork":"",
                "proPerson":this.userName,//需求研发人，可以修改
                "userName":this.userName,
                "userGroup":this.userGroup,
                "userErp":this.userErp //当前登陆人，不允许修改
            };
            this.proData.push(newData);
        },
        async submitProjectData(){  
            if(this.proData.length>0){
                let res  = await submiProjectList({currData:this.proData});  
                this.$toast.text('提交成功～～');
            }else{
                this.$toast.text('请填写日报再提交');
            }
        },
        async deleteProject(val){
            let res = await deleteData({id:val.id});
            let newArr = this.proData.filter((item)=>{
                if(item.id !== val.id){
                    return item;
                }
            })
            this.proData = newArr;
        },
        async lookReport(){
            this.isAbled = false;
            let transData = {
                "userErp": this.userErp
            }
            this.reportData = await requestLookData(transData);
        },
        showFill(){
            this.isAbled = true;
            this.initPage();
        },
        quitLogin(){
            localStorage.removeItem("currUser");
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
        background: #ed4640d9;
        text-align: center;
        line-height: 50px;
        font-size: 16px;
        color: #fff;
        cursor: pointer;
    }
    .popular{
        color: #ff0074;
    }
    .nav{
        height: 50px;
        display: flex;
        justify-content: flex-start;
        margin-bottom: 20px;
        .days{
            width: 100px;
            height: 50px;
            border: 1px solid #ccc;
            text-align: center;
            line-height: 50px;
            font-size: 16px;
            color: #333;
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
            border: 1px solid #ed4640;
            color:#fff;
        }
    }
    .title{
        text-align: center;
        height: 70px;
        font-size: 30px;
        font-weight: bold;
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
    }
}

</style>
