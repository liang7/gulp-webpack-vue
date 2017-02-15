import Vue from 'vue'
import router from '../routers'
import * as types from './types'
import store from './store'

// HTTP相关
Vue.http.options.crossOrigin = true
Vue.http.options.emulateJSON = true;
Vue.http.options.xhr = { withCredentials: true }

Vue.http.interceptors.push((request, next)=>{
    // 这里对请求体进行处理
    request.url = '/backapi'+ request.url;
    next((response) => {
        if(response.ok) {
            let data = response.data || {};
            if(typeof(data) == 'string') data = JSON.parse(data);
            //session 超时
            if(data.head && data.head.code == '125') {
                if(!localStorage.getItem('_b_u')) {
                    localStorage.setItem('_b_u', window.location.hash.substr(1))
                }  
                router.push({path:'/login'})
                return; 
            }
        }
    })
})

//登录用户是否拥有该权限接口
export const getHasPrivilege = ({ commit }, data) => {
	let key = data.model+'_'+data.privilegeValue;
	if(store.state.app.privilege[key]) return store.state.app.privilege[key] == 1;
    return Vue.http.post('/privilege/hasPrivilege', data).then(response => {
    	let body = response.data.body || {};
    	let value = body.hasPrivilege == 1;
    	commit(types.GET_HAS_PRIVILEGE, {
    		key: key,
    		value: value
    	});
        return value;
    })
}

//贷款渠道列表
export const getChannelList = ({ commit }) => {
    if(store.state.app.channelList) return store.state.app.channelList;
    return Vue.http.post('/common/getChannelList').then(response => {
        let body = response.data.body||{};
        commit(types.SUCCESS_GET_CHANNELLIST, {data:body.datas});
        return body.datas;
    })
}
//贷款渠道列表1
export const getChannelList1 = ({ commit }) => {
    if(store.state.app.channelList1) return store.state.app.channelList1;
    return Vue.http.post('/common/getChannelList').then(response => {
    	let body = response.data.body||{};
        let data = body.datas;
        if(!data || !data.length) return null;
        let data1 = [];
        for(let i = 0, len = data.length; i<len; i++) {
            if(data[i].id == 0) {
                data1.push({
                    id: 0,
                    channelName: '整体'
                })
            } else {
                data1.push(data[i])
            }
        }
        commit(types.SUCCESS_GET_CHANNELLIST, {data:data,data1:data1});
        return data1;
    })
}

//请求记录vuex登录状态
export const getSnsLogins = ({ commit }, data) => {
	return Vue.http.post('/employee/login', data).then(response => {
        if(response.ok){
            commit(types.SUCCESS_GET_SNSLOGINS, response.data);
        } else {
            commit(types.FAILURE_GET_SNSLOGINS)
        }
        return response.data;
    }, response => {
        commit(types.FAILURE_GET_SNSLOGINS)
    })
}
//退出登录状态
export const logout = ({ commit }, data) => {
    return Vue.http.post('/employee/logout', data).then(response => {
        return response.data;
    })
}
//获取登录用户信息列表
export const getlogdDetail = ({ commit }) => {
    return Vue.http.post('/employee/logdDetail').then(response => {
        if(response.ok){
            commit(types.SUCCESS_GET_LOGDDETAIL, response.data);
            return response.data;
        }
        commit(types.FAILURE_GET_LOGDDETAIL)
        return false;
    }, response => {
        commit(types.FAILURE_GET_LOGDDETAIL)
        return false;
    })
}
//获取登录用户权限目录列表
export const getUserDirectoryList = ({ commit }) => {
	return Vue.http.post('/employee/userDirectoryList').then(response => {
        let body = response.data.body;
        if(!body || !body.datas || !body.datas.length) {
            commit(types.FAILURE_GET_DIRECTORYLIST);
            return;
        };
        commit(types.SUCCESS_GET_DIRECTORYLIST, body.datas);
        return body.datas;
    })
}
//查询审核人员列表
export const getAuditorList = ({ commit }) => {
    if(store.state.app.auditorList) return store.state.app.auditorList;
    return Vue.http.post('/employee/auditorList').then(response => {
        let body = response.data.body || {};
        if(response.ok){
            commit(types.SUCCESS_GET_AUDITORLIST, body.datas);
            return body.datas;
        }
        commit(types.FAILURE_GET_AUDITORLIST);
        return null;
    })
}
//查询运营人员列表
export const getOperationList = ({ commit }) => {
    if(store.state.app.operationList) return store.state.app.operationList;
    return Vue.http.post('/employee/operationList').then(response => {
        let body = response.data.body || {};
        if(response.ok){
            commit(types.SUCCESS_GET_OPERATIONLIST, body.datas);
            return body.datas;
        }
        commit(types.FAILURE_GET_OPERATIONLIST);
        return null;
    })
}
//获取借款人三照
export const getMaterial = ({ commit }, data) => {
    return Vue.http.post('/loan/material', data).then(response => {
        let body = response.data.body;
        let material = [];
        let MaterialPath = [];
        if(body && body.datas && body.datas.length) {
            material = body.datas;
            for(let i = 0, len = body.datas.length; i<len; i++) {
                MaterialPath.push(body.datas[i].picPath);
            }
        }
        return {
            material: material, 
            MaterialPath: MaterialPath, 
        };
    })
}


