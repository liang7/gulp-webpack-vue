import {
	SUCCESS_GET_SNSLOGINS,
	FAILURE_GET_SNSLOGINS
} from '../types'

const state = {logins:{}}

const mutations = {
    [FAILURE_GET_SNSLOGINS](state){
        state.logins = {}
    },
    [SUCCESS_GET_SNSLOGINS](state,data){
        state.logins = data
    }
}

export default {
    state,
    mutations
}