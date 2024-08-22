// routes/contacto.js
const express = require("express");
const router = express.Router();

// Ruta GET para mostrar el formulario
router.get('/', (req, res) => {  
    res.render('partials/contacto'); 
});

// Ruta POST para procesar el formulario
router.post('/', (req, res) => {  
    console.log(req.body);
    res.redirect('/contacto'); 
});

module.exports = router;
