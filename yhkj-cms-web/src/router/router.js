import App from '../App'

const home = r => require.ensure([], () => r(require('../page/home/home')), 'home');
const storeManager = r => require.ensure([], () => r(require('../page/store/storeManager')), 'storeManager');
const franchiseeManager = r => require.ensure([], () => r(require('../page/store/franchiseeManager')), 'franchiseeManager');
const storeChildren = r => require.ensure([], () => r(require('../page/store/children/storeChildren')), 'storeChildren');
const lookStore = r => require.ensure([], () => r(require('../page/store/children/lookStore')), 'lookStore');
const banner = r => require.ensure([],()=> r(require('../page/operation/bannerManager')),'banner')
const bannerManager = r => require.ensure([], () => r(require('../page/operation/bannerManager')), 'bannerManager');
const login = r => require.ensure([], () => r(require('../page/login/login')), 'login');
const bannerEdit = r => require.ensure([], () => r(require('../page/operation/children/bannerEdit')), 'bannerEdit');
const healthRecords = r => require.ensure([], () => r(require('../page/vip/healthRecords')), 'healthRecords');
const orderManager = r => require.ensure([], () => r(require('../page/order/orderManager')), 'orderManager');
const viewOrder = r => require.ensure([], () => r(require('../page/order/children/viewOrder')), 'viewOrder');
const lockOrder = r => require.ensure([], () => r(require('../page/order/children/lockOrder')), 'lockOrder');
const cardRecord = r => require.ensure([], () => r(require('../page/trafficData/cardRecord')), 'cardRecord');
const expensesRecord = r => require.ensure([], () => r(require('../page/trafficData/expensesRecord')), 'expensesRecord');
const rechargeRecord = r => require.ensure([], () => r(require('../page/trafficData/rechargeRecord')), 'rechargeRecord');
const reservationManager = r => require.ensure([], () => r(require('../page/reservation/reservationManager')), 'reservationManager');
const accountManager = r => require.ensure([], () => r(require('../page/permission/accountManager')), 'accountManager');
const operationLog = r => require.ensure([], () => r(require('../page/permission/operationLog')), 'operationLog');
const storeAccount = r => require.ensure([], () => r(require('../page/permission/storeAccount')), 'storeAccount');
const settings = r => require.ensure([], () => r(require('../page/settings/settings')), 'settings');
const collectingSilver = r=> require.ensure([],() => r(require('../page/collectingSilver/collectingSilver')),'collectingSilver');
const staffManagement = r =>require.ensure([],() => r(require('../page/store/staffManagement')),'staffManagement');
const storeEdit = r => require.ensure([],()=> r(require('../page/store/children/storeEdit')),'storeEdit');
const bannerChild = r=> require.ensure([],()=> r(require('../page/operation/children/bannerChild')),'bannerChild');
//段方圆
const vipManager = r => require.ensure([],()=>r(require('../page/vip/vipManager')),'vipManager');
const cardCategory= r => require.ensure([],() => r(require('../page/production/cardCategory')), 'cardCategory');
const physiotherapyCategory = r => require.ensure([],() => r(require('../page/production/physiotherapyCategory')), 'physiotherapyCategory');
const projectManager = r => require.ensure([],() => r(require('../page/production/projectManager')),'projectManager');
const commodityManager = r => require.ensure([],()=>(require('../page/production/commodityManager')),'commodityManager');
const production = r => require.ensure([],()=>(require('../page/production/children/production')),'production');
const viewVip = r => require.ensure([],()=>(require('../page/vip/children/viewVip')),'viewVip');
const commodity = r => require.ensure([],()=>(require('../page/production/children/commodity')),'commodity');
const commodityEdit = r =>require.ensure([],()=>(require('../page/production/children/commodityEdit')),'commodityEdit');
const commodityAdd = r =>require.ensure([],()=>(require('../page/production/children/commodityAdd')),'commodityAdd');
const healthRecordsDetail = r =>require.ensure([],()=>(require('../page/vip/healthRecords')),'healthRecords');
const schedulingManager = r =>require.ensure([],()=>(require('../page/reservation/schedulingManager')),'schedulingManager');
const recommendedPosition = r =>require.ensure([],()=>(require('../page/store/recommendedPosition')),'recommendedPosition');

