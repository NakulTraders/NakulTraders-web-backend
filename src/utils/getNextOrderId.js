import OrderIdCounter from "../modules/OrderIdCounterSchema.js";

export const getNextOrderId = async (prefix) => {
  const counter = await OrderIdCounter.findOneAndUpdate(
    {},
    { $inc: { lastOrderId: 1 } },
    { new: true, upsert: true }
  );

  // Reset after 999
  if (counter.lastOrderId > 999) {
    counter.lastOrderId = 1;
    await counter.save();
  }

  const numberPart = counter.lastOrderId.toString().padStart(3, "0");

  return `${prefix}${numberPart}`;
};
