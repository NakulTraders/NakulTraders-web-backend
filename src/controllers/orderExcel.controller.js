const ExcelJS = require("exceljs");
const Order = require("../modules/OrderSchema");

/**
 * Download SINGLE ORDER as Excel (Bill format)
 * @route GET /api/orders/:id/download/excel
 */
exports.downloadSingleOrderExcel = async (req, res) => {
  try {
    const { id } = req.params;
    // console.log("order id :", id);
    

    // Fetch single order by ID
    const order = await Order.findById(id).lean();
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Create workbook & worksheet
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Order Bill");

    let row = 1; // Track row index manually

    // ===============================
    // 🔹 BILL TITLE
    // ===============================
    sheet.mergeCells(`A${row}:F${row}`);
    sheet.getCell(`A${row}`).value = "ORDER BILL / INVOICE";
    sheet.getCell(`A${row}`).font = { bold: true, size: 16 };
    sheet.getCell(`A${row}`).alignment = { horizontal: "center" };
    row += 2;

    // ===============================
    // 🔹 ORDER HEADER DETAILS
    // ===============================
    const addHeaderRow = (label, value) => {
      sheet.getCell(`A${row}`).value = label;
      sheet.getCell(`B${row}`).value = value;
      sheet.getCell(`A${row}`).font = { bold: true };
      row++;
    };

    addHeaderRow("Firm Name", order.firmName);
    addHeaderRow("Phone No", order.phoneNo);
    addHeaderRow("City", order.city);
    addHeaderRow("Transportation", order.transportation);
    addHeaderRow("Address", order.address);
    addHeaderRow("Order Date", new Date(order.createdAt).toLocaleDateString());

    row += 2;

    // ===============================
    // 🔹 TABLE HEADER (PRODUCTS)
    // ===============================
    sheet.addRow([
      "Product Name",
      "Product Quantity",
      "Unit",
      "Unit Price",
      "Order Quantity",
      "Amount"
    ]);

    sheet.getRow(row).font = { bold: true };
    row++;

    // ===============================
    // 🔹 PRODUCT ROWS
    // ===============================
    order.productOrders.forEach(product => {
      product.packaging.forEach(pack => {
        sheet.addRow([
          product.name,
          pack.productQuentity,
          pack.orderUnit,
          pack.unitPrice,
          pack.orderQuentity,
          pack.orderPrice
        ]);
        row++;
      });
    });

    row += 1;

    // ===============================
    // 🔹 TOTAL BILL
    // ===============================
    sheet.mergeCells(`A${row}:E${row}`);
    sheet.getCell(`A${row}`).value = "TOTAL BILL AMOUNT";
    sheet.getCell(`A${row}`).font = { bold: true };
    sheet.getCell(`F${row}`).value = order.totalBill;
    sheet.getCell(`F${row}`).font = { bold: true };

    // ===============================
    // 🔹 COLUMN WIDTH
    // ===============================
    sheet.columns = [
      { width: 25 },
      { width: 18 },
      { width: 12 },
      { width: 15 },
      { width: 15 },
      { width: 15 }
    ];

    // ===============================
    // 🔹 RESPONSE HEADERS
    // ===============================
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=order_${order._id}.xlsx`
    );

    await workbook.xlsx.write(res);
    res.end();

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to download order Excel" });
  }
};
