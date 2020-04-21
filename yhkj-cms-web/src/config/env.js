/**
 * 配置编译环境和线上环境之间的切换
 *
 * baseurl: 域名地址
 * routermode: 路由模式
 * imgbaseurl: 图片所在域名地址
 *
 */

let baseUrl = 'https://cms.1haokj.com';
let webUrl = 'https://cms.1haokj.com';
let routerMode = 'hash';
let imgBaseUrl = '';
let session = false;


if (process.env.NODE_ENV == 'development'){
    imgBaseUrl = '/img/';
  let baseUrl = 'https://testcms.1haokj.com';
  let webUrl = 'https://testcms.1haokj.com';
}else if(process.env.NODE_ENV == 'production'){
	baseUrl = 'https://cms.1haokj.com';
  let webUrl = 'https://testcms.1haokj.com';
  imgBaseUrl = '';
}

export {
	baseUrl,
	routerMode,
	imgBaseUrl,
  session,
  webUrl
}
