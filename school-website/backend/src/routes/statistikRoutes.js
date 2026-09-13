const express = require('express');
const router = express.Router();
const controller = require('../controllers/statistikController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', controller.get);
router.put('/', authMiddleware, controller.update);

module.exports = router;
