## Измения ###
  * Переводчик может испортить русский текст :з
  # Обновление создания шаблон ботов
  + Теперь первые шаблон боты, будут использоваться без доп.хери которая добавлялась в старые версии шаблонов. Для того чтобы вы насладились чистым ботом, а не засраным кодом
  # Обновление шаблон бота
  + Изменение файла functions.js убран не нужный код с работой памятью, добавлен новый таймер. Так-же теперь можете увидеть комментарий, как пользоваться функциями. Которые будут добавляться
  + Добавлены слеш команды, теперь можно использовать глобально и не глобально, тоесть можете использовать слеш команды только для команды, либо глобально писав в ивент interactionCreate в файле bot.js

## Запуск
  1. Регистрируем бота на [discord developers](https://discord.com/developers/applications) 
  2. В файле `config.ini` в строчке `token` пишем токен бота
  3. В строчке `prefix` пишем префикс
  4. В строчке `user` по желанию можете поменять на свой ник

## Создание команды ##

```js
const functions = require("../lib/functions.js");
module.exports.run = async (bot,message,args,user) => {
    message.channel.send(timer(client.uptime));
};
module.exports.interaction = (client,interaction) => {}; //Работает отдельно, от глобальных слеш команд
module.exports.help = {
    name: "test",
    "slash": {
        name: "test",
        description: "Это команда для тестов"
    }
}
```

### Параметры ###
| Переменная | Описание                                  |
| ---------- | ----------------------------------------- |
| client     | клиент под которым залогинен бот          |
| message    | обьект отправленного сообщения            |
| args       | массив с указаными аргументами            |
| user       | берёт айди у упомянутого, или у сообщения |

## Баги ##
  + При указании неправильного токена бот выдает ошибку

## 