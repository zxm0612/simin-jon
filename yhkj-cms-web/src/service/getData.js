import fetch from '../config/fetch'
/**
*首页相关数据请求
*/

// 请求首页数据
export const homeData = () => fetch('/cms/api/home/homeStat', {
  mode: 'system'
}, 'GET')

/**
 *登陆相关
 */

//会员登陆
export const login = (username, password) => fetch('/cms/api/sys/login', {
  username: username,
  password: password
}, 'POST', 'form')

//会员登出
export const logout = () => fetch('/cms/api/sys/logout', {}, 'POST')

//获取权限相关
export const initPermisson = () => fetch('/cms/api/sys/menus')




/**
 *会员相关数据请求
 */

//请求会员列表
export const vipList = (kw, storeId, st, et, pageNum, pageSize) => fetch('/cms/api/appuser/list', {
  keyword: kw,
  mendianId: storeId,
  startTime: st,
  endTime: et,
  pageNum: pageNum,
  pageSize: pageSize,
  'mode': 'system'
})

//请求会员详情
export const vipInfo = id => fetch('/cms/api/appuser/detail', {
  id: id
})

//新增会员
export const addUser = (un, phone, sex, birthday, height, address) => fetch('/cms/api/appuser/add?mode=system', {
  name: un,
  phone: phone,
  sex: sex,
  birthday: birthday,
  height: height,
  address: address
}, 'POST')

//编辑会员
export const editVip = (id, name, phone, sex, birthday, height, address) => fetch('/cms/api/appuser/edit', {
  id: id,
  name: name,
  phone: phone,
  sex: sex,
  birthday: birthday,
  height: height,
  address: address
}, 'POST', 'Json')

//调入会员
export const moveVip = id => fetch('/cms/api/appuser/ajust', {
  id: id
}, 'POST','form')

//检索会员
export const searchVip = keyword => fetch('/cms/api/user/search', {
  keyword: keyword
})

//手机号码查询会员
export const searchPhone = phone => fetch('/cms/api/appuser/search', {
  phone: phone
})

/**
 * 健康档案相关数据请求
 */

//会员健康档案列表
export const healthList = (userId) => fetch('/cms/api/appuser/healthRecord/list', {
  userId: userId
})

//导入TMT健康档案
export const importHealthFile = (userId, file) => fetch('/cms/api/health/record/import', {
  userId: userId,
  file: file
}, 'POST')

//删除健康档案
export const delHealthFile = recordId => fetch('/cms/api/appuser/healthRecord/del', {
  recordId: recordId
}, 'POST', 'form')

//会员健康档案详情
export const healthRecordDetail = recordId => fetch('/cms/api/appuser/healthRecord/detail', {
  recordId: recordId
})

/*
*账户余额部分
 */

//会员账户余额列表
export const balanceList = userId => fetch('/cms/api/appuser/balance/list', {
  userId: userId
})

//会员账户余额总额
export const userBalance = userId => fetch('/cms/api/appuser/balance/stat', {
  userId: userId
})

/*
订单部分
 */

//订单列表
export const orderList = (kw, orderType, orderStatus, st, et, appType, pageNum, pageSize) => fetch('/cms/api/order/list', {
  mode: 'system',
  keyword: kw,
  // orderId:orderId,
  orderType: orderType,
  orderStatus: orderStatus,
  startTime: st,
  endTime: et,
  appType: appType,
  pageNum: pageNum,
  pageSize: pageSize
})

//订单详情
export const orderDetail = orderId => fetch('/cms/api/order/detail', {
  orderId: orderId
})

//导出订单
export const exportOrder = (keyword, orderType, orderStatus, startTime, endTime, appType) => fetch('/cms/api/order/export', {
  keyword: keyword,
  orderType: orderType,
  orderStatus: orderStatus,
  startTime: startTime,
  endTime: endTime,
  appType: appType
})

//会员已购买商品
export const purchasedGoods = (userId, shoppingType) => fetch('/cms/api/appuser/shopping/list', {
  userId: userId,
  shoppingType: shoppingType
})

