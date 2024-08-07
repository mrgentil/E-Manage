import express from 'express';


import {admin, authenticate, protect} from '../middlewares/authMiddleware.js';
import {
    createLeaveRequest, getAllLeaveRequests,
    getLeaveBalance,
    getLeaveRequestNotifications,
    getLeaveRequestsHistory, updateLeaveRequest, updateLeaveRequestStatus
} from "../controllers/leaveRequestController.js";
const router = express.Router();

router.post('/', authenticate, createLeaveRequest);
router.get('/', authenticate, getAllLeaveRequests);
router.get('/balance', authenticate, getLeaveBalance);
router.get('/history', authenticate, getLeaveRequestsHistory);
router.get('/notifications', authenticate, getLeaveRequestNotifications);
router.put('/:id', authenticate, updateLeaveRequest)
router.put('/status/:id', authenticate, protect,  admin, updateLeaveRequestStatus)
export default router;
