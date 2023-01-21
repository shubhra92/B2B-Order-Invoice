const itemModel = require("../models/itemModel.js");
const fs = require("fs");
const pdf = require("pdfkit");
const path = require("path");
const { getPdf } = require("../helper_module/helper.js");


//---------- ADD item ----------------
const addItem = async (req, res) => {
  try {
    const data = req.body;

    //adding process
    const itemData = await itemModel.create(data);

    //send response
    return res.status(201).send({ status: true, data: itemData });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};


//------------- FETCH ALL items ------------------
const getItems = async (_, res) => {
  try {
    //fetch all items
    const allItems = await itemModel.find();

    //send response
    res.status(200).send({ status: true, data: allItems });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};


//-------------- Genarate PDF ------------------
const getAllItemsPdf = async (_, res) => {
  try {
    //createing invoice pdf
    await getPdf();

    //read and send pdf
    fs.readFile(
      "src/helper_module/invoice.pdf",(err,file)=>{
        if(err)return res.send("error")
        else {
            res.setHeader("Content-Type", "application/pdf");
            res.setHeader("Content-Disposition", "attachment; filename=AllItems.pdf");
            res.send(file)
        }
      }
    );
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

//export all handellers
module.exports = {
  addItem,
  getItems,
  getAllItemsPdf
};