/*
预约部分
暂时不做
 */

/*
充值部分
 */

//门店充值记录列表
export const rechargeRecordList = (kw, salesEmpld, startTime, endTime, appType, pageNum, pageSize) => fetch('/cms/api/recharge/list', {
  keyword: kw,
  salesEmpld: salesEmpld,
  startTime: startTime,
  endTime: endTime,
  appType: appType,
  pageNum: pageNum,
  pageSize: pageSize
});

//导出门店充值记录
export const exportRechargeRecord = (kw, salesEmpld, startTime, endTime, appType) => fetch('/cms/api/recharge/export', {
  keyword: kw,
  salesEmpld: salesEmpld,
  startTime: startTime,
  endTime: endTime,
  appType: appType
}, 'POST')

//会员充值结算
export const vipRechargeSettlement = (userId, totalMoney, remark, payType, payMoney, sales, empld, empName) => fetch('/cms/api/recharge/add', {
  userId: userId,
  totalMoney: totalMoney,
  remark: remark,
  payType: payType,
  payMoney: payMoney,
  sales: sales,
  empld: empld,
  empName: empName
}, 'POST')

/*
办卡部分
 */

//办卡记录列表
export const cardRecordList = (keyword, salesEmpld, startTime, endTime, appType, shoppingType, pageNum, pageSize) => fetch('/cms/api/order/card/list', {
  keyword: keyword,
  salesEmpld: salesEmpld,
  startTime: startTime,
  endTime: endTime,
  appType: appType,
  shoppingType: shoppingType,
  pageNum: pageNum,
  pageSize: pageSize
})

//导出办卡记录
export const exportCardRecord = (keyword, salesEmpId, startTime, endTime, appType, shoppingType) => fetch('/cms/api/order/card/export', {
  keyword: keyword,
  salesEmpId: salesEmpId,
  startTime: startTime,
  endTime: endTime,
  appType: appType,
  shoppingType: shoppingType
}, 'POST')

//会员开卡结算
export const addCard = (
  userId,
  totalMoney,
  remark,
  payType,
  payMoney,
  orderItemList,
  shoppingId,
  price,
  num,
  sales,
  empId,
  empName
) => fetch('/cms/api/order/card/add', {

  userId: userId,
  totalMoney: totalMoney,
  remark: remark,
  payType: payType,
  payMoney: payMoney,
  orderItemList: orderItemList,
  shoppingId: shoppingId,
  price: price,
  num: num,
  sales: sales,
  empId: empId,
  empName: empName
}, 'POST')

/**
*消费部分
*/

//门店消费记录
export const storeXfRecord = (keyword, empld, startTime, endTime, appType, shoppingType, pageNum, pageSize) => fetch('/cms/api/expense/list', {
  keyword: keyword,
  empld: empld,
  startTime: startTime,
  endTime: endTime,
  appType: appType,
  shoppingType: shoppingType,
  pageNum: pageNum,
  pageSize: pageSize
})

//门店导出消费记录
export const storeExportXfRecord = (keyword, empld, startTime, endTime, appType, shoppingType) => fetch('/cms/api/expense/export', {
  keyword: keyword,
  empld: empld,
  startTime: startTime,
  endTime: endTime,
  appType: appType,
  shoppingType: shoppingType
}, 'POST')

//到店消费结算
export const consumerSettlement = (
  userid,
  totalMoney,
  remark,
  payType,
  payMoney,
  expenseList,
  orderId,
  orderItemId,
  shoppingId,
  productId,
  price,
  amount,
  empld,
  empName
) => fetch('/cms/api/expense/add', {
  userid: userid,
  totalMoney: totalMoney,
  remark: remark,
  payType: payType,
  payMoney: payMoney,
  expenseList: expenseList,
  orderId: orderId,
  orderItemId: orderItemId,
  shoppingId: shoppingId,
  productId: productId,
  price: price,
  amount: amount,
  empld: empld,
  empName: empName
}, 'POST');
//门店所有商品列表
export const storeAllProduction = (shoppingType) => fetch('/cms/api/shopping/mendian/getAllList',{
  shoppingType:shoppingType
})

