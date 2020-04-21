import {
  baseUrl,
  session,
  webUrl
} from './env'
import {getCookie, saveJWT} from './cookie'
import {initPermisson} from '../service/getData'
import { Loading, Message } from 'element-ui'
var loadinginstace = null
export default async (url = '', data = {}, type = 'GET', contentType = 'Json', method = 'fetch') => {
  type = type.toUpperCase()
  url = baseUrl + url

  if (type === 'GET') {
    let dataStr = '' // 数据拼接字符串
    Object.keys(data).forEach(key => {
      if (data[key] === '') {
        delete data.key
      } else {
        dataStr += key + '=' + data[key] + '&'
      }
    })

    if (dataStr !== '') {
      dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'))
      url = url + '?' + dataStr
    }
  }

  if (window.fetch && method === 'fetch') {
    loadinginstace = Loading.service({ fullscreen: true, background: 'rgba(255, 255, 255, 0)' })
    // 从localstorage里取出JWT
    let jwt = window.localStorage
    let requestConfig = {
      credentials: 'include',
      method: type,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      mode: 'cors'
    }
    let requestConfigForForm = {
      method: type,
      headers: {
        // 'Accept': 'application/x-www-form-urlencoded',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      mode: 'cors'
    }
    if (window.localStorage['Authorization']) {
      jwt = jwt['Authorization']
      requestConfig['headers']['Authorization'] = jwt
      requestConfigForForm['headers']['Authorization'] = jwt
    } else {
      if (window.location.href.indexOf('login') === -1) {
        window.location.assign('/login')
      }
    }
    if (type === 'POST') {
      Object.keys(data).forEach(key => {
        // 如果某一项为空就把该项删除
        if (data[key] === '') {
          delete data.key
        }
      })
      if (contentType === 'form') {
        let dataStrForm = '' // 数据拼接字符串
        Object.keys(data).forEach(key => {
          if (data[key] === '') {
            delete data.key
          } else {
            dataStrForm += key + '=' + data[key] + '&'
          }
        })
        Object.defineProperty(requestConfigForForm, 'body', {
          value: dataStrForm
        })
      } else {
        Object.defineProperty(requestConfig, 'body', {
          value: JSON.stringify(data)
        })
      }
    }

    try {
      loadinginstace.close()
      if (contentType === 'Json') {
        const response = await fetch(url, requestConfig);
        console.log(11);
        console.log(response);
        if (response.headers.get('Authorization')) {
          window.localStorage['Authorization'] = response.headers.get('Authorization')
        }
        console.log(22);
        const responseJson = await response.json();
        console.log(33);
        if (responseJson['code'] === 403) {
          window.location.assign('/login');
          return
        } else if (responseJson['code'] === 413) {
          window.localStorage.permission = await initPermisson();
          window.location.assign(webUrl + '/home')
        }
        if (responseJson['code'] !== 0 && responseJson['code'] !== 403) {
          Message.error(responseJson['msg']);
          console.log(44);
          return responseJson
        }
        return responseJson
      } else {
        const response = await fetch(url, requestConfigForForm);
        console.log(1);
        console.log(response);
        if (response.headers.get('Authorization')) {
          window.localStorage['Authorization'] = response.headers.get('Authorization')
        }
        console.log(2);
        const responseJson = await response.json();
        console.log(3);
        if (responseJson['code'] === 403) {
          window.location.assign(webUrl + '/login');
          return
        } else if (responseJson['code'] === 413) {
          window.localStorage.permission = await initPermisson();
          window.location.assign(webUrl + '/home')
        }
        if (responseJson['code'] !== 0 && responseJson['code'] !== 403) {
          // alert(responseJson['msg'])
          Message.error(responseJson['msg']);
          return responseJson
        }
        console.log(4);
        return responseJson
      }
    } catch (error) {
      throw new Error(error)
    }
  } else {
    return new Promise((resolve, reject) => {
      let requestObj
      if (window.XMLHttpRequest) {
        requestObj = new XMLHttpRequest()
      } else {
        requestObj = new ActiveXObject()
      }

      let sendData = ''
      if (type === 'POST') {
        sendData = JSON.stringify(data)
      }

      requestObj.open(type, url, true)
      requestObj.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
      requestObj.send(sendData)

      requestObj.onreadystatechange = () => {
        if (requestObj.readyState === 4) {
          if (requestObj.status === 200) {
            let obj = requestObj.response
            if (typeof obj !== 'object') {
              obj = JSON.parse(obj)
            }
            resolve(obj)
          } else {
            reject(requestObj)
          }
        }
      }
    })
  }
}
