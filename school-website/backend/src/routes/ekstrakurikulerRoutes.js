const express = require('express');
const router = express.Router();
const controller = require('../controllers/ekstrakurikulerController');
const authMiddleware = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');

router.get('/', controller.getAll);
router.get('/:id', controller.getOne);
router.post('/', authMiddleware, upload.single('foto'), controller.create);
router.put('/:id', authMiddleware, upload.single('foto'), controller.update);
router.delete('/:id', authMiddleware, controller.remove);

module.exports = router;