export default [{
  path: '/',
  component: App,
  children: [
    {
      path: '',
      redirect: '/home'
    },
    {
      path: '/home',
      component: home,
      meta: {keepAlive: false}
    },
    {
      path: '/storeManager',
      component: storeManager,
      meta: {keepAlive: false}
    },
    {
      path: '/franchiseeManager',
      component: franchiseeManager,
      meta: {keepAlive: false}
    },
    {
      path: '/storeChildren/:id/:mode',
      component: storeChildren,
      meta: {keepAlive: false}
    },
    {
      path: '/bannerManager',
      component: bannerManager,
      meta: {keepAlive: false}
    },
    {
      path: '/login',
      component: login,
      meta: {keepAlive: false}
    },
    {
      path: '/bannerEdit',
      component: bannerEdit,
      meta: {keepAlive: false}
    },
    {
      path: '/healthRecords/:id',
      component: healthRecords,
      meta: {keepAlive: false}
    },
    {
      path: '/lookStore/:id',
      component: lookStore,
      meta: {keepAlive: false}
    },
    {
      path: '/orderManager',
      component: orderManager,
      meta: {keepAlive: true}
    },
    {
      path: '/lockOrder/:id',
      component: lockOrder,
      meta: {keepAlive: false}
    },
    {
      path: '/viewOrder',
      component: viewOrder,
      meta: {keepAlive: false}

    },
    {
      path: '/cardRecord/',
      component: cardRecord,
      name: 'cardRecord',
      meta: {keepAlive: false}
    },
    {
      path: '/expensesRecord/',
      component: expensesRecord,
      name: 'expensesRecord',
      meta: {keepAlive: false}
    },
    {
      path: '/rechargeRecord/',
      component: rechargeRecord,
      name: 'rechargeRecord',
      meta: {keepAlive: false}
    },
    {
      path: '/reservationManager',
      component: reservationManager,
      meta: {keepAlive: false}
    },
    {
      path: '/accountManager',
      component: accountManager,
      meta: {keepAlive: false}
    },
    {
      path: '/operationLog',
      component: operationLog,
      meta: {keepAlive: false}
    },
    {
      path: '/settings',
      component: settings,
      meta: {keepAlive: false}
    },
    {
      path: '/storeAccount',
      component: storeAccount,
      meta: {keepAlive: true}
    },
    // 段方圆
    {
      path: '/vipManager',
      component: vipManager,
      meta: {keepAlive: false}
    },
    {
      path: '/viewVip/:id',
      component: viewVip,
      meta: {keepAlive: false}
    },
    {
      path: '/cardCategory',
      component: cardCategory,
      meta: {keepAlive: true}
    },
    {
      path: '/physiotherapyCategory',
      component: physiotherapyCategory,
      meta: {keepAlive: true}
    },
    {
      path: '/projectManager',
      component: projectManager,
      meta: {keepAlive: false}
    },
    {
      path: '/production/:mode/:id',
      component: production,
      meta: {keepAlive: false}
    },
    {
      path: '/commodityManager',
      component: commodityManager,
      meta: {keepAlive: true}
    },
    {
      path: '/commodity/:id',
      component: commodity,
      meta: {keepAlive: false}
    },
    {
      path: '/commodityEdit/:id',
      component: commodityEdit,
      meta: {keepAlive: false}
    },
    {
      path: '/commodityAdd',
      component: commodityAdd,
      meta: {keepAlive: false}
    },
    {
      path: '/collectingSilver',
      component: collectingSilver,
      meta: {keepAlive: false}
    },
    {
      path: '/employee',
      component: staffManagement
    },
    {
      path: '/storeEdit',
      component: storeEdit
    },
    {
      path: '/banner',
      component: banner
    },
    {
      path: '/bannerChild/:id',
      component: bannerChild
    },
    {
      path: '/appoint',
      component: () => import('@/page/booking/appoint')
    },
    {
      path: '/bannerEdit/:mode/:id',
      component: bannerEdit
    },
    {
      path:'/schedulingManager',
      component:schedulingManager
    },
    {
      path: '/commodityEdit2/:id',
      component: commodityEdit,
      meta: {keepAlive: false}
    },
    {
      path:'/recommendedPosition',
      component:recommendedPosition
    }
  ]
}]
