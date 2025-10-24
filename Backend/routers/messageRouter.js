import express from 'express';
import { getAllMessages, getChatList, sendMessage } from '../controllers/messageController.js';

export const messageRouter= express.Router()

messageRouter.post('/sendMessage/:friendId',sendMessage)
messageRouter.get('/getMessages/:friendId',getAllMessages)
messageRouter.get('/getChatList',getChatList)