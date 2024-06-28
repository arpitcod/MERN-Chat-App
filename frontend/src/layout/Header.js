import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { authUser } from "../redux/userSlice";

const Header = () => {
  const aUser = useSelector(authUser);

  // console.log("header", aUser.token);
  // useEffect(()=>{
    
  // },[aUser])
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-success">
        <div className="container-fluid ">
          <NavLink className="navbar-brand" to="/">
            Navbar
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav active ">
              <NavLink
                className="nav-link  text-white "
                aria-current="page"
                to="/"
              >
                Home
              </NavLink>
              {aUser?.token ? null : (
                <>
                  <NavLink className="nav-link text-white" to="/register">
                    Register
                  </NavLink>
                  <NavLink className="nav-link text-white" to="/login">
                    Login
                  </NavLink>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
