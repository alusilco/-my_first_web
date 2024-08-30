require("dotenv").config()
const express = require('express');
const { create } = require('express-handlebars');
const session = require('express-session');
const path = require('path');
const fileupload = require("express-fileupload")

const indexRouter = require('./routes/index');
const contactoRouter = require('./routes/contacto');
const loginRouter = require('./routes/login');
const adminRouter = require('./routes/admin');

const PORT = process.env.PORT || 3000;
const app = express();

// Configuración de express-handlebars
const hbs = create({
    extname: '.hbs',
    defaultLayout: 'main', 
    layoutsDir: path.join(__dirname, 'views/layouts'), 
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

// Configura la carpeta de vistas
app.set('views', path.join(__dirname, 'views'));



app.use(session({
    secret: '12345',
    resave: false,
    saveUninitialitized: true,
    //cookie: { secure: false } 'secure: true' solo para HTTPS
}))

// Carpeta de archivos estáticos
app.use(express.static('public'));

app.use(express.urlencoded({ extended: false }))

function auth(req, res, next) {
    if (req, res) {
        next()
    } else {
        res.render("login", {statusMessage: "Debe estar autorizado para acceder como administrador"})
    }
}

//midelware de fileupload

app.use(fileupload({
    useTempFiles: true,
    tempFileDir: "/tmp/"
}))



app.use("/", indexRouter);
app.use("/contacto", contactoRouter);
app.use("/login", loginRouter)
app.use('/admin', auth, (req, res) => {
    res.render('partials/admin');  
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});


