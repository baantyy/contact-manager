const express = require("express")
const router = express.Router()

const { userRouter } = require("../app/controllers/UserController")
const { contactRouter } = require('../app/controllers/ContactController')
const { adminRouter } = require('../app/controllers/admin/AdminController')

router.use("/admin", adminRouter)
router.use("/users", userRouter)
router.use("/contacts", contactRouter)

module.exports = {
    routes: router
}