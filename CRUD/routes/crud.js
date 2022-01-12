const express = require('express');
const { route } = require('express/lib/application');
const router = express.Router();
const {getAllData, createData, getOneData, updateData, DeleteData} = require('../controllers/crud');

router.route('/').get(getAllData).post(createData);
router.route('/:id').get(getOneData).patch(updateData).delete(DeleteData);

module.exports = router;