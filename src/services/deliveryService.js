const { v4: uuid } = require('uuid');
const deliver = require("../dataBase/db.json");

const deliverys = () => {
    return deliver.deliverys();
}

const getCurrentDeliver = () => {
    return;
}

const createDeliveryRoute = (newDelivery) => {
    const deliveryToPost = {
        ...newDelivery,
        id: uuid(),
        createdAt: new Date().toLocaleString('en-US', { timezone: 'UTC'}),
        updatedAt: new Date().toLocaleString('en-US', { timezone: 'UTC'}),
    }

    return deliver.createDelivery(deliveryToPost); 
}