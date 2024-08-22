const express = require('express');
const { create } = require('express-handlebars');
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

// Rutas
app.get('/', (req, res) => {
    res.render('partials/index'); 
});

app.get('/contacto', (req, res) => {
    res.render('partials/contacto'); 
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});



/*
app.get("/proyectos", function(req, res){
    res.send("Ahora esta en la sección 'Proyectos'")


})

app.listen(3000, function(error){
    error? console.log(error) : console.log(`Servidor corriendo en http://localhost:3000`)
})*/
