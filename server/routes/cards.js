const express = require("express");
const router = express.Router();
const boardController = require("./../controllers/boardsController");

router.get("/bylist/:listid", boardController.getAllBoards);
router.post("/bylist/:listid", boardController.addBoard);

router.get("/:id", boardController.getBoard);
router.put("/:id", boardController.updateBoard);
router.delete("/:id", boardController.deleteBoard);

module.exports = router;
