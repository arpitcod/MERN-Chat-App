import React, { useEffect } from "react";
import useGetOtherUsers from "../hooks/useGetOtherUsers";
import { useDispatch, useSelector } from "react-redux";
import { otherUser, selectedUser, setSelectedUser } from "../redux/userSlice";
import "./css/Users.css"
const Users = ({fUsers}) => {
  useGetOtherUsers();
  const oUser = useSelector(otherUser);
  const sUser = useSelector(selectedUser);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   console.log("Other user changed: ", oUser);
  //   console.log("fusers",fUsers)
  // }, [oUser,fUsers]);

  if (!Array.isArray(oUser) || oUser.length === 0) {
    return <p className="text-center">User not found</p>;
  }
  if (fUsers.length === 0) {
    return <p className="text-center">user not found</p>
 }
  const selectedUserHandle = (user) => {
    dispatch(setSelectedUser(user));
    console.log(user);
  };

  return (
    <div className="main_users_container overflow-auto" style={{ height: "100%" }}>
      {
        // fUsers?(
          fUsers?.map((user) => (
            <div
              className={`users_box d-flex p-1 m-1 ${
                sUser?._id === user?._id ? "bg-dark text-white" : ""
              }`}
              key={user?._id}
              onClick={() => selectedUserHandle(user)}
            >
              <div className="users_logo overflow-hidden border-dark rounded-circle rounded-5 w-25 position-relative">
                <img src={user?.profilePhoto} className="w-100" alt={`${user?.username}'s profile`} />
              </div>
              <div className="users_name w-100 d-flex align-items-center text-left">
                <p className="text-left">{user?.username}</p>
              </div>
            </div>
          ))
        // ) : (<p>user not found</p>)
      }
      
    </div>
  );
};

export default Users;