/**
 * 产品部分
 */

//次卡分类列表
export const timesCardCategory = () => fetch('/cms/api/singleItem/category/list')

//新增次卡分类
export const addTimesCardCategory = (name, sort) => fetch('/cms/api/singleItem/category/add', {
  name: name,
  sort: sort
}, 'POST', 'form')

//删除次卡分类
export const deleteTimesCardCategory = id => fetch('/cms/api/singleItem/category/del', {
  id: id
}, 'POST', 'form')

//编辑次卡分类
export const editTimesCardCategory = (id, name, sort) => fetch('/cms/api/singleItem/category/edit', {
  id: id,
  name: name,
  sort: sort
}, 'POST', 'form')

//疗程卡分类列表
export const physiotherapyCategory = () => fetch('/cms/api/treatCard/category/list')

//新增疗程卡分类
export const addPhysiotherapyCategory = (name, sort) => fetch('/cms/api/treatCard/category/add', {
  name: name,
  sort: sort
}, 'POST', 'form')

//删除疗程卡分类
export const deletePhysiotherapyCategory = id => fetch('/cms/api/treatCard/category/del', {
  id: id
}, 'POST', 'form')

//编辑疗程卡分类
export const editPhysiotherapyCategory = (id, name, sort) => fetch('/cms/api/treatCard/category/edit', {
  id: id,
  name: name,
  sort: sort
}, 'POST', 'form')

//项目列表
export const projectList = (name, pageNum, pageSize) => fetch('/cms/api/product/list', {
  name: name,
  pageNum: pageNum,
  pageSize: pageSize
}, 'GET')

//项目详情
export const projectDetails = id => fetch('/cms/api/product/detail', {
  id: id,
  mode: 'system'
}, 'GET')

//新增项目
export const addProject = (name, firstPrice, secondPrice, thirdPrice, cover, duration, status) => fetch('/cms/api/product/add', {
  name: name,
  firstPrice: firstPrice,
  secondPrice: secondPrice,
  thirdPrice: thirdPrice,
  cover: cover,
  duration: duration,
  status: status
}, 'POST', 'Json')

//删除项目
export const deleteProject = id => fetch('/cms/api/product/del', {
  id: id
}, 'POST', 'form')

//编辑项目
export const editProject = (id, name, firstPrice, secondPrice, thirdPrice, cover, duration, status) => fetch('/cms/api/product/edit', {
  id: id,
  name: name,
  firstPrice: firstPrice,
  secondPrice: secondPrice,
  thirdPrice: thirdPrice,
  cover: cover,
  duration: duration,
  status: status
}, 'POST', 'Json')

//商品列表
export const commodityList = (title, shoppingType, pageNum, pageSize) => fetch('/cms/api/shopping/list', {
  mode: 'system',
  title: title,
  shoppingType: shoppingType,
  pageNum: pageNum,
  pageSize: pageSize
})

//商品详情
export const commodityDetails = id => fetch('/cms/api/shopping/detail', {
  id: id
})

//新增商品
export const addCommodity = (
  title,
  intro,
  content,
  cover,
  imageList,
  mendianList,
  shoppingType,
  shoppingCategory,
  firstPrice,
  secondPrice,
  thirdPrice,
  status,
  productList,
  productId,
  num
) => fetch('/cms/api/shopping/add', {
  title: title,
  intro: intro,
  content: content,
  cover: cover,
  imageList: imageList,
  mendianList: mendianList,
  shoppingType: shoppingType,
  shoppingCategory: shoppingCategory,
  firstPrice: firstPrice,
  secondPrice: secondPrice,
  thirdPrice: thirdPrice,
  status: status,
  productList: productList,
  productId: productId,
  num: num
}, 'POST', 'Json')

//删除商品
export const deleteCommodity = id => fetch('/cms/api/shopping/del', {
  id: id
}, 'post', 'form')

