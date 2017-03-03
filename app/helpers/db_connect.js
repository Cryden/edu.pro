// Config init
var config = require(__base + 'config');

// Инициализация датабазы!
// Загрузим mongoose
var mongoose = require('mongoose');

mongoose.Promise = require('bluebird');

// Подключимся к серверу MongoDB
// В дальнейшем адрес сервера будет загружаться с конфигов
mongoose.connect(config.mongoDB,{
    server:{
        poolSize: 10
        // Поставим количество подключений в пуле
        // 10 рекомендуемое количество для моего проекта.
        // Вам возможно понадобится и то меньше...
    }
});

let db = mongoose.connection;


// В случае ошибки будет вызвано данная функция
db.on('error', function (err) {
    console.error("Database Connection Error: " + err);
    // Скажите админу пусть включит MongoDB сервер :)
    console.error('Возможно сервер MongoDB не запущен!');
    process.exit(2);
});

// Данная функция будет вызвано когда подключение будет установлено
db.on('connected', function(){
    // Подключение установлено
    console.info("Succesfully connected to MongoDB Database");
    // В дальнейшем здесь мы будем запускать сервер.
});