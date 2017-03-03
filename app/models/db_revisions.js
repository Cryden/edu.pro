// Загрузим mongoose т.к. нам требуется несколько классов или типов для нашей модели
const mongoose = require('mongoose');

// Создаем новую схему!
let db_revisionsSchema = new mongoose.Schema({
    num_revision: {
        type: Number,
        //required: [true, 'titleRequired']
    }
});

// Теперь подключим плагины (внешние модули)

// Компилируем и Экспортируем модель
module.exports = mongoose.model('DB_revision', db_revisionsSchema);