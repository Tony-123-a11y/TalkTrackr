import express from 'express';
import { getAllMessages, getChatList, sendMessage } from '../controllers/messageController.js';

export const messageRouter= express.Router()

messageRouter.post('/sendMessage/:friendId',sendMessage)
messageRouter.get('/getMessages/:chatId',getAllMessages)
messageRouter.get('/getChatList',getChatList)