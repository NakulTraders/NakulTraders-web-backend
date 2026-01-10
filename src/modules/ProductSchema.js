const mongoose = require('mongoose')

const packeging = mongoose.Schema({
    productQuentity: { type: String },
    price: { type: Number },
    OrderUnit: { type: String, },
    bigPackagSize: { type: Number },
    bpPrice: { type: Number }
});

const ProductSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    category: {
        type: String,
        require: true
    },
    packeging: {
        type: [packeging],
        default: []
    },
    image: {
        url: {
            type: String
        },
        public_id: {
            type: String
        }
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Product', ProductSchema);