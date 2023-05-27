import { getStats } from "./controller.js";
import express from 'express'
const statRoute=  express.Router();
statRoute.get('/',getStats)
export default statRoute