# Бэкенд Mesto. Каркас API Mesto 
https://github.com/KatyaVarentsova/nodejs-mesto-project

## Используемые технологии и решения
- Typescript в качестве основного языка проекта
- Mongodb и ODM Mongoose для хранения данных пользователей
- Node.js в качестве среды выполнения

## Реализованные API
- GET /users — возвращает всех пользователей из базы;
- GET /users/:userId — возвращает пользователя по _id ;
- POST /users — создаёт пользователя с переданными в теле запроса name , about и avatar ;
- PATCH /users/me — обновляет профиль пользователя;
- PATCH /users/me/avatar — обновляет аватар пользователя;
- GET /cards — возвращает все карточки из базы;
- POST /cards — создаёт карточку с переданными в теле запроса name и link , устанавливает поле owner для карточки;
- DELETE /cards/:cardId — удаляет карточку по _id ;
- PUT /cards/:cardId/likes — ставит лайк карточке;
- DELETE /cards/:cardId/likes — убирает лайк с карточки.

## Примеры хранения данных в БД
### Пользователи: 
<img width="1317" height="328" alt="image" src="https://github.com/user-attachments/assets/1595e19b-3c7d-4a7d-a02b-075108869cb2" />

### Карточки:
<img width="1312" height="597" alt="image" src="https://github.com/user-attachments/assets/9a82c8d9-9cfa-4b8a-9d43-fcfa33cf51d9" />



