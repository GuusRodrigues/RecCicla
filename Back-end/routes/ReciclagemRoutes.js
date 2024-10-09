const express = require('express');
const {
  getReciclagem,
  getReciclagemById,
  createReciclagem,
  updateReciclagem,
  deleteReciclagem,
  getReciclagemByUserId
} = require('../controllers/ReciclagemController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', authMiddleware, getReciclagem);

router.get('/:id', authMiddleware, getReciclagemById);

router.post('/', authMiddleware, createReciclagem);

router.put('/:id', authMiddleware, updateReciclagem);

router.delete('/:id', authMiddleware, deleteReciclagem);

router.get('/user/:userId', authMiddleware, getReciclagemByUserId);

module.exports = router;
