import jwt from 'jsonwebtoken'
export const authentication = async (rq,rs,next) =>{
    try {
      const token = await rq.cookies.token;
      if (!token) {
        return rs.status(401).send({
            success:false,
            message:"user is not authenticated"
        })
      }

    //   token verify 
      const decode = await jwt.verify(token,process.env.JWT_SECRET);
      // console.log(decode);
      if (!decode) {
        return rs.status(401).send({
            success:false,
            message:"invalid token"
        })
      }
      rq.id = decode.userId;
    //   console.log(token)
        next()
    } catch (error) {
        console.log(error)
    }
}

// const rq ={
//     id:"",
// }
// rq.id="harekrishna"