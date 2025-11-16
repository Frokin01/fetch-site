# Генератор HTML из API для Vercel

Этот проект автоматически получает данные из API и генерирует HTML страницу каждые 10 минут с помощью Vercel Cron Jobs.

## Быстрый деплой на Vercel

### Вариант 1: Через GitHub

1. Загрузите проект в GitHub репозиторий
2. Зайдите на [vercel.com](https://vercel.com)
3. Нажмите "Add New" → "Project"
4. Импортируйте ваш GitHub репозиторий
5. Нажмите "Deploy"

### Вариант 2: Через Vercel CLI

```bash
npm i -g vercel
vercel
```

## Как это работает

- **Vercel Cron Jobs**: автоматически запускает `/api/update` каждые 10 минут
- **Serverless Function**: `/api/update.js` получает данные из API и генерирует HTML
- **Без базы данных**: все работает на serverless функциях
- **Автоматическое обновление**: данные обновляются каждые 10 минут

## Структура проекта

```
├── api/
│   └── update.js        # Serverless функция для получения и генерации HTML
├── index.html           # Главная страница (перенаправляет на /api/update)
├── vercel.json          # Конфигурация Vercel Cron Jobs
├── package.json         # Зависимости проекта
└── README.md           # Документация
```

## Настройка

Cron расписание настраивается в `vercel.json`:

```json
{
  "crons": [
    {
      "path": "/api/update",
      "schedule": "*/10 * * * *"
    }
  ]
}
```

Формат cron: `*/10 * * * *` = каждые 10 минут

## Доступ к странице

После деплоя:

- Главная страница: `https://your-project.vercel.app/`
- API endpoint: `https://your-project.vercel.app/api/update`

Оба URL показывают одинаковый контент с актуальными данными.

## Требования

- Аккаунт на Vercel (бесплатный план подходит)
- Для Cron Jobs нужна подписка на Vercel Pro (или Hobby plan с ограничениями)

**Примечание**: На бесплатном Hobby плане Vercel Cron Jobs имеют ограничения. Если нужна гарантированная работа каждые 10 минут, рекомендуется использовать платный план или внешний сервис для триггера (например, cron-job.org вызывающий `/api/update`).
