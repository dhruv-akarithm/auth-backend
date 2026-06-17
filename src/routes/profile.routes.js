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

router.get("/", getProfile);
router.put("/", updateProfileValidator, validate, updateProfile);

router.put(
  "/change-password",
  changePasswordValidator,
  validate,
  changePassword,
);

module.exports = router;