//编辑商品
export const editCommodity = (
  id,
  title,
  intro,
  content,
  cover,
  imageList,
  mendianList,
  shoppingType,
  shoppingCategory,
  firstPrice,
  secondPrice,
  thirdPrice,
  status,
  productList
) => fetch('/cms/api/shopping/edit', {
  id: id,
  title: title,
  intro: intro,
  content: content,
  cover: cover,
  imageList: imageList,
  mendianList: mendianList,
  shoppingType: shoppingType,
  shoppingCategory: shoppingCategory,
  firstPrice: firstPrice,
  secondPrice: secondPrice,
  thirdPrice: thirdPrice,
  status: status,
  productList: productList
}, 'POST', 'Json')

/**
 * 门店部分
 */

//加盟商列表
export const franchiseeList = (pageNum, pageSize) => fetch('/cms/api/business/list', {
  pageNum: pageNum,
  pageSize: pageSize
})

//加盟商详情
export const franchiseeInfo = id => fetch('/cms/api/business/detail', {
  id: id
})

//新增加盟商
export const addFranchisee = (name, phone, remark) => fetch('/cms/api/business/add', {
  name: name,
  phone: phone,
  remark: remark
}, 'POST', 'form')

//删除加盟商
export const deleteFranchisee = id => fetch('/cms/api/business/del', {
  id: id
}, 'POST', 'form')

//编辑加盟商
export const editFranchisee = (id, name, phone, remark) => fetch('/cms/api/business/edit', {
  id: id,
  name: name,
  phone: phone,
  remark: remark
}, 'POST', 'form')

//门店列表
export const mendianList = (name, type, cityLevel, pageNum, pageSize) => fetch('/cms/api/mendian/list', {
  name: name,
  type: type,
  cityLevel: cityLevel,
  pageNum: pageNum,
  pageSize: pageSize
})

//门店详情
export const mendianDetail = id => fetch('/cms/api/mendian/detail', {
  id: id
})

//新增门店
export const addMendian = (id, type, businessId, businessName, name, shortName, phoneList, imageList, cover, cityLevel, address, lng, lat, openDate, status) => fetch('/cms/api/mendian/add', {
  id: id,
  type: type,
  businessId: businessId,
  businessName: businessName,
  name: name,
  shortName: shortName,
  phoneList: phoneList,
  imageList: imageList,
  cover: cover,
  cityLevel: cityLevel,
  address: address,
  lng: lng,
  lat: lat,
  openDate: openDate,
  status: status
}, 'POST', 'Json')

//删除门店
export const deleteMendian = id => fetch('/cms/api/mendian/del', {
  id: id
}, 'POST', 'form')

//编辑门店
export const editMendian = (id, type, businessId, businessName, name, shortName, phoneList, imageList, cover, cityLevel, address, lng, lat, openDate, status, businessHoursDesc) => fetch('/cms/api/mendian/edit', {
  id: id,
  type: type,
  businessId: businessId,
  businessName: businessName,
  name: name,
  shortName: shortName,
  phoneList: phoneList,
  imageList: imageList,
  cover: cover,
  cityLevel: cityLevel,
  address: address,
  lng: lng,
  lat: lat,
  openDate: openDate,
  status: status,
  businessHoursDesc: businessHoursDesc
}, 'POST', 'Json')

//门店设置
export const mendianModify = (id, phoneList, imageList, cover, address, lng, lat) => fetch('/cms/api/mendian/modify', {
  id: id,
  phoneList: phoneList,
  imageList: imageList,
  cover: cover,
  address: address,
  lng: lng,
  lat: lat
}, 'POST', 'Json')


//门店项目列表
export const mendianProductList = (title, shoppingType, pageNum, pageSize) => fetch('/cms/api/shopping/list', {
  mode: 'mendian',
  title: '',
  shoppingType: shoppingType,
  pageNum: pageNum,
  pageSize: pageSize
})

//获取职位列表
export const getJobList = () => fetch('/cms/api/emp/job/list')

//获取员工列表
export const getStaffList = (keyword, jobId) => fetch('/cms/api/emp/list', {
  keyword: keyword,
  jobId: jobId
})

//获取员工详情
export const getStaffDetail = id => fetch('/cms/api/emp/detail', {
  id: id
})

