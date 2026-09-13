const express = require('express');
const router = express.Router();
const controller = require('../controllers/galeriController');
const authMiddleware = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');

router.get('/', controller.getAll);
router.post('/', authMiddleware, upload.single('foto'), controller.create);
router.delete('/:id', authMiddleware, controller.remove);

module.exports = router;
