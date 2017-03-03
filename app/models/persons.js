// Загрузим mongoose т.к. нам требуется несколько классов или типов для нашей модели
const mongoose = require('mongoose');

// Создаем новую схему!
let personsSchema = new mongoose.Schema({
    title: {
        type: String,
        //required: [true, 'titleRequired']
    },
    family:{
        type: String,
        //required: [true, 'titleRequired']
    },
    name: {
        type: String,
        //required: [true, 'titleRequired']
    },
    lastname: {
        type: String,
        //required: [true, 'titleRequired']
    },
    sex: {
        type: String,
        //required: [true, 'titleRequired']
    },
    birthday: {
        type: String,
        //required: [true, 'titleRequired']
    },
    nation: {
        type: String,
       // required: [true, 'titleRequired']
    },
    obrazov: {
        type: String,
        //required: [true, 'titleRequired']
    },
    nomotr: {
        type: String,
        //required: [true, 'titleRequired']
    }
});

// Теперь подключим плагины (внешние модули)

// Компилируем и Экспортируем модель
module.exports = mongoose.model('Person', personsSchema);