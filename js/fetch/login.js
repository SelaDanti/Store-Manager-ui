let loginUrl = 'https://storemanage3000.herokuapp.com/api/v2/auth/login'

document.getElementById('submit-login').addEventListener('click',login)

function login(){
	let email = document.getElementById("email").value;
	let password = document.getElementById("password").value;
	let payload = {"email":email,"password":password};
    document.getElementsByClassName('btn-main')[0].innerHTML='LOADING'
	fetch(loginUrl,{
				"method": "POST",
				"mode":"cors",
				headers: {
			      "Content-type": "application/json",
			      "Access-Control-Allow-Origin":"*"
			    },
			    body: JSON.stringify(payload)
	})
    .then((res) => {status = res.status;return res.json();})
    .then((data)=>{
        if (status != 200)
        {
            document.getElementById('error').innerHTML = data.error;
            document.getElementById('error').style.display = 'block';
            document.getElementById('error').style.color = 'red';
            document.getElementsByClassName('btn-main')[0].innerHTML='SIGN IN';
            document.getElementsByClassName('login-box')[0].style.height = '470px'
        }
        else
        {
            localStorage.setItem('token',data.message.token);
            UserType()
        }
    })
    .catch((error) => {console.log(error);});
}

function UserType()
{   
    url = 'https://storemanage3000.herokuapp.com/api/v2/auth/role'
    fetch(url,{
        "method": "GET",
        "mode": "cors",
        headers: {
            "Content-type": "application/json",
            "Access-Control-Allow-Origin":"*",
            "X-API-KEY": localStorage.getItem('token')
        }
    })
    .then((res) => {status = res.status;return res.json();})
    .then((data) => {
        localStorage.setItem('id',data['id'])
        if (data['type'] == 'super admin' || data['type'] == 'admin')
        {
            window.location.replace('admin/index.html');
        }
        else
        {
            window.location.replace('attendant/index.html');
        }
    })
    .catch((error) => {console.log(error);});
}