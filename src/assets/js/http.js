//import axios from 'axios';
//import { Message } from 'element-ui';
//
//axios.defaults.timeout = 5000;
//axios.defaults.baseURL ='';





/*
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */
	var change={transformRequest: [function (data) {
		    let ret = ''
		    for (let it in data) {
		      ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
		    }
		    return ret
		}]}
	var oheaders={headers: {
		     'Content-Type': 'application/x-www-form-urlencoded'
		 }}
	export function post(ourl,data){
		return new Promise((resolve,reject) => {
	     axios.post('http://wawa.app.xiaozhuschool.com/'+ourl,data,change,oheaders).then(response => {
	            resolve(response.data);
	          },err => {
	            reject(err)
	          })
	   })
	}
