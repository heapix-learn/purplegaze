const jsonServer = require('json-server');
const server = jsonServer.create();
const middlewares = jsonServer.defaults();
const path = require('path');
const router = jsonServer.router(path.join(__dirname, 'db.json'));

function isProtected(req) {
  return req.path === '/protected' && req.method === 'GET';
};

server.use(middlewares);
server.use((req, res, next) => {
  if (isProtected(req)) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[1] === '1314') {
      next();
    } else {
      return res.status(401).json({
        message: 'Access denied',
      });
    };
  } else {
    next();
  }
});

server.use(router);
server.listen(8008, () => {
  console.log('JSON Server is running')
});
