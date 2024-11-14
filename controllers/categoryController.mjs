import Category from "../models/Category.mjs";

const categoryController = {
  getAllCategories: async (req, res) => {
    try {
      const categorys = await Category.find();
      res.status(200).json(categorys);
    } catch (error) {
      res.status(500).json({ error: "Lỗi khi lấy danh sách danh mục" });
    }
  },
  getCategoryById: async (req, res) => {
    try {
      const category = await Category.findById(req.params.id);
      if (!category) {
        return res.status(404).json({ error: "Danh mục không tồn tại" });
      }
      res.status(200).json(category);
    } catch (error) {
      res.status(500).json({ error: "Lỗi khi lấy danh mục" });
    }
  },
  createCategory: async (req, res) => {
    try {
      const cagegory = new Category({
        name : req.body.name
      });
      await cagegory.save();
      res.status(200).json(cagegory);
    } catch (error) {
      res.status(500).json({ error: "Lỗi khi tạo danh mục mới" });
    }
  },
  updateCategory: async (req, res) => {
    try {
      const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!category) {
        return res.status(404).json({ error: "Danh mục không tồn tại" });
      }
      res.status(200).json(category);
    } catch (error) {
      res.status(500).json({ error: "Lỗi khi cập nhật tour" });
    }
  },
  deleteCategory: async (req, res) => {
    try {
      const category = await Category.findByIdAndRemove(req.params.id);
      if (!category) {
        return res.status(404).json({ error: "Danh mục không tồn tại" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Lỗi khi xóa tour" });
    }
  },


 

};
export default categoryController;
