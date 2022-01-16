Создан на локальной основе, все действия не могут скачиваться с npm install RandomColorEmbed

Извлекать модуль RandomColorEmbed лучше НЕ в node-module

Версия 0.0.3
При обновлении будет больше функций
Обращаться в дискорд сервер
https://discord.gg/xzWKwsU

Ютуб канал, на видосы
https://youtu.be/-OkeWg69Zx4

Инструкция примеров

```js
const colorEmbed = require("./RandomColorEmbed/index.js");

console.log(colorEmbed.default_());
console.log(colorEmbed.white());
console.log(colorEmbed.aqua());
console.log(colorEmbed.green());
console.log(colorEmbed.blue());
console.log(colorEmbed.yellow());
console.log(colorEmbed.purple());
console.log(colorEmbed.luminous_vivid_pink());
console.log(colorEmbed.gold());
console.log(colorEmbed.orange());
console.log(colorEmbed.red());
console.log(colorEmbed.grey());
console.log(colorEmbed.navy());
console.log(colorEmbed.dark_aqua());
console.log(colorEmbed.dark_green());
console.log(colorEmbed.dark_blue());
console.log(colorEmbed.dark_purple());
console.log(colorEmbed.dark_vivid_pink());
console.log(colorEmbed.dark_gold());
console.log(colorEmbed.dark_orange());
console.log(colorEmbed.dark_red());
console.log(colorEmbed.dark_grey());
console.log(colorEmbed.darker_grey());
console.log(colorEmbed.light_grey());
console.log(colorEmbed.dark_navy());
console.log(colorEmbed.blurple());
console.log(colorEmbed.greyple());
console.log(colorEmbed.dark_but_not_black());
console.log(colorEmbed.not_quite_black());
console.log(colorEmbed.randomColor()); //абсолютный рандом цветов
console.log(colorEmbed.lengthColor()); //Последовательный рандом цветов
//Все это обычный массив, из букв.
```
```js
//Рандом массивов, сделан чтобы в каждой команде не ебаться. или не использовать глобалку
const colorEmbed = require("./RandomColorEmbed/index.js");

console.log(`${colorEmbed.randomColor()}`);
console.log(`${colorEmbed.lengthColor()}`);
```
