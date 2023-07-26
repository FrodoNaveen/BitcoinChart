import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Signup(){
   const [dataBase,setDataBase] = useState([])
    const [formData,setFormData]=useState({
        firstName:"",
        lastName:"",
        email:"",
        password:"",
        confirmPassword:""
    })

   useEffect(()=>{
   
    const dataBaseDetails = JSON.parse(localStorage.getItem("myData")) || []
    setDataBase(dataBaseDetails)
   },[])
    
    function ChangeData(event){
      event.preventDefault()
        setFormData((prevFormData)=>{
            return{
                ...prevFormData,
                [event.target.name]:event.target.value
            }
        })
    }

    function setData(){
      function checkEmail(){
        for(let i=0; i<dataBase.length; i++){
          if(dataBase[i].email===formData.email){
            return true
          }
        }
     }
     
      let db = [...dataBase];
      db.push(formData);
      let newDataBase = JSON.stringify(db);

      const success = () =>{
        alert("database created")
        localStorage.setItem("myData",newDataBase)
      }

      return checkEmail()===true
        ? alert("already exists")
        : success()
      
    }

    console.log(formData)
    

    return (
      <div className="signup">
        <form
          onSubmit={() => {
            setData();
          }}
          className="signupform "
        >
          <input
            className="signupinput"
            type="text"
            placeholder="firstname"
            onChange={ChangeData}
            name="firstName"
            value={formData.firstName}
            autoComplete="off"
            required
          />
          <br />
          <br />
          <input
            className="signupinput"
            type="text"
            placeholder="lastname"
            onChange={ChangeData}
            name="lastName"
            value={formData.lastName}
            autoComplete="off"
            required
          />
          <br />
          <br />
          <input
            className="signupinput"
            type="email"
            placeholder="email"
            onChange={ChangeData}
            name="email"
            value={formData.email}
            autoComplete="off"
            required
          />
          <br />
          <br />
          <input
            className="signupinput"
            type="password"
            placeholder="password"
            onChange={ChangeData}
            name="password"
            value={formData.password}
            autoComplete="off"
            minLength="7"
            required
          />
          <br />
          <br />
          <input
            className="signupinput"
            type="password"
            placeholder="confirmpassword"
            onChange={ChangeData}
            name="confirmPassword"
            value={formData.confirmPassword}
            autoComplete="off"
            minLength="7"
            required
          />
          <br />
          <br />
          <button>Signup</button>
        </form>
        <br />
        <Link to="/login">
          <button>Already a member?Login</button>
        </Link>
       
      </div>
      
    );
}