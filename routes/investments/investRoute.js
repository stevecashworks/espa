import { Router } from "express";
import { VerifyToken } from "../user/verify.js";
import { getAllInvestments, getApprovedInvestments, invest,getPendingRequests, getAllUserRequests, single, latestWithdrawal, deleteInvestment, ApproveInvestment, sendMessage, getActiveInvestment } from "./controller.js";
const router=Router();
router.get('/all',getAllUserRequests);
router.get('/active/:id',getActiveInvestment);
router.post('/message/:id',sendMessage);
router.get('/delete/:id',deleteInvestment)
router.get('/approve/:id/:type',ApproveInvestment)
router.get('/request/:id',single)
router.get('/latest/:id',latestWithdrawal)
 router.post('/add/:tk',VerifyToken,invest)
 router.get('/:tk',VerifyToken,getAllInvestments)
 router.get('/:tk/approved',VerifyToken,getApprovedInvestments);
 router.get('/:tk/pending',VerifyToken,getPendingRequests);

 export default router