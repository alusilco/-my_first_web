const express = require("express");
const router = express.Router();
const users = require("../models/users");  

// Renderiza la página de login
router.get('/', (req, res) => {  
    res.render("partials/login"); 
});

router.post("/", async (req, res) => {
    try {
        const data = await users.getUser(req.body.email, req.body.pass);
        if (data != undefined) {
            req.session.user = req.body.email
            res.render("partials/admin", {user: req.session.user });
        } else {
            res.render("partials/login", { statusMessage: "Usuario o contraseña incorrectos" });
        }
    } catch (error) {
        console.error("Error al intentar autenticar al usuario:", error);
        res.status(500).render("partials/login", { statusMessage: "Ocurrió un error. Inténtalo nuevamente." });
    }
});

router.get("/logout", (req, res)=>{
    req.session.destroy()
    res.redirect("/")
})


module.exports = router;



/*const express = require("express");
const router = express.Router();
const usuarios = require ("../models/users")

router.get('/', (req, res) => {  
    res.render('partials/login'); 
});

router.post("/", async (req, res)=> {
    const data = await URLSearchParams.getUser(req.body.email, req.body.pass)
    if(data != undefined) {
        res.render("admin")
    } else {
        res.render("login", { statusMessage: "Usuario o contraseña incorrectos"})
    }
})
module.exports = router
*/



