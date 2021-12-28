const express = require('express');
const router = express.Router();

const controller = require("../controllers/project");

router.post('/project', controller.inserir);
router.put('/project/:id', controller.editar);
router.delete('/project/:id', controller.deletar);
router.get('/project/:id', controller.visualizar);
router.get('/project', controller.listar);

module.exports = router;