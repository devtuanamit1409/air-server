import pointStart from "../models/pointStart.mjs";
const pointStartController = {
    getAllPointstart: async (req, res) => {
        try {
          const pointstart = await pointStart.find();
          res.status(200).json(pointstart);
        } catch (error) {
          res.status(500).json(error);
        }
      },
      deletePointstart: async (req, res) => {
        try {
          const pointstart = await pointStart.findByIdAndDelete(req.params.id);
          res.status(200).json("Xoa thanh cong");
        } catch (error) {
          res.status(500).json(error);
        }
      },
      addPointStart : async(req , res) =>{
        try {
            const NewpointStart = new pointStart({
                name : req.body.name,
                img : req.body.img,
                des : req.body.des
            });
             await NewpointStart.save()
            res.status(200).json(NewpointStart)
        } catch (error) {
            res.status(500).json({ message: error });
        }
      }
}
export default pointStartController