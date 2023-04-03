const express = require("express");
const ctrl = require("../../controllers/auth");
const {
  validateBody,
  authentificate,
  uploadCloud,
} = require("../../middlewares");
const { schemas } = require("../../models/user");
const router = express.Router();

const getUserStatistics = require('../../controllers/getStatistics')

router.post("/register", validateBody(schemas.registerSchema), ctrl.register);
router.get("/verify/:verificationToken", ctrl.verifyEmail);
router.post(
  "/verify",
  validateBody(schemas.emailSchema),
  ctrl.resendVerifyEmail
);
router.post("/login", validateBody(schemas.loginSchema), ctrl.login);
router.post(
  "/update",
  authentificate,
  uploadCloud.single("avatar"),
  ctrl.updateAvatar
);
router.get("/current", authentificate, ctrl.getCurrent);
router.post("/logout", authentificate, ctrl.logout);

router.patch(
  "/",
  authentificate,
  validateBody(schemas.updateSubscriptionSchema),
  ctrl.updateSubscription
);

router.get('/statistics', authentificate, getUserStatistics)
module.exports = router;
