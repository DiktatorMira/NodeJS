import http from 'http';
import fs from 'fs/promises';
import { parse } from 'querystring';

const server = http.createServer(async (req, res) => {
    if (req.url === '/') {
      if (req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`
          <form action="/" method="post">
            <input type="text" name="name" placeholder="Имя" required><br>
            <input type="email" name="email" placeholder="Email" required><br>
            <input type="password" name="pwd" placeholder="Пароль" required><br>
            <input type="submit" value="Отправить">
          </form>
        `);
      } else if (req.method === 'POST') {
        let body = '';
        for await (const chunk of req) {
          body += chunk.toString();
        }
        const formData = parse(body);
        const data = JSON.stringify(formData) + '\n';
        
        try {
          await fs.appendFile('data.txt', data);
          res.writeHead(201, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(formData));
        } catch (err) {
          console.error('Ошибка при записи в файл:', err);
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Внутренняя ошибка сервера');
        }
      }
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
    }
  });
  
  const PORT = 3000;
  server.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}/`);
  });