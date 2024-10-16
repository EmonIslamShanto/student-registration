import express from 'express';
import { register, login, getProfile, updateProfile } from '../controllers/student.js';
import { uploadFile, readFile, deleteFile, upload } from '../controllers/file.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', auth, getProfile);
router.put('/profile', auth, updateProfile);
router.post('/upload', auth, upload, uploadFile);
router.get('/file/:filename', auth, readFile);
router.delete('/file', auth, deleteFile);

export default router;
