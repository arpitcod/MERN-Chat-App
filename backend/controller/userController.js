// import userModel from "../model/userModel.js";
import bcrypt from "bcrypt";
import { userModel } from "../model/userModel.js";
import jwt from 'jsonwebtoken'
import cookie from 'cookie'


//registartion controller...........................................................................................
export const userRegisterController = async (rq, rs) => {
  try {
    const { name, username, password, confirmPassword, gender } = rq.body;

    if (!name || !username || !password || !confirmPassword || !gender) {
      return rs.status(400).send({
        success: false,
        message: "pls full field fill",
      });
    }

    // passsword matching
    if (password !== confirmPassword) {
      return rs.status(400).send({
        success: false,
        message: "password not match",
      });
    }

    //existing user
    const existingUser = await userModel.findOne({ username });
    if (existingUser) {
      return rs.status(400).send({
        success: false,
        message: "user is already register",
      });
    }

    //hashed password
    const hashedPassword = await bcrypt.hash(password, 10);

    //profile avtar
    const maleProfile = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const femaleProfile = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const user = await new userModel({
      name,
      username,
      password: hashedPassword,
      profilePhoto:gender==="male" ? maleProfile : femaleProfile,
      gender,
    }).save();

    return rs.status(201).send({
      success: true,
      message: "user register successfully",
      user,
    });
  } catch (error) {
    console.log(error);
  }
};


//login controller...................................................................................

export const userLoginController = async (rq,rs) =>{

  try {
    const {username, password } =rq.body;

    if (!username || !password ) {
      return rs.status(400).send({
        success:false,
        message:"field is required"
      })
    }
        // user finding 
    const user = await userModel.findOne({username});
    if (!user) {
      return rs.status(400).send({
        success:false,
        message:"user is not registered"
      })
    }

    // password matching with bcrypt
    const passwordMatch = await bcrypt.compare(password ,user.password);
    if (!passwordMatch) {
      return rs.status(400).send({
        success:false,
        message:"incorrect username or password"
      })
    }

    //token
    const token = await jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:'1d'})

    return rs.status(200).cookie("token",token,{maxAge:1*24*60*60*1000,httpOnly:true,sameSite:'strict'}).send({
      success:true,
      message:"login successfully",
      _id:user._id,
      name:user.name,
      username:user.username,
      profilePhoto:user.profilePhoto,
      token

    })
  } catch (error) {
    console.log(error)
  }
}


//logout
export const userLogoutController = (rq,rs) =>{
  try {
    return rs.status(200).cookie("token","",{maxAge:0}).send({
      success:true,
      message:"logout successfully"
    })
  } catch (error) {
    console.log(error)
  }
}

export const getOtherUsers = async (rq,rs) =>{
  try {
    const loggedUserId = rq.id;
    const otherUser =await userModel.find({_id:{$ne:loggedUserId}}).select("-password")

    return rs.status(200).send({
      success:true,
      otherUser
    })

  } catch (error) {
    console.log(error)
  }
}