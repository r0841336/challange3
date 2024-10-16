const express = require("express");
const router = express.Router();
const messageController = require("../../../controllers/api/v1/messages");

router.post("/", messageController.create); // Create a new message
router.get("/", messageController.index); // Get all messages
router.get("/:id", messageController.show); // Get a specific message by ID
router.get("/user", messageController.getMessagesOfUser); // Get messages by username
router.put("/:id", messageController.update); // Update a specific message by ID
router.delete("/:id", messageController.deleteMessage); // Delete a message by ID

module.exports = router;
