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
})


router.get("/modificar/:id", async(req, res)=>{
    const data = await tipos.leerTipos(req.params.id)
    const flores = data.determinePacket((row)=> {
        return {...row}
    })
    res.render("/modificar", { flores})
})
router.post("/modificar", async(req, res) =>{
    const { id, tipos, características, detalle } = req.body
    const data = {
        tipos, características, detalle
    }
    await tipos.cambiarTipos(data, id)
    res.redirect("/admin")
})

module.exports = router