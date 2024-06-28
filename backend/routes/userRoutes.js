import expres from 'express';
import { getOtherUsers, userLoginController, userLogoutController, userRegisterController } from '../controller/userController.js';
import { authentication } from '../middleware/usermiddleware.js';

const router = expres.Router();


// user register  http://localhost:2914/api/user/register
router.post('/register',userRegisterController)

//user login  http://localhost:2914/api/user/login
router.post('/login',userLoginController)

//user logout   http://localhost:2914/api/user/logout
router.get('/logout',userLogoutController)

//getting other users http://localhost:2914/api/user/get-other-user 

router.get('/get-other-user',authentication,getOtherUsers)


export default router;