/**
 * @swagger
 * /api/getUserDetails:
 *   get:
 *     summary: Get user details
 *     description: fetches user details
 *     responses:
 *       200:
 *         description: On successful fetch
 *         content:
 *           application/json:
 *            schema:
 *              type: object
 *              profile_pic:
 *                type: string 
 *                description: Compressed thumbnail of the image
 *                example: "https://sdsmflfml.com"
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
 *                   example: "user id is a required filed"
 *         
 */