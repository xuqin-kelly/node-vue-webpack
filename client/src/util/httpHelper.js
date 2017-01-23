import {hex_md5,b64_md5} from '../util/md5';

var httpHelper = {};
var baseHttpUrl = "http://localhost:3000/";
var appSecret = '!Q@W#E$R'
httpHelper.get=function(vueComponent,httpUrl,params,successCallback,errCallback){	
	httpUrl = baseHttpUrl + httpUrl;
	var timestamp=new Date().getTime();
	if(!params){
		params={}
	}
	params.timestamp = timestamp.toString();
	var newData = JSON.stringify(params) + "|" + appSecret;
	var sign = hex_md5(newData);
	var options={};
	options.params=params;
	options.headers={"sign":sign};	
	
	vueComponent.$http.get(httpUrl,options).then(function(data){
		if(successCallback){
			successCallback(data)
		}	
	},function(err){
		if(errCallback){
			errCallback(err)
		}
	})
}

httpHelper.post=function(vueComponent,httpUrl,params,successCallback,errCallback){
	httpUrl = baseHttpUrl + httpUrl;	
	var timestamp=new Date().getTime();
	if(!params){
		params={}
	}
	params.timestamp = timestamp.toString();
	var newData = JSON.stringify(params) + "|" + appSecret;
	var sign = hex_md5(newData);
	var options={};
	options.params=params;
	options.headers={"sign":sign};	

	vueComponent.$http.post(httpUrl,options).then(function(data){
		if(successCallback){
			successCallback(data)
		}	
	},function(err){
		if(errCallback){
			errCallback(err)
		}
	})
}

export default httpHelper

