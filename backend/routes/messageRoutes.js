import express from 'express'
import { getMessageController, sendMessageController } from '../controller/messageController.js';
import { authentication } from '../middleware/usermiddleware.js';

const router = express.Router();

// send message route http://localhost:2914/api/message/send-message/66425bdac958b2a5ad13b95e
router.post('/send-message/:id',authentication,sendMessageController)

// get message roue http://localhost:2914/api/message/66434c8894ceb8c56f90c964
router.get('/:id',authentication,getMessageController)

export default router;