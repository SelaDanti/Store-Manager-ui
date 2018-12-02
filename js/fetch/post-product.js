productsUrl = `http://storemanage3000.herokuapp.com/api/v2/products`;
categoryUrl = `http://storemanage3000.herokuapp.com/api/v2/category`;

document.getElementsByClassName('btn-main')[0].addEventListener('click',postProduct)
function postProduct()
{
	let name = document.getElementById('name').value;
	let inventoryQuantity = parseInt(document.getElementById('inventoryQuantity').value);
	let MIQ = parseInt(document.getElementById('MIQ').value);
	let category = document.getElementById('category').value;
	let uom = document.getElementById('uom').value;
	let price = parseInt(document.getElementById('price').value);
	let payload = {
	  "miq": MIQ,
	  "price": price,
	  "category name": category,
	  "quantity": inventoryQuantity,
	  "product name": name,
	  "uom": uom
	}
	document.getElementsByClassName('btn-main')[0].innerHTML = 'LOADING';
	fetch(productsUrl,{
		"method":"POST",
    	"mod":"cors",
    	headers: {
		"Content-type": "application/json",
		"Access-Control-Allow-Origin":"*",
		"X-API-KEY": localStorage.getItem('token')
    	},
    	body:JSON.stringify(payload)
	})
	.then((res) => {status = res.status; return res.json()})
	.then((data) => {
		if (status != 201)
		{
			if (data['error'] == 'token is invalid')
			{
				window.location.replace('../index.html');
			}
			alert(`Error ${data['error']}`);
			document.getElementsByClassName('btn-main')[0].innerHTML = 'ADD PRODUCT';
		}
		else
		{
			alert(data['message']);
			document.getElementsByClassName('btn-main')[0].innerHTML = 'ADD PRODUCT';
		}
	})
	.catch((error) => {console.log(error)})
}
window.addEventListener('load',setCategory)

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
		document.getElementById('categoryName').innerHTML = catOptions;
	})
	
}