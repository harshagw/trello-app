const express = require("express");
const router = express.Router();
const listController = require("./../controllers/listsController");

router.get("/byboard/:boardId", listController.getAllListByBoard);
router.post("/byboard/:boardId", listController.addListToBoard);

router.get("/:id", listController.getList);
router.put("/:id", listController.updateList);
router.delete("/:id", listController.deleteList);

module.exports = router;
