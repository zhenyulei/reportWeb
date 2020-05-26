import axios from "axios";
import qs from "qs";
let isLoc = (() => /localhost|page.jd.com/.test(location.hostname))();
function handleResponse(response) {
    return new Promise((resolve,reject)=>{
        resolve(response.data);
    })
}

function handleError(err){
    console.error(err)
}
//获取当前登陆人的数据
export function requestPersonInfo(transData) {
    const url = "/api/project/getPersonData";
    return axios.post(url, qs.stringify(transData)).then(handleResponse).catch(handleError);
}

//获取当前用户群组的更新日期
export function getUserInfoTime(transData) {
    const url = "/api/users/getUserInfoTime";
    return axios.post(url, qs.stringify(transData)).then(handleResponse).catch(handleError);
}

//提交数据
export function submiProjectList(transData) {
    const url = "/api/project/submitData";
    return axios.post(url,transData).then(handleResponse).catch(handleError);
}

//查看日报
export function requestLookData(transData) {
    const url = "/api/project/lookData";
    console.log(transData)
    return axios.post(url, qs.stringify(transData)).then(handleResponse).catch(handleError);
}

//登陆信息
export function userLogin(transData) {
    const url = "/api/users/userLogin";
    return axios.post(url, qs.stringify(transData)).then(handleResponse).catch(handleError);
}
//获取后端版本
export function getVersion() {
    const url = "/api/project/currVersion";
    return axios.get(url).then(handleResponse).catch(handleError);
}
//删除日报
export function deleteData(transData) {
    const url = "/api/project/deleteData";
    return axios.post(url,qs.stringify(transData)).then(handleResponse).catch(handleError);
}
