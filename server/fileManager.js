var fs = require('fs');
var HttpResult = require('./HttpResult');

exports.getItemList = function(req,res){
    var httpResult = new HttpResult();
    try{
        fs.readFile('usersinfo.json',function(err,data){                
            if(err){            
                httpResult.code = -1;
                httpResult.description = '数据操作失败！';                     
            }else{            
                var result=JSON.parse(data.toString());
                httpResult.code = 1;
                httpResult.data = result;           
            }
            res.send(httpResult);
        })
    }
    catch(e){
        httpResult.code = -2;
        httpResult.description = e;  
        res.send(httpResult);  
    }	
}

exports.addItem = function(req,res){
    var httpResult = new HttpResult();
    try{
        fs.readFile('usersinfo.json',function(err,data){        
            var result=JSON.parse(data.toString());
            var Id = 1;         
            if(result && result.length>0){
                Id = result[result.length-1].id+1;
            } 
            var userInfo = {id:Id,name:req.body.params.name,phone:req.body.params.phone,sex:req.body.params.sex,address:req.body.params.address,message:req.body.params.message};
            result.push(userInfo);
            var resultJson = JSON.stringify(result);
            fs.writeFile('usersinfo.json',resultJson,function(err){
                if(err){
                    httpResult.code = -1;
                    httpResult.description = '数据操作失败！';               
                }else{
                    var resultString=JSON.stringify(resultJson);
                    httpResult.code = 1;
                    httpResult.data = resultString;                
                }
                res.send(httpResult); 
            })
        })
    }
	catch(e){
        httpResult.code = -2;
        httpResult.description = e;  
        res.send(httpResult); 
    }
}

exports.setPagination = function(req,res){
    var httpResult = new HttpResult();
    try{
        fs.readFile('usersinfo.json',function(err,data){        
            if(err){            
                httpResult.code = -1;
                httpResult.description = '数据操作失败！';                 
            }else{   
                var pageindex = req.params.pageindex;
                var pagesize = req.params.pagesize;         
                var result=JSON.parse(data.toString());            
                var startIndex = (pageindex-1)*pagesize;
                var endIndex = pageindex*pagesize;
                if(endIndex>result.length){
                    endIndex = result.length;
                }
                var curResult = result.slice(startIndex,endIndex)
                httpResult.code = 1;
                httpResult.data = {itemList:curResult,allCount:result.length};       
            }
            res.send(httpResult);
        })
    }
    catch(e){
        httpResult.code = -2;
        httpResult.description = e;
        res.send(httpResult);
    }
	
}