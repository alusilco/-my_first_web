const express = require("express");
const router = express.Router();
const cloudinary = require("cloudinary").v2
const util = require("util")
const tipos = require("../models/tipos")

const upload = util.promisify(cloudinary.uploader.upload);





router.get('/', (req, res) => {
    res.render("partials/admin", {user: req.session.user});
});

router.post("/", async(req, res) => {
    const public_id = (await uploader(req.files.imagen.tempFilePath)).public_id
    await tipos.agregarTipo({...req.body, imagen:public_id})
        res.redirect("/admin")
    

})
module.exports = router;
