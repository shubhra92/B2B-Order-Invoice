const { invoiceDownload } = require('../controllers/invoiceDownlod');
const { addItem, getItems, getAllItemsPdf } = require('../controllers/itemController');
const route = require('express').Router();

//item
route.route("/item")
    .post(addItem)
    .get(getItems)

//invoice
route.get('/pdf', getAllItemsPdf)
route.get('/invoice', invoiceDownload)


module.exports = route