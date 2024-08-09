import User from '../models/userModel.js';
import LeaveRequest from '../models/LeaveRequestModel.js';

export const createLeaveRequest = async (req, res) => {
    const { startDate, endDate, reason } = req.body;

    try {
        const leaveRequest = await LeaveRequest.create({
            startDate,
            endDate,
            reason,
            userId: req.user.id, // Utilise l'ID de l'utilisateur connecté
        });

        res.status(201).json(leaveRequest);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create leave request', error });
    }
};


export const getLeaveBalance = async (req, res) => {
    try {
        const approvedLeaves = await LeaveRequest.findAll({
            where: { userId: req.user.id, status: 'Approved' },
        });
        const totalDays = approvedLeaves.reduce((sum, leave) => {
            const diffTime = Math.abs(new Date(leave.endDate) - new Date(leave.startDate));
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            return sum + diffDays;
        }, 0);
        res.status(200).json({ totalDays });
    } catch (error) {
        res.status(500).json({ message: 'Failed to get leave balance', error });
    }
};

export const getLeaveRequestsHistory = async (req, res) => {
    try {
        const leaveRequests = await LeaveRequest.findAll({
            where: { userId: req.user.id },
            include: {
                model: User,
                attributes: ['name', 'email'],
            },
        });
        res.status(200).json(leaveRequests);
    } catch (error) {
        res.status(500).json({ message: 'Failed to get leave requests history', error });
    }
};

export const getLeaveRequestNotifications = async (req, res) => {
    try {
        const leaveRequests = await LeaveRequest.findAll({
            where: { userId: req.user.id, status: 'Pending' },
        });
        res.status(200).json(leaveRequests);
    } catch (error) {
        res.status(500).json({ message: 'Failed to get leave request notifications', error });
    }
};

export const getAllLeaveRequests  = async (req, res) => {
    try {
        const leaveRequests = await LeaveRequest.findAll({
            include: {
                model: User,
                attributes: ['name', 'email'], // Include user name and email in the response if needed
            },
            order: [['createdAt', 'DESC']]
        });
        res.status(200).json(leaveRequests);
    } catch (error) {
        res.status(500).json({ message: 'Failed to get all leave requests', error });
    }
};

export const updateLeaveRequest = async (req, res) => {
    try {
        const { id } = req.params;
        const { startDate, endDate, reason } = req.body;

        const leaveRequest = await LeaveRequest.findOne({
            where: {
                id,
                userId: req.user.id
            }
        });

        if (!leaveRequest) {
            return res.status(404).json({ message: 'Leave request not found' });
        }

        leaveRequest.startDate = startDate || leaveRequest.startDate;
        leaveRequest.endDate = endDate || leaveRequest.endDate;
        leaveRequest.reason = reason || leaveRequest.reason;

        await leaveRequest.save();

        res.status(200).json(leaveRequest);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update leave request', error });
    }
};

export const updateLeaveRequestStatus  = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const leaveRequest = await LeaveRequest.findOne({
            where: { id }
        });

        if (!leaveRequest) {
            return res.status(404).json({ message: 'Leave request not found' });
        }

        leaveRequest.status = status;

        await leaveRequest.save();

        res.status(200).json(leaveRequest);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update leave request status', error });
    }
};

