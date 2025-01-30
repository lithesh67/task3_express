/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: User login
 *     description: Logs in the user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               identifier:
 *                 type: string
 *                 description: Username of the user or registered email
 *                 example: "Quentin"
 *               password:
 *                 type: string
 *                 description: Password created by the user during signup
 *                 example: "12345678"
 *     responses:
 *       200:
 *         description: On successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Signed and encrypted JWT token
 *                   example: "dkssfmslddfsdfdddldllsdssa..."
 *                 refresh:
 *                   type: string
 *                   description: Signed and encrypted JWT refresh token
 *                   example: "fsffnslkgaelmalmlgmdlmldml..."
 *                 username:
 *                   type: string
 *                   description: Username of logged in user
 *                   example: "lithesh1"
 *                 email:
 *                   type: string
 *                   description: Email of the registered user
 *                   example: "lithesh@gmail.com"
 *                 id:
 *                   type: integer
 *                   description: ID of the registered user
 *                   example: 1
 *                 bool:
 *                   type: boolean
 *                   description: An additional parameter
 *                   example: true
 *       400:
 *         description: On Joi validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Description of the Joi validation error
 *                   example: "password is a required field"
 *       401:
 *         description: On entering wrong credentials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: On entering wrong credentials
 *                   example: "Invalid credentials"
 *                 bool:
 *                   type: boolean
 *                   description: An additional parameter
 *                   example: true
 */
