const express = require("express")
const router = express.Router()

router.get("/", function(req, res) {
    res.render("modificar", { user: req.session.user })

    module.exports = router
})