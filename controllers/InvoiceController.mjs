import invoice from "../models/invoice.mjs";

const invoiceController = {
    getAll: async (req, res) => {
        try {
            const invoices = await invoice.find();
            res.status(200).json(invoices);
        } catch (error) {
            res.status(500).json({ error: "Lỗi khi lấy danh sách hoá đơn", message: error.message });
        }
    },

    createInvoice: async (req, res) => {
        try {
            // Tạo instance mới của model invoice
            const newInvoice = new invoice({
                idOrder: req.body.idOrder,
                nameCustomer: req.body.nameCustomer,
                addressCustomer: req.body.addressCustomer,
                phoneCustomer: req.body.phoneCustomer,
                emailCustomer: req.body.emailCustomer,
                nameTour: req.body.nameTour,
                oldGuest: req.body.oldGuest,
                childGuest: req.body.childGuest,
                total: req.body.total
            });

            // Lưu invoice vào database
            const savedInvoice = await newInvoice.save();
            res.status(200).json(savedInvoice);
        } catch (error) {
            // Trả về thông tin chi tiết về lỗi
            res.status(500).json({ error: "Lỗi khi tạo hoá đơn mới", message: error.message });
        }
    },
};

export default invoiceController;
