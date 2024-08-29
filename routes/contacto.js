const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer")

// Ruta GET para mostrar el formulario
router.get('/', (req, res) => {  
    res.render('partials/contacto'); 
});

// Ruta POST para procesar el formulario
router.post('/', async (req, res) => {  
    const transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "516f37738ca6da",
          pass: "7e9ff3ef5e25cf"
        }
      });
    res.redirect('/contacto'); 

    const {nombre, apellido, email, mensaje } = req.body
    const emailSaliente = {
        to: "coderalsc@gmail.com",
        from: email,
        subject: "Mensaje desde el formulario de contacto",
        html: `${nombre} ${apellido} ha enviado el siguiente mensaje: ${mensaje}`
        

}

    try {
        const sendMailStatus = await transport.sendMail(emailSaliente)
        let statusMessage =""
        if(sendMailStatus.rejected.lenght) {
            statusMessage = "No ha sido enviado su mail. Inténtelo de nuevo"
        } else {
            statusMessage = "Mensaje enviado"
        }
        res.render("contacto", {statusMessage})
    } catch (error) {
        res.render("contacto", { statusMessage: "Servidor fuera de servicio" })

        
    }
});



module.exports = router;
