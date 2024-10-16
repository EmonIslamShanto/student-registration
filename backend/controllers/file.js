import multer from 'multer';
import path from 'path';
import fs from 'fs';
import Student from '../models/Student.js';

// Multer configuration
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, `${req.student.id}-${Date.now()}${path.extname(file.originalname)}`);
  }
});

export const upload = multer({ storage }).single('file');

// Upload File
export const uploadFile = async (req, res) => {
  try {
    const student = await Student.findById(req.student.id);
    student.profilePicture = req.file.filename;
    await student.save();
    res.json({ msg: 'File uploaded successfully', file: req.file });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Read File
export const readFile = async (req, res) => {
  const filePath = path.join('./uploads', req.params.filename);
  res.sendFile(filePath, { root: '.' });
};

// Delete File
export const deleteFile = async (req, res) => {
  try {
    const student = await Student.findById(req.student.id);
    const filePath = path.join('./uploads', student.profilePicture);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    student.profilePicture = null;
    await student.save();
    res.json({ msg: 'File deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
