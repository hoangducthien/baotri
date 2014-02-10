function initialize() {
	$.mobile.allowCrossDomainPages = true;
	$.support.cors = true;
	$.mobile.phonegapNavigationEnabled = true;	
}
function onDeviceReady() {
	console.log("Now loading...");
    initialize();
}
function onload(){
	document.addEventListener("deviceready",onDeviceReady,false);
}
function check_login(ur, pw) {
}