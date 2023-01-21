
//Required package
var pdf = require("pdf-creator-node");
var fs = require("fs");
const itemModel = require("../models/itemModel");
const moment = require("moment");

// Read HTML Template
const html = fs.readFileSync("src/helper_module/template.html", "utf8");
const invoice_html = fs.readFileSync("src/helper_module/invoice_template.html", "utf8")

var options = {
  format: "A4",
  orientation: "portrait",
  border: "5mm",
  footer: {
    height: "5mm",
    contents: {
        first: '<hr/>',
    }
}
};

const document = {
  data:{},
  path: "src/helper_module/invoice.pdf",
  type: "",
};

exports.getPdf = async()=> {
  document.html=html
  document.data.items = await itemModel.find().lean()
await pdf.create(document, options)
}

exports.invoice = async(data, GT_Amount, OrderId, OrderDate)=>{
  document.html=invoice_html
  document.data.items = data
  document.data.OrderId = OrderId
  document.data.OrderDate = OrderDate
  document.data.GT_Amount = GT_Amount
  document.data.InvoiceDate = moment().format("DD-MM-YYYY")

  await pdf.create(document, options)
}
