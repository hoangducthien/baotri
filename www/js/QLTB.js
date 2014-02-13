function getColumn(title, content){
	var s = '<div class="column_item"><div class="column_header decorate_text">' + title + '</div><div class="column_content" style="display:none">' + content + '</div><div class="column_edit"><textarea style="resize:none">' + content + '</textarea></div></div>';
	return s;
}

function getTable(array){
	var s = '';
	for (i = 0; i< array.length; i++){
		s += getColumn(array[i], '');
	}
	return s;
}