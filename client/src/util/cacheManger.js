const telPhoneKey = 'telPhoneKey';
function setTelPhone(value){
	sessionStorage.setItem(telPhoneKey,value)
}
function getTelPhone(){
	return sessionStorage.getItem(telPhoneKey)
}
export {setTelPhone,getTelPhone}