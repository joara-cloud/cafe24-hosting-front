function dateFormat(date, separator) { // 날짜, 구분자

	var formatDate = new Date(date);
	var year = formatDate.getFullYear();
	var month = formatDate.getMonth()+1;
	month = month < 10 ? '0'+month : month;
	var day = formatDate.getDate();
	day = day < 10 ? '0'+day : day;

	return year + separator + month + separator + day;
	
}

export {dateFormat};