const express = require('express');
const {
  getReciclagem,
  getReciclagem,
  createReciclagem,
  updateReciclagem,
  deleteReciclagem,
  getReciclagemByUserId
} = require('../controllers/ReciclagemController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Reciclagens
 *   description: Gerenciamento de Reciclagens
 */

/**
 * @swagger
 * /api/Reciclagem:
 *   get:
 *     summary: Lista todas as Reciclagens
 *     tags: [Reciclagens]
 *     responses:
 *       200:
 *         description: Lista de Reciclagens
 */
router.get('/', authMiddleware, getReciclagem);

/**
 * @swagger
 * /api/Reciclagem/{id}:
 *   get:
 *     summary: Obtém uma Reciclagem pelo ID
 *     tags: [Reciclagens]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID da Reciclagem
 *     responses:
 *       200:
 *         description: Detalhes da Reciclagem
 *       404:
 *         description: Reciclagem não encontrada
 */
router.get('/:id', authMiddleware, getReciclagemById);

/**
 * @swagger
 * /api/Reciclagem:
 *   post:
 *     summary: Cria uma nova Reciclagem
 *     tags: [Reciclagens]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               descricao:
 *                 type: string
 *               localizacao:
 *                 type: string
 *               user:
 *                 type: string
 *     responses:
 *       201:
 *         description: Reciclagem criada com sucesso
 *       400:
 *         description: Erro na requisição
 */
router.post('/', authMiddleware, createReciclagem);

/**
 * @swagger
 * /api/Reciclagem/{id}:
 *   put:
 *     summary: Atualiza uma Reciclagem existente
 *     tags: [Reciclagens]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID da Reciclagem
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               descricao:
 *                 type: string
 *               localizacao:
 *                 type: string
 *               user:
 *                 type: string
 *     responses:
 *       200:
 *         description: Reciclagem atualizada com sucesso
 *       404:
 *         description: Reciclagem não encontrada
 */
router.put('/:id', authMiddleware, updateReciclagem);

/**
 * @swagger
 * /api/Reciclagem/{id}:
 *   delete:
 *     summary: Deleta uma Reciclagem existente
 *     tags: [Reciclagens]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID da Reciclagem
 *     responses:
 *       200:
 *         description: Reciclagem deletada com sucesso
 *       404:
 *         description: Reciclagem não encontrada
 */
router.delete('/:id', authMiddleware, deleteReciclagem);

/**
 * @swagger
 * /api/Reciclagem/user/{userId}:
 *   get:
 *     summary: Retorna todas as Reciclagens de um usuário específico
 *     tags: [Reciclagens]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Lista de Reciclagens do usuário
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Reciclagem'
 *       401:
 *         description: Usuário não autenticado
 *       404:
 *         description: Usuário não encontrado
 */
router.get('/user/:userId', authMiddleware, getReciclagemByUserId);

module.exports = router;
