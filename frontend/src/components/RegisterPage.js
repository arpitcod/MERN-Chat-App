import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { toast } from "react-toastify";


const RegisterPage = () => {

  // navigate 
  const navigate = useNavigate();

  const [user,setUser] = useState({
    name:"",
    username:"",
    password:"",
    confirmPassword:"",
    gender:""
  })
      
  const handleCheckBox = (gender) =>{
    setUser({...user,gender})
  }

  const onRegisterHandle = async (e) =>{
    e.preventDefault()
    setUser({
      name:"",
      username:"",
      password:"",
      confirmPassword:"",
      gender:""
    })

    try {
      await axios.post('http://localhost:2914/api/user/register',user)
      .then((response)=>{
        if (response?.data?.success) {
           toast.success(response.data.message)
           navigate('/login')
           console.log(response)

        }
      }).catch((err)=>{
       
        console.log(err)
      })
    } catch (error) {
      toast.error(error.response.data.message)
      console.log(error)
    }
    // console.log(user)
  }


  
  return (
    <div className="container border border-2 border-success p-2 mt-5 w-25">
      <form className="border border-2 border-danger m-2 p-2 " onSubmit={onRegisterHandle}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={user.name}
            onChange={(e)=>setUser({...user,name:e.target.value})}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={user.username}
            onChange={(e)=>setUser({...user,username:e.target.value})}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            value={user.password}
            onChange={(e)=>setUser({...user,password:e.target.value})}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Confirmpasword
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            value={user.confirmPassword}
            onChange={(e)=>setUser({...user,confirmPassword:e.target.value})}
          />
        </div>
        <div>
          <div className="p-2 ">
            <div className="form-check ">
              <input
                className="form-check-input "
                type="radio"
                name="gridRadios"
                id="gridRadios1"
                defaultValue="option1"
                defaultChecked
                checked={user.gender ==="male"}
                onChange={()=>handleCheckBox("male")}
                
              />
              <label className="form-check-label" htmlFor="gridRadios1">
                Male
              </label>
            </div>
            <div className="form-check  ml-2 ml-2">
              <input
                className="form-check-input"
                type="radio"
                name="gridRadios"
                id="gridRadios2"
                defaultValue="option1"
                defaultChecked
                checked={user.gender ==="female"}
                onChange={()=>handleCheckBox("female")}
              />
              <label className="form-check-label" htmlFor="gridRadios2">
                Female
              </label>
            </div>
          </div>
        </div>
        <div className="my-1">
          <p>
            Already have account ? pls <Link to={"/login"} className="text-decoration-none">
              Login
            </Link>
          </p>
        </div>
        <button type="submit" className="btn btn-primary mt-3 w-100">
          Submit
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
