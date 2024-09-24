import express from 'express';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import { readFileSync, writeFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const dirname = path.dirname(fileURLToPath(import.meta.url)), app = express(), dbPath = path.join(dirname, 'db.json');

const getProducts = () => {
  const data = readFileSync(dbPath);
  return JSON.parse(data);
};
const saveProducts = (products) => {
  writeFileSync(dbPath, JSON.stringify(products, null, 2));
};

app.set('view engine', 'ejs');
app.set('views', path.join(dirname, 'public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.get('/db', (req, res) => { 
  const products = getProducts();
  res.render('index', { products }); 
});
app.get('/products/edit/:id', (req, res) => {
  const products = getProducts();
  const product = products.find(p => p.id == req.params.id);
  res.render('edit', { product });
});
app.put('/products/:id', (req, res) => {
  const products = getProducts();
  const product = products.find(p => p.id == req.params.id);
  product.name = req.body.name;
  product.price = req.body.price;
  saveProducts(products);
  res.redirect('/db');
});
app.delete('/products/:id', (req, res) => {
  let products = getProducts();
  products = products.filter(p => p.id != req.params.id);
  saveProducts(products);
  res.redirect('/db');
});
app.get('/products/new', (req, res) => { res.render('new'); });
app.post('/products', (req, res) => {
  const products = getProducts();
  const newProduct = {
    id: products.length + 1,
    name: req.body.name,
    price: req.body.price
  };
  products.push(newProduct);
  saveProducts(products);
  res.redirect('/db');
});
app.listen(3000, () => { console.log('Сервер запущен, порт: 3000'); });