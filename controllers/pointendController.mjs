import endPoint from "../models/PointEnd.mjs";
const pointEndController = {
    getAllPointend: async (req, res) => {
        try {
          const pointend = await endPoint.find();
          res.status(200).json(pointend);
        } catch (error) {
          res.status(500).json(error);
        }
      },
      deletePointend: async (req, res) => {
        try {
          const pointend = await endPoint.findByIdAndDelete(req.params.id);
          res.status(200).json("Xoa thanh cong");
        } catch (error) {
          res.status(500).json(error);
        }
      },
      addPointEnd : async(req , res) =>{
        try {
            const NewpointEnd = new endPoint({
              name : req.body.name,
              img : req.body.img,
              des : req.body.des
            });
             await NewpointEnd.save()
            res.status(200).json(NewpointEnd)
        } catch (error) {
            res.status(500).json({ message: error });
        }
      }
}
export default pointEndController