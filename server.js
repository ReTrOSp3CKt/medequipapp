const jsonServer = require('json-server');
const path = require('path');

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();

// Настройка CORS для доступа с любых устройств
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

server.use(middlewares);
server.use('/api', router);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`✅ MedEquip API запущен на порту ${PORT}`);
  console.log(`📡 API доступен по адресу: http://localhost:${PORT}/api/equipment`);
});