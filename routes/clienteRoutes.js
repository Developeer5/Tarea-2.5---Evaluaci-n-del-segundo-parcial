import express from 'express'
import {
  obtenerClientes,
  crearCliente,
  obtenerClientePorMatricula,
  actualizarClientePorMatricula,
  eliminarClientePorMatricula
} from '../controllers/clienteController.js'
import verificaToken from '../middleware/verificaToken.js'

const router = express.Router()

// Todas las rutas de clientes quedan protegidas por el token
router.use(verificaToken)

/**
 * @swagger
 * tags:
 *   name: Clientes
 *   description: Endpoints para gestión de clientes
 */

/**
 * @swagger
 * /api/clientes:
 *   get:
 *     summary: Obtener todos los clientes
 *     tags: [Clientes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de clientes
 *       401:
 *         description: Token inválido o no proporcionado
 */
router.get('/', obtenerClientes)

/**
 * @swagger
 * /api/clientes:
 *   post:
 *     summary: Crear un nuevo cliente
 *     tags: [Clientes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombres
 *               - apellidos
 *               - fechaNacimiento
 *               - sexo
 *               - matricula
 *             properties:
 *               nombres:
 *                 type: string
 *               apellidos:
 *                 type: string
 *               fechaNacimiento:
 *                 type: string
 *                 format: date
 *               sexo:
 *                 type: string
 *                 enum: [masculino, femenino]
 *               nota_grado:
 *                 type: number
 *               matricula:
 *                 type: string
 *     responses:
 *       201:
 *         description: Cliente creado correctamente
 *       401:
 *         description: Token inválido o no proporcionado
 */
router.post('/', crearCliente)

/**
 * @swagger
 * /api/clientes/matricula/{matricula}:
 *   get:
 *     summary: Obtener un cliente por matrícula
 *     tags: [Clientes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: matricula
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Cliente encontrado
 *       404:
 *         description: Cliente no encontrado
 *       401:
 *         description: Token inválido o no proporcionado
 */
router.get('/matricula/:matricula', obtenerClientePorMatricula)

/**
 * @swagger
 * /api/clientes/matricula/{matricula}:
 *   put:
 *     summary: Actualizar un cliente por matrícula
 *     tags: [Clientes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: matricula
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombres:
 *                 type: string
 *               apellidos:
 *                 type: string
 *               nota_grado:
 *                 type: number
 *     responses:
 *       200:
 *         description: Cliente actualizado
 *       404:
 *         description: Cliente no encontrado
 *       401:
 *         description: Token inválido o no proporcionado
 */
router.put('/matricula/:matricula', actualizarClientePorMatricula)

/**
 * @swagger
 * /api/clientes/matricula/{matricula}:
 *   delete:
 *     summary: Eliminar un cliente por matrícula
 *     tags: [Clientes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: matricula
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Cliente eliminado
 *       404:
 *         description: Cliente no encontrado
 *       401:
 *         description: Token inválido o no proporcionado
 */
router.delete('/matricula/:matricula', eliminarClientePorMatricula)

export default router
