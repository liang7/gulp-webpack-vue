// import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import logins from './modules/logins'
import * as actions from './actions'

export default new Vuex.Store({
	actions,
    modules: {
    	app,
        logins,
    }
})
