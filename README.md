# myIIT-API-Lib (Node.js) 🟢

> NPM - [`myiit-api-lib`](https://www.npmjs.com/package/myiit-api-lib)

### Возможности библиотеки основаны на <a href="https://myiit.demlovesky.ru/">myIIT API</a>

- Авторизация пользователя в системе
- Получение уникального токена
- Отправка методов <b>myIIT API</b>

###Структура проекта

```
- example
    - authorization.js - Пример с авторизацией
    - useMethods.js - Пример с отправкой методов
- myFetch
    - myFetch.js - Оболочка fetch для отправки запросов
authUser.js - Скрипт авторизации
index.js
methodsUser.js - Скрипт отправки методов
```

## Установка

```bash
npm i myiit-api-lib
```

## Примеры использования
```js
import { AuthUser, User } from 'myiit-api-lib'

const authUser = new AuthUser('e-mail', 'password')
const user = new User(authUser)

const getMethod = () => { // for 'GET', 'DELETE'
    const data = async () => {
        const news = await user.method('news.getListArticle', null, {}, 'GET', 'v1') // name_method: string; body: object; params: object; method_http: string; ver_api: string
        return news
    }
    data()
    return data
}
```

### authUser структура
```js
// Конструктор
this.login // e-mail Moodle
this.password // Пароль Moodle
this.vkURL // Уникальный URL, отправляемый VK при заходе в приложение

// Методы
loginUser(login = this.login, password = this.password) // Авторизация с помощью e-mail и пароля
loginVK(vkURL = this.vkURL) // Авторизация с помощью vkURL
regUser(vkID = this.vkID, login = this.login, password = this.password) // Регистрация пользователя с помощью vk_id, e-mail и пароля
checkTimeOut() // Проверка на актуальность токена пользователя с его автоматическим обновлением
```

### methodsUser структура
```js
// Конструктор
this.user // Экземпляр класса authUser с пройденной авторизацией

// Методы
method(name, body = null, params = {},
    method = 'GET', version = 'v1')
    // name: Название метода API, body: отправялемые данные,
    // params: параметры в запросе (Например: news.getArticle?id=1),
    // method: метод http, version: версия API
```

<hr>
Удачного использования:) <br>
Создано: DemLoveSky