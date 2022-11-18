import axios from 'axios'


export function request(config){
    const instance = axios.create({
        baseURL:'http://localhost:1683',
        timeout:5000
    })

    instance.interceptors.request.use(
        config =>{
            config.headers.Authorization = getCookie("Authorization"),
            config.headers.UserID = getCookie("UserId")
            return config;
        })
        
    return instance(config)
}

function getCookie(cname)
{
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i=0; i<ca.length; i++) 
  {
    var c = ca[i].trim();
    if (c.indexOf(name)==0) return c.substring(name.length,c.length);
  }
  return "";
}