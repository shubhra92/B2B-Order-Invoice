const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema(
    {
        item_name: {type: String, required: true},
        SKU: {type:String, required: true, unique: true},
        HSN_SAC: { type: Number, required: true },
        quantity: {type: Number, default: 1},
        Rate: {type: Number, required: true},
        Discount: { type: Number, required: true },
        CGST_P: {type: Number, required: true},
        CGST_V: {type: Number, required:true},
        SGST_P: {type: Number, required: true},
        SGST_V: {type: Number, required: true},
        Amount: {type: Number, required: true}
    },
    { timestamps: true }
)

module.exports = mongoose.model('item', itemSchema)