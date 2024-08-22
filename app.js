const express = require('express');
const { create } = require('express-handlebars');
const indexRouter = require("./routes/index")
const contactoRouter = require("./routes/contacto")

const path = require('path');
const PORT = process.env.PORT || 3001;
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

// Carpeta de archivos estáticos
app.use(express.static('public'));

app.use(express.urlencoded({ extended: false }))

app.use("/", indexRouter);
app.use("/contacto", contactoRouter);



app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});


