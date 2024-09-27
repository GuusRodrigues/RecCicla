const express = require('express');
const { getInspecoes, getInspecaoById, createInspecao, updateInspecao, deleteInspecao } = require('../controllers/inspecaoController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Inspeções
 *   description: Gerenciamento de Inspeções
 */

/**
 * @swagger
 * /api/inspecoes:
 *   get:
 *     summary: Lista todas as inspeções
 *     tags: [Inspeções]
 *     responses:
 *       200:
 *         description: Lista de inspeções
 */
router.get('/', authMiddleware, getInspecoes);

/**
 * @swagger
 * /api/inspecoes/{id}:
 *   get:
 *     summary: Obtém uma inspeção pelo ID
 *     tags: [Inspeções]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID da inspeção
 *     responses:
 *       200:
 *         description: Detalhes da inspeção
 *       404:
 *         description: Inspeção não encontrada
 */
router.get('/:id', authMiddleware, getInspecaoById);

/**
 * @swagger
 * /api/inspecoes:
 *   post:
 *     summary: Cria uma nova inspeção
 *     tags: [Inspeções]
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
 *               datahora:
 *                 type: string
 *                 format: date-time
 *               user:
 *                 type: string
 *               reciclagem:
 *                 type: string
 *     responses:
 *       201:
 *         description: Inspeção criada com sucesso
 *       400:
 *         description: Erro na requisição
 */
router.post('/', authMiddleware, createInspecao);

/**
 * @swagger
 * /api/inspecoes/{id}:
 *   put:
 *     summary: Atualiza uma inspeção existente
 *     tags: [Inspeções]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID da inspeção
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
 *               datahora:
 *                 type: string
 *                 format: date-time
 *               user:
 *                 type: string
 *               reciclagem:
 *                 type: string
 *     responses:
 *       200:
 *         description: Inspeção atualizada com sucesso
 *       404:
 *         description: Inspeção não encontrada
 */
router.put('/:id', authMiddleware, updateInspecao);

/**
 * @swagger
 * /api/inspecoes/{id}:
 *   delete:
 *     summary: Deleta uma inspeção existente
 *     tags: [Inspeções]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID da inspeção
 *     responses:
 *       200:
 *         description: Inspeção deletada com sucesso
 *       404:
 *         description: Inspeção não encontrada
 */
router.delete('/:id', authMiddleware, deleteInspecao);

module.exports = router;
