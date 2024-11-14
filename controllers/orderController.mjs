import Order from "../models/Order.mjs";
import Tour from "../models/Tour.mjs";
const orderController = {
  getAllOrders: async (req, res) => {
    try {
      const orders = await Order.find();
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ error: "Lỗi khi lấy danh sách đơn hàng" });
    }
  },
  getOrderById: async (req, res) => {
    try {
      const order = await Order.findById(req.params.id);
      if (!order) {
        return res.status(404).json({ error: "Đơn hàng không tồn tại" });
      }
      res.status(200).json(order);
    } catch (error) {
      res.status(500).json({ error: "Lỗi khi lấy đơn hàng" });
    }
  },
  updateOrderStatus: async (req, res) => {
    try {
      const { status } = req.body;

      if (status === undefined || typeof status !== "boolean") {
        return res.status(400).json({ error: "Trạng thái không hợp lệ" });
      }
      const order = await Order.findByIdAndUpdate(
        req.params.id,
        { status },
        { new: true }
      );
      if (!order) {
        return res.status(404).json({ error: "Đơn hàng không tồn tại" });
      }
      console.log(order.customerInfo[0].full_name);
      // Lưu idUser vào listCustomer của các tour trong cart
      await Promise.all(
        order.cart.map(async (item) => {
          const tour = await Tour.findById(item.id);

          if (tour) {
            // Kiểm tra xem full_name đã tồn tại trong danh sách khách hàng chưa
            const customerFullName = order.customerInfo[0]
              ? order.customerInfo[0].full_name
              : null;

            if (
              customerFullName &&
              !tour.listCustomer.includes(customerFullName)
            ) {
              // Nếu chưa tồn tại, thêm full_name vào danh sách khách hàng
              tour.listCustomer.push(customerFullName);
              // Lưu lại tour sau khi cập nhật
              await tour.save();
            }
          }
        })
      );

      res.status(200).json(order);
    } catch (error) {
      res
        .status(500)
        .json({
          error: "Lỗi khi cập nhật trạng thái đơn hàng và danh sách khách hàng",
        });
    }
  },
  deleteOrder: async (req, res) => {
    try {
      const order = await Order.findByIdAndRemove(req.params.id);
      if (!order) {
        return res.status(404).json({ error: "Đơn hàng không tồn tại" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Lỗi khi xóa đơn hàng" });
    }
  },
  registerTour: async (req, res) => {
    try {
      const newTour = new Order({
        cart: req.body.cart,
        idUser: req.body.idUser,
        customerInfo: req.body.customerInfo,
        payment_method: req.body.payment_method,
      });

      const order = await newTour.save();
      res.status(200).json(order);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error });
    }
  },
  getOrderByIdUser: async (req, res) => {
    try {
      const userId = req.params.userId; // Giả sử bạn truyền userId qua tham số đường dẫn, bạn có thể điều chỉnh tùy vào cách bạn truyền dữ liệu.

      const orders = await Order.find({ idUser: userId });

      if (!orders || orders.length === 0) {
        return res
          .status(404)
          .json({ error: "Không tìm thấy đơn hàng cho người dùng này" });
      }

      res.status(200).json(orders);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Lỗi khi lấy đơn hàng của người dùng" });
    }
  },
  cancleOrderById: async (req, res) => {
    try {
      const order = await Order.findById(req.params.id);
      if (!order) {
        return res.status(404).json({ error: "Đơn hàng không tồn tại" });
      }
      if (order.status == false) {
        // Xóa đơn hàng
        await Order.deleteOne({ _id: req.params.id });
        return res
          .status(200)
          .json({ message: "Đơn hàng đã được xóa thành công" });
      }
      return res
        .status(400)
        .json({ error: "Không thể xóa đơn hàng vì trạng thái không phù hợp" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Lỗi khi xóa đơn hàng" });
    }
  },
};
export default orderController;
