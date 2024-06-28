import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch } from 'react-redux';
import { setOtherUsers } from "../redux/userSlice";

const useGetOtherUsers = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getUsers = async () => {
      try {
        axios.defaults.withCredentials = true;
        const response = await axios.get("http://localhost:2914/api/user/get-other-user");
        if (response?.data?.success) {
          dispatch(setOtherUsers(response?.data?.otherUser));
          console.log(response.data.otherUser);
        }
      } catch (error) {
        console.error("Error fetching other users:", error);
      }
    };

    getUsers();
  },[]);
};

export default useGetOtherUsers;
