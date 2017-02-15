import {
	SUCCESS_GET_LOGDDETAIL,
    FAILURE_GET_LOGDDETAIL,
    FAILURE_GET_DIRECTORYLIST,
    SUCCESS_GET_DIRECTORYLIST,
    SUCCESS_GET_CHANNELLIST,
    SUCCESS_GET_OPERATIONLIST,
    FAILURE_GET_OPERATIONLIST,
    SUCCESS_GET_AUDITORLIST,
    FAILURE_GET_AUDITORLIST,
    GET_HAS_PRIVILEGE
} from '../types'

const state = {
    logdDetail:{
        realName: '登录'
    },
    directoryList: [],
    channelList: null,
    channelList1: null,
    auditorList: null,
    operationList: null,
    privilege: {},
}

const mutations = {
    [FAILURE_GET_LOGDDETAIL](state){ //获取登录用户信息
        state.logdDetail = {
            realName: '登录'
        }
    },
    [SUCCESS_GET_LOGDDETAIL](state,data){
        if(!data.body) return;
        state.logdDetail = data.body
    },
    [FAILURE_GET_DIRECTORYLIST](state){ //权限菜单
        state.directoryList = []
    },
    [SUCCESS_GET_DIRECTORYLIST](state,data){
        state.directoryList = data
    },
    [SUCCESS_GET_CHANNELLIST](state,d){  //渠道列表
        state.channelList = d.data;
        if(d.data1) {
            state.channelList1 = d.data1;
            return; 
        }
        let data = d.data;
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
        state.channelList1 = data; 
    },
    [SUCCESS_GET_OPERATIONLIST](state,data){    //运营人员列表
        state.operationList = data
    },
    [FAILURE_GET_OPERATIONLIST](state){
        state.operationList = null
    },
    [SUCCESS_GET_AUDITORLIST](state,data){  //审核人员列表
        data.unshift({
            employeeId: null,
            realName: '全部审核人'
        })
        state.auditorList = data;
    },
    [FAILURE_GET_AUDITORLIST](state){
        state.auditorList = null
    },
    [GET_HAS_PRIVILEGE](state, data){   //是否有权限
        state.privilege[data.key] = (data.value == 1?1:-1)
    }
}

export default {
    state,
    mutations
}