//新增员工
export const addStaff = (name, image, phone, sex, jobId, jobName) => fetch('/cms/api/emp/add', {
  name: name,
  image: image,
  phone: phone,
  sex: sex,
  jobId: jobId,
  jobName: jobName
}, 'POST', 'Json')

//编辑员工
export const editStaff = (id, name, image, phone, sex, jobId, jobName) => fetch('/cms/api/emp/edit', {
  id: id,
  name: name,
  image: image,
  phone: phone,
  sex: sex,
  jobId: jobId,
  jobName: jobName
}, 'POST', 'Json')

//删除员工
export const deleteStaff = (id) => fetch('/cms/api/emp/del', {
  id: id
}, 'POST', 'form')

export const getAllBusinessList = () => fetch('/cms/api/business/getAllBusinessList')

export const mendianBaseInfo = () => fetch('/cms/api/mendian/menu/list')

//banner列表
export const bannerList = (name, type, startDate, endDate, pageNum, pageSize) => fetch('/cms/api/banner/list', {
  name: name,
  type: type,
  startDate: startDate,
  endDate: endDate,
  pageNum: pageNum,
  pageSize: pageSize
})

//banner详情
export const bannerDetail = (id) => fetch('/cms/api/banner/detail', {
  id: id
})

//新增banner
export const addBanner = (name, img, type, startDate, endDate, sort, link, status) => fetch('/cms/api/banner/add', {
  name: name,
  img: img,
  type: type,
  startDate: startDate,
  endDate: endDate,
  sort: sort,
  link: link,
  status: status
}, 'POST', 'Json')

//删除banner
export const delBanner = id => fetch('/cms/api/banner/del', {
  id: id
}, 'POST', 'form')

//编辑banner
export const editBanner = (id,name,img,type,startDate,endDate,sort,link,status) => fetch('/cms/api/banner/edit',{
  id:id,
  name:name,
  img:img,
  type:type,
  startDate:startDate,
  endDate:endDate,
  sort:sort,
  link:link,
  status:status
},'POST','Json');
//查询当前排班列表
export const scheduleListNow = () => fetch('/cms/api/appoint/schedule/current/list');
//查询历史排班列表
export const scheduleListHistory = (pageNum,pageSize) => fetch('/cms/api/appoint/schedule/history/list',{
  pageNum:pageNum,
  pageSize:pageSize
});
//查询排班详情
export const scheduleDetail = date => fetch('/cms/api/appoint/schedule/list',{
  date:date
});
//查询预约时间列表
export const bookingTimeList = (pageNum,pageSize) => fetch('/cms/api/appoint/period/list',{
  pageNum:pageNum,
  pageSize:pageSize
});
//新增预约时段
export const addBookingTime = (startTime,endTime,dayOfWeek,empList,empName)=>fetch('/cms/api/appoint/period/add',{
  startTime:startTime,
  endTime:endTime,
  dayOfWeek:dayOfWeek,
  empList:empList,
  empName:empName
},'POST','Json');
//编辑预约时段
export const editBookingTime = (id,startTime,endTime,dayOfWeek,empList) => fetch('/cms/api/appoint/period/edit',{
  id:id,
  startTime:startTime,
  endTime:endTime,
  dayOfWeek:dayOfWeek,
  empList:empList
},'POST','Json');
//删除预约时段
export const delBookingTime = id => fetch('/cms/api/appoint/period/del',{
  id:id
},'POST','form');
//推荐位列表
export const recommendedList = ()=>fetch('/cms/api/mendian/recommend/list');
export const recommendedSave = (singleItemList,treatCardList) =>fetch('/cms/api/mendian/recommend/save',{
  singleItemList:singleItemList,
  treatCardList:treatCardList
},'POST','Json');
/**
 * 设置部分 ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓陈华杰↓↓↓↓↓↓↓↓↓
 */

//平台设置
export const getSettings = () => fetch('/cms/api/mall/config/list')


//修改商城设置
export const editSettings = (option) => fetch('/cms/api/mall/config/edit', option, 'POST', 'Json')


