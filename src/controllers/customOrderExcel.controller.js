const ExcelJS = require("exceljs");
const CustomizeOrder = require('../modules/CustomizeOrderSchema')

/**
 * Download CUSTOM TEXT order as Excel
 */
exports.downloadCustomOrderExcel = async (req, res) => {
  try {
    const { id } = req.params;
    // console.log(id);
    
    // Fetch order by id
    const order = await CustomizeOrder.findById(id);
    // console.log("order : ", order);
    
    if (!order || !order.textOrder?.length) {
      return res.status(404).json({ message: "Custom order not found" });
    }

    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Custom Order Bill");

    /* ================= HEADER ================= */
    sheet.mergeCells("A1:C1");
    sheet.getCell("A1").value = "CUSTOM ORDER BILL";
    sheet.getCell("A1").font = { size: 16, bold: true };
    sheet.getCell("A1").alignment = { horizontal: "center" };

    sheet.addRow([]);
    sheet.addRow(["Firm Name", order.firmName]);
    sheet.addRow(["Phone No", order.phoneNo]);
    sheet.addRow(["City", order.city]);
    sheet.addRow(["Transportation", order.transportation]);
    sheet.addRow(["Address", order.address]);
    sheet.addRow(["GST", order.GST || "-"]);
    sheet.addRow(["Order Date", new Date(order.createdAt).toLocaleString()]);
    sheet.addRow([]);

    /* ================= TABLE ================= */
    sheet.addRow(["Sr No", "Order Description"]);
    sheet.lastRow.font = { bold: true };

    order.textOrder.forEach((item, index) => {
      sheet.addRow([index + 1, item]);
    });

    /* Auto width */
    sheet.columns.forEach(col => col.width = 30);

    /* ================= RESPONSE ================= */
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=custom_order_${order._id}.xlsx`
    );

    await workbook.xlsx.write(res);
    res.end();

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Excel download failed" });
  }
};
