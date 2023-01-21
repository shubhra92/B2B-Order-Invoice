const {invoice} = require('../helper_module/helper')
const moment = require('moment');
const fs = require('fs')
const { v4: uuidv4 } = require('uuid');

const invoiceDownload = async (req, res)=>{
    try {
        const {items, GT_Amount } = req.query
        const OrderId = uuidv4()
        const OrderDate = moment().format("DD-MM-YYYY")
        await invoice(JSON.parse(items), GT_Amount, OrderId, OrderDate)

        //read and send pdf
        fs.readFile(
            "src/helper_module/invoice.pdf", (err,file)=>{
            if(err)return res.send("error")
            else {
                res.setHeader("Content-Type", "application/pdf");
                res.setHeader("Content-Disposition", "attachment; filename=invoice.pdf");
                res.send(file)
            }
        }
      );
        
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message})
    }

}

module.exports= {
    invoiceDownload
}