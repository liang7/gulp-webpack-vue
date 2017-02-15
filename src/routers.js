import VueRouter from 'vue-router'

const routes = [
    {   
        path: '/',
        component: require('./modules/home/index')
    },{ 
        path: '/dashboard',
        component: require('./modules/home/index')
    },{ 
        path: '/login',
        component: require('./components/login')
    },{ 
        path: '/dun/list',
        component: (resolve) => {
            require(['./modules/dun/list'],resolve)
        }
    },{ 
        path: '/dun/detail/:loanId',
        component: (resolve) => {
            require(['./modules/dun/detail'],resolve)
        }
    },{ 
        path: '/audit/list',
        component: (resolve) => {
            require(['./modules/audit/list'],resolve)
        }
    },{ 
        path: '/audit/detail/:loanId',
        component: (resolve) => {
            require(['./modules/audit/detail'],resolve)
        }
    },{ 
        path: '/report/dunReport',
        component: (resolve) => {
            require(['./modules/report/dunReport'],resolve)
        }
    },{ 
        path: '/report/auditReport',
        component: (resolve) => {
            require(['./modules/report/auditReport'],resolve)
        }
    },{ 
        path: '/report/financeReport',
        component: (resolve) => {
            require(['./modules/report/financeReport'],resolve)
        }
    },{
        path: '/report/operationReport',
        component: (resolve) => {
            require(['./modules/report/operationReport'],resolve)
        }
    },{
        path: '/report/releaseReport',
        component: (resolve) => {
            require(['./modules/report/releaseReport'],resolve)
        }
    },{
        path: '/report/receivedReport',
        component: (resolve) => {
            require(['./modules/report/receivedReport'],resolve)
        }
    },{
        path: '/report/receivableReport',
        component: (resolve) => {
            require(['./modules/report/receivableReport'],resolve)
        }
    },{
        path: '/report/dundailyreport',
        component: (resolve) => {
            require(['./modules/report/dundailyreport'],resolve)
        }
    },{ 
        path: '/finance/releaseList',
        component: (resolve) => {
            require(['./modules/finance/releaseList'],resolve)
        }
    },{ 
        path: '/finance/backList',
        component: (resolve) => {
            require(['./modules/finance/backList'],resolve)
        }
    },{ 
        path: '/sets/paysetslist',
        component: (resolve) => {
            require(['./modules/sets/paysetslist'],resolve)
        }
    },{ 
        path: '/black/blacklist',
        component: (resolve) => {
            require(['./modules/black/blacklist'],resolve)
        }
    },{ 
        path: '/black/blackdetails',
        component: (resolve) => {
            require(['./modules/black/blackdetails'],resolve)
        }
    },{ 
        path: '/cs/csReleaseList',
        component: (resolve) => {
            require(['./modules/cs/csReleaseList'],resolve)
        }
    },{ 
        path: '/cs/backList',
        component: (resolve) => {
            require(['./modules/cs/backList'],resolve)
        }
    },
]
//创建路由实例
const router = new VueRouter({
    routes
})

router.beforeEach((to, from, next) => {
    window.scrollTo(0, 0)
    next();
})

export default router



