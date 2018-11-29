const jsonServer = require('json-server');
const server = jsonServer.create();
const middlewares = jsonServer.defaults();
const path = require('path');
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const fs = require('fs');
const axios = require('axios');

function isProtected(req) {
  return (
    req.path === '/protected' && req.method === 'GET' ||
    req.path === '/profile'
  );
};

server.use(jsonServer.bodyParser)
server.use(middlewares);

server.post('/signin', (req, res, next) => {
  const {email, password} = req.body;
  const users = JSON.parse(fs.readFileSync('./server/db.json', 'utf8')).users.filter(user => user.email === email);
  if (users.length != 0) {
    if (users[0].password === password) {
      return res.status(200).json({
        message: 'Auth succeed!',
        jwt: '1314' + users[0].id
      })
    }
  }
  return res.status(401).json({
    message: 'Wrong credentials'
  });
});

server.post('/signup', (req, res, next) => {
  const {email, password, firstName, lastName} = req.body;
  const users = JSON.parse(fs.readFileSync('./server/db.json', 'utf8')).users.filter(user => user.email === email);
  if (users.length > 0) {
    return res.status(409).json({
      message: 'Such email already registered.'
    })
  } else {
    axios.post('http://localhost:8008/users', req.body).then(() => {
      res.redirect('/users');
    })
  }
});

server.get('/logout', (req, res, next) => {
  res.send({
    message: 'Succesfully logged out.'
  })
});

server.get('/profile', (req, res, next) => {
  if (req.headers.authorization && req.headers.authorization.split(' ')[1].slice(0, 4) === '1314') {
    return res.redirect('/users?id=' + req.headers.authorization.split(' ')[1].slice(4))
  } else {
    res.status(401).json({
      message: 'Not authorized.'
    })
  }
})

server.use((req, res, next) => {
  if (isProtected(req)) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[1].slice(0, 4) === '1314') {
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
