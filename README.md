# CV Generator (A4, 2 колонки)

Публичная версия: https://the-mushroom-that-killed-mario.github.io/

Статический проект для рендера резюме из `data.json`:
- десктоп: пагинация в A4-страницы;
- мобильная версия: линейный поток блоков;
- кнопка `Бахнуть`: фоновое видео поверх текста.

## Структура проекта

```text
.
├─ index.html
├─ data.json
├─ img.png
├─ start.bat
├─ assets/
│  ├─ css/
│  │  └─ styles.css
│  ├─ js/
│  │  ├─ app.js
│  │  ├─ blocks.js
│  │  ├─ dom.js
│  │  ├─ mobile.js
│  │  └─ pagination.js
│  └─ explosion_hd.mp4
└─ .github/workflows/static.yml
```

## Что за что отвечает

- `index.html` - корневая разметка, контейнеры рендера, подключение CSS/JS.
- `data.json` - данные резюме (контакты, навыки, опыт, образование).
- `assets/js/app.js` - инициализация, загрузка `data.json`, переключение mobile/desktop, обработка печати.
- `assets/js/blocks.js` - сборка DOM-блоков левой и правой колонок.
- `assets/js/pagination.js` - разбиение блоков по A4-страницам.
- `assets/js/mobile.js` - рендер мобильного потока.
- `assets/js/dom.js` - базовые DOM-утилиты.
- `assets/css/styles.css` - стили экрана и печати.
- `start.bat` - локальный запуск через `py -m http.server 8000`.
- `.github/workflows/static.yml` - деплой на GitHub Pages при пуше в `master`.


## Как обновить CV

1. Изменить `data.json`.
2. При необходимости заменить `img.png`.
3. Закоммитить и запушить в `master` - GitHub Pages обновится через workflow.
