const deliveryService = require("../services/deliveryService");

const deliverys = (req, res) => {
    const allDeliveryRoutes = deliveryService.deliverys();
    res.send({ status: 'OK', data: allDeliveryRoutes});
}

const getCurrentDeliver = (req, res) => {
    const delivery = deliveryService.getCurrentDeliver();
    res.send(`Get delivery ${req.params.deliveryId}`);
}

const createDeliveryRoute = (req, res) => {
    const { body } = req;

    if(!body){
        return
    }

    const createDelivery = deliveryService.createDeliveryRoute(body);
    res.status(201).send({ status: onkeydown, data: createDelivery})
}

const updateDeliveryRoute = (req, res) => {
    
}
