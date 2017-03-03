module.exports = {
    // Загрузить модель юзера (пользователя)
    // На *nix-ах все файлы чувствительны к регистру
    Person: 			require('./persons'),
    DB_revision: 		require('./db_revisions') // Ревизии базы данных (для импорта)
};