<template>
<div>
	<div id="login">
	  <h3>在线报名</h3>
	  <p>
		<input type="text" placeholder="姓名" v-model.trim="name"/>
	  </p>
	  <p>
		<input type="text" placeholder="性别" v-model.trim="sex"/>
	  </p>
	  <p>
		<input type="text" placeholder="手机号" v-model.trim="phone" readonly="readonly"/>
	  </p>
	  <p>
		<input type="text" placeholder="地址" v-model.trim="address"/>
	  </p>	 
	  <p>
	  	<textarea v-model.trim="message" placeholder="备注"></textarea>
	  </p>
	  <p>
		<input type="button" value="立即报名"  @click="addUser"/>
	  </P>
	</div>

	<h3>最新人员名单</h3>
	<table>
	  	<tr>	  		
	  		<th>姓名</th>
	  		<th>手机号</th>	  		
	  	</tr>
	  	<tr v-for="item in userList">	  		
	  		<td>{{item.name}}</td>
	  		<td>{{item.phone}}</td>
	  	</tr>
	</table>
	<p class="more"><router-link to="/userList">更多</router-link></p>
</div>
</template>
<script>
import {hex_md5} from '../util/md5'
import httpHelper from "../util/httpHelper"
import {getTelPhone} from '../util/cacheManger'
import UserModel from '../model/userModel'

let userTelephone = getTelPhone();
export default{
	data(){
		return{
			userList:[],
			name:'',
			sex:'',
			phone:userTelephone,
			address:'',
			message:''
		}
	},
	created(){
		this.getUser()
	},
	methods:{
		clearFrom(){
			let _self = this;
			_self.name='';
			_self.sex='';
			_self.phone='';
			_self.address='';
			_self.message='';
		},
		addUser(){
			let _self = this;				
			let params = {name:_self.name,sex:_self.sex,phone:_self.phone,address:_self.address,message:_self.message};
			if(_self.name && _self.sex){
				httpHelper.post(_self,"addUser",params,(data)=>{
					if(data.body.code<0){
						alert(data.body.description);
						return;
					}
		            let newUser = {name:_self.name,sex:_self.sex,phone:_self.phone,address:_self.address,message:_self.message,id:_self.userList.length+1};
					_self.userList.unshift(newUser)
					if(_self.userList.length==6){
						_self.userList.pop();
					}
					_self.clearFrom();               
		        }, (err)=>{
		            alert('shi bai')
		        })

			}else{
				alert('姓名、性别不能为空')
			}			
		},
		getUser(){
			let _self = this;
			var params = {};			
			httpHelper.get(_self,"users",params,(data)=>{
				if(data.body.code<0){
					alert(data.body.description);
					return;
				}
		        let result = data.body;
				if(result.code>0 && result.data){
					let newResult = result.data.reverse();
					let len = 5;
					if(newResult.length<5){
						len = newResult.length
					}
					let arr = [];					
					for(let i=0;i<len;i++){
		          		let userfoModel = new UserModel(newResult[i]);		          		
		          		arr.push(userfoModel);
		          	}
		          	_self.userList = arr;					
				}else{
		            if(result.description){
		              alert(result.description)
		            }            
		        }         
	        }, (err)=>{
	            alert('shi bai')
	        })

		}
	}
}
</script>