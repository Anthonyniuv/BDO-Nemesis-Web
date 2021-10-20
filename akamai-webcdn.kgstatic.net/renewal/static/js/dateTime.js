function getDateString(utcSecond, numeric) {
	if (isNaN(utcSecond)) {
		return "-";
	}
	var delimeter = ' ';
	var month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov','Dec'];
	if (numeric) {
		month = [1,2,3,4,5,6,7,8,9,10,11,12];
		delimeter = 'index.html';
	}
	var d = new Date(0);
	d.setUTCSeconds(utcSecond);
	var str = '' + d.getDate() + delimeter + month[d.getMonth()] + delimeter + d.getFullYear();  
	return str;
};

function getTimeString(utcSecond){
	if (isNaN(utcSecond)) {
		return "-";
	}
	var d = new Date(0);
	d.setUTCSeconds(utcSecond);
	var hour = "0" + d.getHours();
	var minute = "0" + d.getMinutes();
	var str = '' + hour.slice(-2) + ":" + minute.slice(-2);  
	return str;
}