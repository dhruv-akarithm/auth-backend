const router = require("express").Router();

const { signup, login, getMe } = require("../controllers/auth.controller");
const {
  signupValidator,
  loginValidator,
} = require("../validators/auth.validator");

const validate = require("../middlewares/validation.middleware");
const auth = require("../middlewares/auth.middleware");
router.post("/signup", signupValidator, validate, signup);
router.post("/login", loginValidator, validate, login);

router.get("/me", auth, getMe);

module.exports = router;
