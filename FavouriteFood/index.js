import express from 'express';
import { engine } from 'express-handlebars';
import path from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config';

const dirname = path.dirname(fileURLToPath(import.meta.url)), app = express();

app.engine('hbs', engine({
    extname: 'hbs',
    defaultLayout: 'layout',
    layoutsDir: path.join(dirname, 'views/layouts'),
    partialsDir: path.join(dirname, 'views/partials')
}));
app.set('view engine', 'hbs');
app.set('views', path.join(dirname, 'views'));

app.get('/', (req, res) => {
    res.render('index', { 
        title: 'Главная',
        navbar: 'navbar',
        footer: 'footer'
    });
});
app.get('/about', (req, res) => {
    res.render('about', { 
        title: 'О себе',
        navbar: 'navbar',
        footer: 'footer'
    });
});
app.get('/projects', (req, res) => {
    res.render('projects', { 
        title: 'Проекты',
        navbar: 'navbar',
        footer: 'footer'
    });
});

// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Сайт работает на http://localhost:${PORT}`);
});