import {baseUrl} from './env';

export default async(url = '', data = {}, type = 'GET', method = 'notfetch') => {
 
  type = type.toUpperCase();
  url = baseUrl + url;

  if(process.env.NODE_ENV == 'production'){
    if(/(geth5gw)/.test(url)){
      url='https://h5cs-1.agoraio.cn:7668/geth5gw/jsonp';
    }else if(/(machine)/.test(url)){
      url='https://h5gw-jiangmen-ctel-3.agoraio.cn:4000/v1/machine'
    }
  }

  if (type == 'GET') {

    let dataStr = ''; //数据拼接字符串
    Object.keys(data).forEach(key => {
      dataStr += key + '=' + data[key] + '&';
    });

    if (dataStr !== '') {
      dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
      url = url + '?' + dataStr;
    }
  }

  if (!window.fetch && method == 'fetch') {
    let requestConfig = {
      credentials: 'include',
      method: type,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      mode: "cors",
      cache: "force-cache"
    };

    if (type == 'POST') {
      let sendData='';
      for(var i in data)sendData += i + '=' + data[i] + '&';
      Object.defineProperty(requestConfig, 'body', {
        value: sendData
      })
    }

    try {
      const response = await fetch(url, requestConfig);
      const responseJson = await response.json();
      return responseJson
    } catch (error) {
      throw new Error(error)
    }
  } else {
    return new Promise((resolve, reject) => {
      let requestObj;
      if (window.XMLHttpRequest) {
        requestObj = new XMLHttpRequest();
      } else {
        requestObj = new ActiveXObject;
      }

      let sendData = '';
      if (type == 'POST') {
        for(var i in data)sendData += i + '=' + data[i] + '&';
      }

      requestObj.open(type, url, true);
      requestObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      requestObj.send(sendData);

      requestObj.onreadystatechange = () => {
        if (requestObj.readyState == 4) {
          if (requestObj.status == 200) {
            let obj = requestObj.response;
            if (typeof obj !== 'object') {
              obj = JSON.parse(obj);
            }
            resolve(obj);
          } else {
            reject(requestObj)
          }
        }
      }
    })
  }
}
