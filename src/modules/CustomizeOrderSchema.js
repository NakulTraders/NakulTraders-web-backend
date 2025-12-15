const mongoose = require('mongoose')

const CustomizeOrderSchema = new mongoose.Schema({
    firmName: { type: String, required: true },
    phoneNo: { type: String, required: true },
    city: { type: String, required: true },
    transportation: { type: String, required: true },
    GST: { type: String,  },
    address: { type: String },

    textOrder: [{type:String , required:true}],               // list of all products in order

    orderStatus: { type: String, enum:["pending","accept","reject"] , default:"pending" }        // sum(product amounts + transportation)
}, { timestamps: true });

module.exports = mongoose.model("CustomizeOrder", CustomizeOrderSchema);