import React,{useEffect,useState} from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";


export default function Login(){
    const navigate=useNavigate()

    const [loginData,setLoginData] = useState({
        email:"",
        password:""
    })

    useEffect(()=>{
      let checkLogIn = Cookies.get("email")
      checkLogIn ? navigate("/dashboard"):navigate("/login")
    },[])

    function changeData(event){
        setLoginData((prevLoginData)=>{
            return{
                ...prevLoginData,
                [event.target.name]:event.target.value
            }
        })
    }
    // console.log(loginData)

    function getData(){
        function checkData(){
            let data = JSON.parse(localStorage.getItem("myData"))
            for(let i=0; i<data.length; i++){
                if(data[i].email===loginData.email && 
                   data[i].password===loginData.passWord){

                    return true
                }
            }
        }
        const loginSuccess=()=>{
            alert("successfully Loggedin")
            Cookies.set("email",loginData.email)
            navigate("/dashboard")
        }
        return checkData() ? loginSuccess():alert("emailid or password does not match")
    }
    
    return (
      <div className="login">
        <form onSubmit={getData} className="loginform">
          <input
            onChange={changeData}
            className="logininput"
            type="text"
            placeholder="email"
            name="email"
            value={loginData.email}
            required
            autoComplete="off"
          />
          <br />
          <br />
          <input
            onChange={changeData}
            className="logininput"
            type="password"
            placeholder="password"
            name="passWord"
            value={loginData.passWord}
            required
            autoComplete="off"
          />
          <br />
          <br />
          <button>Login</button>
        </form>
      </div>
    );
}