/**
 * 权限设置
 */

  //角色列表
export const getAuthorityList = (n, p, pz) => fetch('/cms/api/role/list', {
  roleName: n, // 角色名称
  pageNum: p, // 页码,从1开始
  pageSize: pz
})

//新增角色
//a = roleName:n,//角色名称
//remarks:r,//备注
//useable:u//是否可用0：禁用，1：启用
export const addRole = obj => fetch('/cms/api/role/add', obj, 'POST')

//删除角色
export const delRole = roleId => fetch('/cms/api/role/del', {roleId: roleId}, 'POST', 'form')

//编辑角色
export const editRole = (roleId, roleName, remarks, useable) => fetch('/cms/api/role/edit',
  {
    'roleId': roleId,
    'roleName': roleName,
    'remarks': remarks,
    'useable': useable
  }, 'POST', 'Json')



//获取角色权限
export const getRoleMenuList = roleId => fetch('/cms/api/role/getRoleMenuList', {roleId: roleId})


//查询所有权限列表
export const getAllMenuList = () => fetch('/cms/api/role/getAllMenuList')

//设置角色权限
export const saveRoleMenuList = obj => fetch('/cms/api/role/saveRoleMenuList', obj, 'POST', 'form')

//账户列表
export const getSysuserList = (keyword, roleId, pageNum, pageSize) => fetch('/cms/api/sysuser/list', {
  keyword: keyword,
  roleId: roleId,
  pageNum: pageNum,
  pageSize: pageSize
})

// 获取角色选项列表
export const getAllRoleList = () => fetch('/cms/api/role/getAllRoleList')

// 删除账户
export const delSysuser = userId => fetch('/cms/api/sysuser/del', {userId: userId}, 'POST', 'form')

// 新增账户
export const addSysuser = obj => fetch('/cms/api/sysuser/add', obj, 'POST', 'Json')

// 账户详情
export const getSysuserDetail = userId => fetch('/cms/api/sysuser/detail', { userId: userId})

// 编辑账户
export const editSysuser = obj => fetch('/cms/api/sysuser/edit', obj, 'POST', 'Json')

// 操作日志 接口还没有
export const getSyslog = obj => fetch('/cms/api/syslog/list', obj)

// 营业部分新做
// 门店充值记录列表
export const getRechargeList = obj => fetch('/cms/api/recharge/list', obj)
/// 到出充值记录
export const rechargeExport = obj => fetch('/cms/api/recharge/export', obj, 'POST')

// 办卡记录列表
export const getShoppingCardList = obj => fetch('/cms/api/shopping/order/list', obj)
/// 导出办卡记录
export const cardExport = obj => fetch('/cms/api/shopping/order/export', obj, 'POST')

// 消费记录列表
export const getExpenseList = obj => fetch('/cms/api/expense/list', obj)
/// 导出消费记录
export const expenseExport = obj => fetch('/cms/api/expense/export', obj, 'POST')

///门店商品列表
export const getMendianGoodsList = (title,shoppingType,pageNum,pageSize) => fetch('/cms/api/shopping/mendian/list',{
  title:title,
  shoppingType:shoppingType,
  pageNum:pageNum,
  pageSize:pageSize
});

/// 门店员工列表
export const getStaffLists = jobId => fetch('/cms/api/emp/getAllEmpList', { jobId: jobId })

// 到店消费结算
export const payExpense = obj => fetch('/cms/api/expense/add', obj, 'POST', 'Json')

// 会员开卡结算
export const vipApplyCard = obj => fetch('/cms/api/shopping/order/add', obj, 'POST', 'Json')

// 会员已购买商品(次卡/疗程卡/健康管理卡)
export const getAppuserShoppingList = (userId, shoppingType) => fetch('/cms/api/appuser/shopping/list', {
  userId: userId,
  shoppingType: shoppingType
})

// 会员充值结算
export const vipRecharge_v = obj => fetch('/cms/api/recharge/add', obj, 'POST', 'Json')

/**
 * ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑陈华杰的↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
 */


