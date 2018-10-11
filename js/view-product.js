function changeMe(index)
{
	item = document.getElementsByClassName('add-category');
	catForm = '<select>'+
			'<option>category one</option>'+
			'<option>category two</option>'+
			'<option>category three</option>'+
	'</select>'+
	'<button class="btn-category" onclick="changeMeBack('+index+')">Update</button>';
	item[index].innerHTML=catForm;
}
function changeMeBack(index)
{
	item = document.getElementsByClassName('add-category');
	catForm = '<span class="fa fa-check-circle"> Added</span>'
	item[index].innerHTML=catForm;
}

function showImage()
{
	itemImg = document.getElementsByClassName('container-img');
	itemBody = document.getElementsByClassName('container-body')
	itemImg[0].style.display= 'block'
	itemBody[0].style.display = 'none'
}

function showBody()
{
	itemImg = document.getElementsByClassName('container-img');
	itemBody = document.getElementsByClassName('container-body')
	itemImg[0].style.display= 'none'
	itemBody[0].style.display = 'block'
}