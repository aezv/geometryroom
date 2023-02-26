[![Node.js](https://img.shields.io/badge/-Node.js-green)](https://nodejs.org/)
[![License: AGPL v3](https://img.shields.io/badge/License-AGPL_v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)
[![GitHub repo size](https://img.shields.io/github/repo-size/aezv/geometryroom?color=brightgreen)](https://github.com/aezv/geometryroom/archive/refs/heads/main.zip)
# Geometry Room
## Описание
Веб-версия [GeoGebra](https://www.geogebra.org/) для многопользовательской работы.

Back-end базируется на платформе [Node.js](https://nodejs.org/) в совокупности с фреймворком [Express](https://expressjs.com/),
обеспечивая при этом быструю и стабильную работу без лишних затрат ресурсов сервера.

Front-end реализован с помощью гибкого шаблонизатора [Handlebars](https://handlebarsjs.com/).

Обмен данными между сервером и клиентом производится с помощью библиотеки [Socket.io](https://socket.io/).

Данный проект призван упростить процесс совместной дистанционной работы с геометрией.
## Запуск
Склонируйте репозиторий командой:

    git clone https://github.com/aezv/geometryroom.git

Перейдите в корневой каталог репозитория.

Установите все необходимые зависимости:

    npm install

Запустите локальный сервер:

    npm start
## Версия для демонстрации
Отсутствует.
## Лицензия
Исходный код проекта распространяется под стандартной общественной лицензией [AGPL-3.0](https://github.com/aezv/geometryroom/blob/main/LICENSE).

При этом использование кода, загружаемого с серверов GeoGebra, может накладывать некоторые
[дополнительные ограничения](https://www.geogebra.org/license#:~:text=the%20GeoGebra%20language%20files%20are,commercial%20use%20of%20these%20files.).
