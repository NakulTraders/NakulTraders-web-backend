const mongoose = require("mongoose");

const PackagingSchema = new mongoose.Schema({
    productQuentity: { type: String, required: true },
    unitPrice: { type: Number, required: true },          // product price or bpPrice
    orderUnit: { type: String, required: true },
    orderQuentity: { type: Number, required: true },
    orderPrice: { type: Number, required: true }      // orderQuantity * price
});

const ProductOrderSchema = new mongoose.Schema({
    image: { type: String },
    name: { type: String, required: true },
    productId: { type: String, required: true },
    category: { type: String },

    packaging: [PackagingSchema],                     // multiple packing types

    totalPrice: { type: Number, required: true } // sum of all packaging totalPrice
});

const OrderSchema = new mongoose.Schema({
    firmName: { type: String, required: true },
    phoneNo: { type: Number, required: true },
    city: { type: String, required: true },
    transportation: { type: String, required: true },
    GST: { type: String,  },
    address: { type: String },
    
    orderId: {type: String, required: true, unique: true,}, // order id

    productOrders: [ProductOrderSchema],               // list of all products in order

    totalBill: { type: Number, required: true },        // sum(product amounts + transportation)
    orderStatus: { type: String, enum:["pending","accept","rejact"] , default:"pending" }        // sum(product amounts + transportation)
}, { timestamps: true });

module.exports = mongoose.model("Order", OrderSchema);
