const express = require("express");
const router = express.Router();

const {getUser, postUser, loginUser} = require("./user.controller")
const {schema} = require("./user.validations")
const validationMiddleware = require("./user.middleware")
const authMiddleware = require("./user.auth.middleware")

router.route("/").get(authMiddleware,getUser) // Bu routes product bölümüne ait olacak.

router.route("/").post(validationMiddleware(schema),postUser)
router.route("/login").post(loginUser)

module.exports = router