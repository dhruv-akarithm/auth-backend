const router = require("express").Router();

const {
  getProfile,
  updateProfile,
  changePassword,
} = require("../controllers/profile.controller");
const {
  updateProfileValidator,
  changePasswordValidator,
} = require("../validators/profile.validator");

const validate = require("../middlewares/validation.middleware");
const auth = require("../middlewares/auth.middleware");

router.use(auth);

/**
 * @swagger
 * /profile:
 *   get:
 *     summary: Get logged-in user's profile
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profile fetched successfully
 *       401:
 *         description: Unauthorized
 */
router.get("/", getProfile);
/**
 * @swagger
 * /profile:
 *   put:
 *     summary: Update user profile
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Dhruv
 *               phoneNumber:
 *                 type: string
 *                 example: "9876xxxxxx"
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
router.put("/", updateProfileValidator, validate, updateProfile);

/**
 * @swagger
 * /profile/change-password:
 *   put:
 *     summary: Change user password
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - oldPassword
 *               - newPassword
 *             properties:
 *               oldPassword:
 *                 type: string
 *                 example: password123
 *               newPassword:
 *                 type: string
 *                 example: newpassword123
 *     responses:
 *       200:
 *         description: Password changed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Password changed successfully
 *
 *       400:
 *         description: Validation error
 *
 *       401:
 *         description: Invalid credentials
 */
router.put(
  "/change-password",
  changePasswordValidator,
  validate,
  changePassword,
);

module.exports = router;
