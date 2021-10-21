Создан на локальной основе, все действия не могут скачиваться с npm install RandomColorEmbed

Извлекать модуль RandomColorEmbd лучше НЕ в node-module

Версия 0.0.2
При обновлении будет больше функций
Обращаться в дискорд сервер
https://discord.gg/xzWKwsU

Ютуб канал, на видосы
https://youtu.be/-OkeWg69Zx4

Инструкция примеров

```js
const colors = require("./RandomColorEmbed/index.js");

console.log(`${colors.ColorBlue()}`);
console.log(`${colors.ColorGreen()}`);
console.log(`${colors.ColorYellow()}`);
console.log(`${colors.ColorRed()}`);
console.log(`${colors.ColorOrange()}`);
//Все это обычный массив, из букв.
```
```js
//Рандом массивов, сделано чтобы в каждой команде не ебаться. или не использовать глобалку
const colors = require("./RandomColorEmbed/index.js");

console.log(`${colors.randomColor()}`);
```
