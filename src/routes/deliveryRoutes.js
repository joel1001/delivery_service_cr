const express = require('express');
const router = express.Router();
const deliveryController = require('../controllers/deliveryController');

router
.get('/', deliveryController.deliverys)
.get('/:deliveryId', deliveryController.getCurrentDeliver)
.post('/', deliveryController.createDeliveryRoute)
.patch('/:deliveryId', deliveryController.updateDeliveryRoute)
.delete('/:deliveryId', deliveryController.deleteDeliveryRoute);

module.exports = router