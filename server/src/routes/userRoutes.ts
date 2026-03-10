import express from 'express';
import { registerUser, loginUser, getUsers, updateUserMembership, getUserByEmail, getUserById, updateUserProfile } from '../controllers/userController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/', getUsers);
router.get('/email/:email', getUserByEmail);
router.get('/:id', getUserById);
router.put('/membership', updateUserMembership);
router.put('/profile', updateUserProfile);

export default router;
