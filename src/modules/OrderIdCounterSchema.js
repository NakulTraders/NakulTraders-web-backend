import mongoose from "mongoose";

const OrderIdCounterSchema = new mongoose.Schema({
  lastOrderId: {
    type: Number,
    default: 0,
  },
});

export default mongoose.model("OrderIdCounter", OrderIdCounterSchema);
