const express = require("express")
const cloudinary = require("cloudinary").v2
const tipos = require("../models/tipos")
const router = express.Router()
const util = require("util")
const destroy = util.promisify(cloudinary.uploader.destroy);


router.get("/", async(req, res)=> {
    const data = await tipos.leerTipos();
    const flores = data.determinePacket((row)=>{
        const imagen = cloudinary.url(row.imagen, {
            width: 80,
            height: 80,
            crop: "fill"
        });

        return {...row, imagen}
        
    })
    res.render("listado", { flores, user: req.session.user })
})

router.get("/borrar/:id", async(req,res)=>{
    const row = await tipos.leerTipos(req.params.id)
    await destroy(row[0].imagen)
    await tipos.borrarTipos(req.params.id)
    res.redirect("/listado")
}
)

module.exports = router