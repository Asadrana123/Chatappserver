import { Router } from "express";
import auth from '../middleware/auth.js';
import { Signup, Signin, Getusers } from "../controller/userController.js"; // Ensure .js is included for ES module
const router = Router();
router.post('/', Signup);
router.post('/signin', Signin); // Use lowercase for consistency
router.post('/getusers', auth, Getusers);

export default router; // Corrected 'defaultrouter' to 'default router'
