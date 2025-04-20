const express = require('express');
const router = express.Router();
const controller = require('../controlleur/ChefRecrutementController');

router.post('/registerChef', controller.registerChef);
router.post('/loginChef', controller.loginChef);
router.get('/chefs', controller.getAll);
router.delete('/chefs/:id', controller.deleteChef);

module.exports = router;
