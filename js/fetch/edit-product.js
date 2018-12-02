let params = (new URL(document.location)).searchParams;
let id = parseInt(params.get("productId"));
let url = `http://storemanage3000.herokuapp.com/api/v2/products/${id}`;
let categoryUrl = `http://storemanage3000.herokuapp.com/api/v2/category`;

window.addEventListener('load',function(){setProduct();setCategory();})
function setProduct()
{
	fetch(url,{
		"method": "GET",
		"mod": "cors",
		headers: {
		"Content-type": "application/json",
		"Access-Control-Allow-Origin":"*",
		"X-API-KEY": localStorage.getItem('token')
		}
	})
	.then((res) => {status = res.status; return res.json()})
	.then((data) => {
		document.getElementById('oldName').innerHTML = data['product name'];
		document.getElementById('oldQuantity').innerHTML = data['quantity'];
		document.getElementById('oldMiq').innerHTML = data['miq'];
		document.getElementById('oldCategory').innerHTML = data['category id'];
		document.getElementById('oldPrice').innerHTML = data['price'];
		document.getElementById('oldUom').innerHTML = data['uom'];
	})
	.catch((error) => {console.log(error)})
}
function setCategory()
{
	fetch(categoryUrl,{
		"method": "GET",
		"mod": "cors",
		headers: {
		"Content-type": "application/json",
		"Access-Control-Allow-Origin":"*",
		"X-API-KEY": localStorage.getItem('token')
		}
	})
	.then((res) => {status = res.status; return res.json()})
	.then((data) => {
		catOptions = `<select id="category">`;
		for (x in data)
		{
			catOptions += `<option>${data[x]['name']}</option>`;
		}
		catOptions += `</select>`;
		console.log(catOptions)
		document.getElementById('categoryName').innerHTML = catOptions;
	})
	
}

document.getElementsByClassName('btn-main')[1].addEventListener('click',updateProduct)
function updateProduct()
{
	let name = document.getElementById('newName').value;
	let quantity = document.getElementById('newQuantity').value;
	let miq = document.getElementById('newMiq').value;
	let category = document.getElementById('category').value;
	let price = document.getElementById('newPrice').value;
	let uom = document.getElementById('newUom').value;
	let payload = {
	  "miq": parseInt(miq),
	  "price": parseInt(price),
	  "category name": category,
	  "quantity": parseInt(quantity),
	  "product name": name,
	  "uom": uom
	}
	document.getElementsByClassName('btn-main')[1].innerHTML = 'LOADING';
	fetch(url,{
		"method": "PUT",
		"mod": "cors",
		headers: {
		"Content-type": "application/json",
		"Access-Control-Allow-Origin":"*",
		"X-API-KEY": localStorage.getItem('token')
		},
		body: JSON.stringify(payload)
	})
	.then((res) => {status = res.status; return res.json()})
	.then((data) => {
		console.log(data)
		if (status != 201)
		{
			alert(data['error']);
			document.getElementsByClassName('btn-main')[1].innerHTML = 'UPDATE';
		}
		else
		{
			setProduct()
			alert('Product updated')
			document.getElementsByClassName('btn-main')[1].innerHTML = 'UPDATE';
		}
	})
	.catch((error) => {console.log(error)}) 
}
