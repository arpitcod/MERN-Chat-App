import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate} from "react-router-dom";
import { toast } from "react-toastify";
import { setAuthuser } from "../redux/userSlice";

const LoginPage = () => {
  // navigate 
 const navigate = useNavigate()

//  redux dispatch 
const disPatch = useDispatch();

  const [user, setUser] = useState({
    
    username: "",
    password: "",
    
  });
  
  
  const onLoginHandler = async (e) => {
    e.preventDefault();
    try {
      axios.defaults.withCredentials = true;
      await axios.post('http://localhost:2914/api/user/login',user)
      .then(response =>{
        if (response.data.success) {
          // alert("success")
          disPatch(setAuthuser(response.data));
          toast.success(response.data.message)
            navigate("/")
            console.log(response.data)
        }
      }).catch((err)=>{
      toast.error(err.response.data.message)
      console.log(err)
    })
    setUser({
    
      username: "",
      password: "",
    }
  );
  } catch (error) {
    console.log(error)
  }
    console.log(user);
  };
  // useEffect(()=>{},[user,setAuthuser])
  return (
    <>
      <div className="container border border-2 border-success p-2 mt-5 w-25 ">
        <form className="border border-2 border-danger m-2 p-2 " onSubmit={onLoginHandler}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label ">
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
          <div>
            <p>
              Dont have account ? pls{" "}
              <Link to={"/register"} className="text-decoration-none">
                Register
              </Link>
            </p>
          </div>
          <button type="submit" className="btn btn-primary mt-3 w-100">
            Login
          </button>
          {/* <button onClick={navigate("/")}>go</button> */}
        </form>
      </div>
    </>
  );
};

export default LoginPage;
