import Tour from "../models/Tour.mjs";
import Category from "../models/Category.mjs";
import User from "../models/User.mjs";
const tourController = {
  getAllTour: async (req, res) => {
    try {
      const tour = await Tour.find();
      res.status(200).json(tour);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },
  createTour: async (req, res) => {
    try {
      // Lấy thông tin từ request body
      const {
        name,
        time,
        dateStart,
        locationStart,
        plant,
        maxGuest,
        oldGuest,
        childGuest,
        locationEnd,
        des,
        childrenPrice,
        oldPrice,
        detail,
        imgDetail,
        detailLocation,
        category,
      } = req.body;

      // Tạo một instance của Tour model
      const newTour = new Tour({
        name,
        time,
        dateStart,
        locationStart,
        plant,
        maxGuest,
        oldGuest,
        childGuest,
        locationEnd,
        des,
        childrenPrice,
        oldPrice,
        detail,
        imgDetail,
        detailLocation,
        category,
      });

      // Lưu tour mới vào cơ sở dữ liệu
      const savedTour = await newTour.save();

      // Trả về response thành công
      res.status(200).json({ success: true, tour: savedTour });
    } catch (error) {
      // Xử lý lỗi nếu có
      console.error(error);
      res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  },
  getTourbyIdCategory: async (req, res) => {
    try {
      const categoryId = req.params.categoryId; // Lấy categoryId từ đường dẫn

      // Kiểm tra xem categoryId có hợp lệ không
      // (Điều này phụ thuộc vào cách bạn thiết kế cơ sở dữ liệu và logic xử lý)
      // Ví dụ: Kiểm tra xem categoryId có tồn tại trong cơ sở dữ liệu không
      const isValidCategory = await Category.findById(categoryId);
      if (!isValidCategory) {
        return res.status(400).json({ success: false, error: 'Danh mục không tồn tại' });
      }

      // Lấy tất cả các tour thuộc danh mục có ID là categoryId
      const tours = await Tour.find({ category: categoryId });

      // Trả về danh sách tour
      res.status(200).json({ success: true, tours });
    } catch (error) {
      // Xử lý lỗi nếu có
      console.error(error);
      res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  },
  getOneTour: async (req, res) => {
    try {
      const tourId = req.params.tourId; // Lấy tourId từ đường dẫn

      // Kiểm tra xem tourId có hợp lệ không
      // (Điều này phụ thuộc vào cách bạn thiết kế cơ sở dữ liệu và logic xử lý)
      // Ví dụ: Kiểm tra xem tourId có tồn tại trong cơ sở dữ liệu không
      // const isValidTour = await Tour.findById(tourId);
      // if (!isValidTour) {
      //   return res.status(404).json({ success: false, error: 'Tour không tồn tại' });
      // }

      // Lấy chi tiết của một tour dựa trên ID của tour
      const tour = await Tour.findById(tourId);

      // Kiểm tra xem tour có tồn tại hay không
      if (!tour) {
        return res
          .status(404)
          .json({ success: false, error: "Tour không tồn tại" });
      }

      // Trả về chi tiết của tour
      res.status(200).json({ success: true, tour });
    } catch (error) {
      // Xử lý lỗi nếu có
      console.error(error);
      res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  },
  updateTour: async (req, res) => {
    try {
      const tourId = req.params.tourId; // Lấy tourId từ đường dẫn

      const {
        name,
        time,
        dateStart,
        locationStart,
        plant,
        maxGuest,
        oldGuest,
        childGuest,
        locationEnd,
        des,
        childrenPrice,
        oldPrice,
        detail,
        imgDetail,
        detailLocation,
        category,
        status,
        idGuide,
      } = req.body;

      // Cập nhật thông tin của tour
      const updatedTour = await Tour.findByIdAndUpdate(
        tourId,
        {
          name,
          time,
          dateStart,
          locationStart,
          plant,
          maxGuest,
          oldGuest,
          childGuest,
          locationEnd,
          des,
          childrenPrice,
          oldPrice,
          detail,
          imgDetail,
          detailLocation,
          category,
          status,
          idGuide,
        },
        { new: true } // Trả về tour đã cập nhật thay vì tour gốc
      );

      // Kiểm tra xem tour có tồn tại hay không
      if (!updatedTour) {
        return res
          .status(404)
          .json({ success: false, error: "Tour không tồn tại" });
      }

      // Trả về thông tin của tour sau khi cập nhật
      res.status(200).json({ success: true, tour: updatedTour });
    } catch (error) {
      // Xử lý lỗi nếu có
      console.error(error);
      res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  },
  deleteTour: async (req, res) => {
    try {
      const tourId = req.params.tourId; // Lấy tourId từ đường dẫn

      // Kiểm tra xem tourId có hợp lệ không
      // (Điều này phụ thuộc vào cách bạn thiết kế cơ sở dữ liệu và logic xử lý)
      // Ví dụ: Kiểm tra xem tourId có tồn tại trong cơ sở dữ liệu không
      // const isValidTour = await Tour.findById(tourId);
      // if (!isValidTour) {
      //   return res.status(404).json({ success: false, error: 'Tour không tồn tại' });
      // }

      // Xóa tour dựa trên ID của tour
      const deletedTour = await Tour.findByIdAndDelete(tourId);

      // Kiểm tra xem tour có tồn tại hay không
      if (!deletedTour) {
        return res
          .status(404)
          .json({ success: false, error: "Tour không tồn tại" });
      }

      // Trả về thông báo xóa thành công
      res
        .status(200)
        .json({ success: true, message: "Tour đã được xóa thành công" });
    } catch (error) {
      // Xử lý lỗi nếu có
      console.error(error);
      res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  },
  addIdGuide: async (req, res) => {
    try {
      const tourId = req.params.tourId; // Lấy tourId từ đường dẫn

      // Kiểm tra xem tourId có hợp lệ không
      // (Điều này phụ thuộc vào cách bạn thiết kế cơ sở dữ liệu và logic xử lý)
      // Ví dụ: Kiểm tra xem tourId có tồn tại trong cơ sở dữ liệu không
      // const isValidTour = await Tour.findById(tourId);
      // if (!isValidTour) {
      //   return res.status(404).json({ success: false, error: 'Tour không tồn tại' });
      // }

      // Lấy giá trị idGuide từ request body
      const { idGuide } = req.body;

      // Cập nhật thông tin của tour, bao gồm cả trường idGuide
      const updatedTour = await Tour.findByIdAndUpdate(
        tourId,
        { idGuide },
        { new: true } // Trả về tour đã cập nhật thay vì tour gốc
      );

      // Kiểm tra xem tour có tồn tại hay không
      if (!updatedTour) {
        return res
          .status(404)
          .json({ success: false, error: "Tour không tồn tại" });
      }

      // Trả về thông tin của tour sau khi cập nhật
      res.status(200).json({ success: true, tour: updatedTour });
    } catch (error) {
      // Xử lý lỗi nếu có
      console.error(error);
      res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  },
  getTourbyIdguide: async (req, res) => {
    try {
      const idGuide = req.params.idguide;
      const tour = await Tour.findOne({ idGuide: idGuide });

      if (!tour) {
        return res.status(400).json({ error: "Hướng dẫn viên không tồn tại" });
      }

      res.status(200).json(tour);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  // Xử lý cập nhật trạng thái tour trên server
  updateTourStatus: async (req, res) => {
    try {
      const tourId = req.params.tourId;
      const { status } = req.body;

      // Định nghĩa các trạng thái hợp lệ cho tour ngay trong hàm này
      const tourStatuses = ['pending', 'start', 'middle', 'completed', 'cancelled'];

      // Kiểm tra trạng thái có hợp lệ không
      if (!tourStatuses.includes(status)) {
        return res.status(400).json({ success: false, error: "Trạng thái không hợp lệ" });
      }

      // Cập nhật trạng thái của tour
      const updatedTour = await Tour.findByIdAndUpdate(
        tourId,
        { status },
        { new: true }
      );

      if (!updatedTour) {
        return res.status(404).json({ success: false, error: "Tour không tồn tại" });
      }

      res.status(200).json({ success: true, tour: updatedTour });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  },
};
export default tourController;
