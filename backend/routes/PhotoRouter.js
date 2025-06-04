const express = require("express");
const Photo = require("../db/photoModel");
const User = require("../db/userModel");
const mongoose = require("mongoose");
const router = express.Router();

// router.post("/", async (request, response) => {});

// router.get("/photosOfUser/:id", async (req, res) => {
//     const userId = req.params.id;

//     if (!mongoose.Types.ObjectId.isValid(userId)) {
//         return res.status(400).json({ error: "Invalid user ID format." });
//       }
//     try{
//         const user = await User.findById(userId).select(
//             "_id file_name date_time user_id"
//         )
//     };
//     if (!photo) {
//         return res.status(400).json({ error: "Photo not found." });
//       }
//       res.json(photo);
//     } catch (err) {
//       res.status(500).json({ error: "Internal server error." });
//     }
// });

router.get("/photosOfUser/:id", async (req, res) => {
  const userId = req.params.id;

  // Kiểm tra ID hợp lệ
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ error: "Invalid user ID format." });
  }

  try {
    // Kiểm tra xem user có tồn tại không
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ error: "User not found." });
    }

    // Lấy tất cả ảnh của user đó
    const photos = await Photo.find({ user_id: userId }).lean();

    // Duyệt qua từng ảnh, gán lại thông tin user trong từng comment
    for (let photo of photos) {
      for (let comment of photo.comments) {
        const commenter = await User.findById(comment.user_id)
          .select("_id first_name last_name")
          .lean();
        comment.user = commenter;
      }
    }

    res.json(photos);
  } catch (error) {
    console.error("Error in /photosOfUser/:id:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});
module.exports = router;
