const express = require("express");
const router = express.Router();
const interviewController = require("../controlleur/interviewController.js");

// Create a new interview
router.post("/", interviewController.createInterview);

// Get all interviews
router.get("/", interviewController.getAllInterviews);

// Get available time slots
router.get("/slots", interviewController.getAvailableSlots);

// Get interview by ID
router.get("/:id", interviewController.getInterviewById);

// Update interview
router.put("/:id", interviewController.updateInterview);

// Delete interview
router.delete("/:id", interviewController.deleteInterview);

router.post("/send_refus_email", interviewController.sendRefusEmail);

module.exports = router;
