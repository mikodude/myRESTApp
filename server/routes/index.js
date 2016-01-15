var experss = require('express');
var router = express.Router();

var auth = require('./auth.js');
var products = require('./products.js');
var user = require('./users.js');

router.post('/login', auth.login);

router.get('/api/v1/products', products.getAll);
router.get('/api/v1/product/:id', products.getOne);
router.post('/api/v1/product/', products.create);
router.put('/api/v1/product/:id', products.update);
router.delete('/api/v1/product/:id', products.delete);

router.get('/api/v1/admin/users', products.getAll);
router.get('/api/v1/admin/user/:id', products.getOne);
router.post('/api/v1/admin/user/', products.create);
router.put('/api/v1/admin/user/:id', products.update);
router.delete('/api/v1/admin/user/:id', products.delete);
