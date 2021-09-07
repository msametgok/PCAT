const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const methodOverride = require('method-override');

const path = require('path');
const ejs = require('ejs');

const pageController = require('./controller/pageController');
const photoController = require('./controller/photoController');

const app = express();

// Create and connect Database
mongoose.connect('mongodb://localhost/pcat-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//TEMPLATE ENGINE
app.set('view engine', 'ejs');

//MIDDLEWARES
app.use(express.static('public')); //statik dosyaları dahile etmek için
app.use(express.urlencoded({ extended: true })); //request body bilgisi yakalamak için
app.use(express.json()); // yakalnan body bilgisini json a çevirmek için
app.use(fileUpload());
app.use(
  methodOverride('_method', {
    methods: ['GET', 'POST'], //Foto silmek istediğimizde get request ve delete request çakıştı.
  })// Bunun için methods eklendi.
);

// ROUTES
//PHOTO CONTROLLER
app.get('/', photoController.getAllPhotos);
app.get('/photos/:id', photoController.getPhoto);
app.post('/photos', photoController.addPhoto);
app.put('/photos/:id', photoController.updatePhoto);
app.delete('/photos/:id', photoController.deletePhoto);

//PAGE CONTROLLER
app.get('/about', pageController.getAboutPage);
app.get('/add', pageController.getAddPage);
app.get('/photos/edit/:id', pageController.getEditPage);

const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı..`);
});
