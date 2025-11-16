const fetch = require("node-fetch");

// Функция для получения данных из API
async function fetchDocuments() {
  try {
    const response = await fetch("https://tenderai.kz/api/documents");

    if (!response.ok) {
      throw new Error(`HTTP ошибка! статус: ${response.status}`);
    }

    const data = await response.json();
    return Array.isArray(data) ? data : [data];
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
    return null;
  }
}

// Функция для генерации HTML
function generateHTML(documents) {
  const currentTime = new Date().toLocaleString("ru-RU", {
    timeZone: "Asia/Almaty",
  });
  const documentCount = documents ? documents.length : 0;

  let documentsHTML = "";

  if (documents && documents.length > 0) {
    documentsHTML = documents
      .map(
        (doc, index) => `
        <div class="document-item">
            <h3>Документ #${index + 1}</h3>
            <pre>${JSON.stringify(doc, null, 2)}</pre>
        </div>
        `
      )
      .join("");
  } else {
    documentsHTML = '<p class="no-data">Нет данных для отображения</p>';
  }

  const html = `<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Документы из API</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f5f5f5;
        }
        h1 {
            color: #333;
        }
        .info {
            background-color: #e3f2fd;
            padding: 15px;
            border-radius: 4px;
            margin: 20px 0;
        }
        .count {
            color: #666;
            margin: 10px 0;
            font-weight: bold;
        }
        #data-container {
            background-color: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .document-item {
            border-bottom: 1px solid #eee;
            padding: 15px 0;
        }
        .document-item:last-child {
            border-bottom: none;
        }
        .document-item h3 {
            color: #1976d2;
            margin-top: 0;
        }
        pre {
            background-color: #f5f5f5;
            padding: 10px;
            border-radius: 4px;
            overflow-x: auto;
            font-size: 14px;
        }
        .no-data {
            text-align: center;
            padding: 40px;
            color: #999;
            font-size: 18px;
        }
        .update-time {
            color: #666;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <h1>Документы из API</h1>
    
    <div class="info">
        <p class="update-time">Последнее обновление: ${currentTime}</p>
        <p class="count">Всего документов: ${documentCount}</p>
    </div>

    <div id="data-container">
        ${documentsHTML}
    </div>
</body>
</html>`;

  return html;
}

// Serverless функция для Vercel
module.exports = async (req, res) => {
  console.log(
    `[${new Date().toISOString()}] Обновление данных через Vercel Cron...`
  );

  const documents = await fetchDocuments();
  const html = generateHTML(documents);

  // Отправляем HTML как ответ
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.status(200).send(html);
};
