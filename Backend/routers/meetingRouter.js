import express from 'express';
import { checkMeeting, createMeeting, deleteMeeting } from '../controllers/meetingController.js';
export const meetingRouter= express.Router()

meetingRouter.post('/createMeeting',createMeeting)
meetingRouter.get('/checkMeeting/:roomCode',checkMeeting)
meetingRouter.delete('/deleteMeeting/:roomCode',deleteMeeting)