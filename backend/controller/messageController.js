
import { conversationModel} from "../model/conversationModel.js";
import { messageModel } from "../model/messageModel.js";
import {getReceiverSocketId, io} from '../socket/socket.js'


// send message controller 
export const sendMessageController = async (rq,rs) =>{
    try {
        const senderId = rq.id;
        const receiverId = rq.params.id;
        const {message} = rq.body;

        console.log("senderid",senderId);
        console.log("recieverid",receiverId);
        console.log("message",message);

        // const {senderId,receiverId,message} = await rq.body;

        let gotConversation = await conversationModel.findOne({
            participants:{$all : [senderId,receiverId]},
        });

        if (!gotConversation) {
            gotConversation = await new conversationModel({
                participants:[senderId,receiverId],
                
            })
        };

        const newMessage = await new messageModel({
            senderId,
            receiverId,
            message
        });
        // .save();
        await newMessage.save();

        if (newMessage) {
         gotConversation.messages.push(newMessage._id);
        };
        
        await Promise.all([gotConversation.save(),newMessage.save()])
        // await newMessage.save();
        // await gotConversation.save(); 

        //socket 
        const receiverSocketid = getReceiverSocketId(receiverId);
        if (receiverSocketid) {
            io.to(receiverSocketid).emit("newMessage",newMessage);
        }
        return rs.status(201).send({
            success:true,
            message:"message send successfully",
            newMessage
        })
         
    } catch (error) {
        console.log(error)
    }
}

// get message controller 

export const getMessageController = async (rq,rs) =>{
    try {
        const senderId = rq.id;
        const receiverId = rq.params.id;

        const conversation = await conversationModel.findOne({
            participants:{$all : [senderId,receiverId]}
        }).populate("messages")
        console.log(conversation);
            
        return rs.status(200).send(conversation?.messages);
    } catch (error) {
        console.log(error)
    }
}