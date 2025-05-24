const Interview = require("../models/Interview");
const Candidature = require("../models/Candidature");
const {
  sendInterviewEmail,
  sendRefusEmail,
} = require("../services/emailServices.js");

// Create a new interview
exports.createInterview = async (req, res) => {
  console.log(req.body);
  try {
    const {
      candidate_email,
      candidature_id,
      candidate_id,
      offer_id,
      offre_title,
      date,
      start_time,
      end_time,
      duration,
    } = req.body;

    // Check if the time slot is available
    const conflictingInterview = await Interview.findOne({
      $or: [
        { start_time: { $lt: end_time, $gte: start_time } },
        { end_time: { $gt: start_time, $lte: end_time } },
        { start_time: { $lte: start_time }, end_time: { $gte: end_time } },
      ],
    });

    if (conflictingInterview) {
      return res.status(400).json({
        success: false,
        message: "The selected time slot is not available",
      });
    }

    const interview = new Interview({
      candidature_id,
      candidate_id,
      offer_id,
      date,
      start_time,
      end_time,
      duration,
    });

    await interview.save();

    // Update the candidature status
    await Candidature.findByIdAndUpdate(candidature_id, {
      status: "interview scheduled",
    });

    // Send email to candidate
    await sendInterviewEmail({
      candidate_email,
      offre_title,
      start_time,
      end_time,
      date,
    });

    res.status(201).json({
      success: true,
      data: interview,
    });
  } catch (error) {
    console.error("Error creating interview:", error);
    res.status(500).json({
      success: false,
      message: "Error creating interview",
    });
  }
};

// Get all interviews
exports.getAllInterviews = async (req, res) => {
  try {
    const interviews = await Interview.find()
      .populate("candidature_id")
      .populate("candidate_id")
      .populate("offer_id")

      .sort({ start_time: 1 });

    res.status(200).json({
      success: true,
      data: interviews,
    });
  } catch (error) {
    console.error("Error fetching interviews:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching interviews",
    });
  }
};

// Get available time slots
exports.getAvailableSlots = async (req, res) => {
  try {
    const { date } = req.query;

    const selectedDate = new Date(date);
    const startOfDay = new Date(selectedDate.setHours(0, 0, 0, 0));
    const endOfDay = new Date(selectedDate.setHours(23, 59, 59, 999));

    // Get all interviews for this interviewer on the selected day
    const interviews = await Interview.find({
      start_time: { $gte: startOfDay, $lte: endOfDay },
      status: { $ne: "cancelled" },
    }).sort({ start_time: 1 });

    // Generate available slots (assuming 30-minute slots from 9AM to 5PM)
    const availableSlots = [];
    const startHour = 9;
    const endHour = 17;
    const slotDuration = 30; // minutes

    let currentTime = new Date(startOfDay);
    currentTime.setHours(startHour, 0, 0, 0);

    while (
      currentTime.getHours() < endHour ||
      (currentTime.getHours() === endHour && currentTime.getMinutes() === 0)
    ) {
      const slotEndTime = new Date(
        currentTime.getTime() + slotDuration * 60000
      );

      // Check if this slot overlaps with any existing interview
      const isAvailable = !interviews.some((interview) => {
        return (
          (currentTime >= interview.start_time &&
            currentTime < interview.end_time) ||
          (slotEndTime > interview.start_time &&
            slotEndTime <= interview.end_time) ||
          (currentTime <= interview.start_time &&
            slotEndTime >= interview.end_time)
        );
      });

      if (isAvailable) {
        availableSlots.push({
          start_time: new Date(currentTime),
          end_time: new Date(slotEndTime),
        });
      }

      currentTime = new Date(currentTime.getTime() + slotDuration * 60000);
    }

    res.status(200).json({
      success: true,
      data: availableSlots,
    });
  } catch (error) {
    console.error("Error fetching available slots:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching available slots",
    });
  }
};

// Get interview by ID
exports.getInterviewById = async (req, res) => {
  try {
    const interview = await Interview.findById(req.params.id)
      .populate("candidature_id")
      .populate("candidate_id")
      .populate("offer_id", "titre type");

    if (!interview) {
      return res.status(404).json({
        success: false,
        message: "Interview not found",
      });
    }

    res.status(200).json({
      success: true,
      data: interview,
    });
  } catch (error) {
    console.error("Error fetching interview:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching interview",
    });
  }
};

// Update interview
exports.updateInterview = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // If updating time, check for conflicts
    if (updateData.start_time || updateData.end_time) {
      const existingInterview = await Interview.findById(id);
      const start_time = updateData.start_time || existingInterview.start_time;
      const end_time = updateData.end_time || existingInterview.end_time;

      const conflictingInterview = await Interview.findOne({
        _id: { $ne: id },

        $or: [
          { start_time: { $lt: end_time, $gte: start_time } },
          { end_time: { $gt: start_time, $lte: end_time } },
          { start_time: { $lte: start_time }, end_time: { $gte: end_time } },
        ],
      });

      if (conflictingInterview) {
        return res.status(400).json({
          success: false,
          message: "The selected time slot is not available",
        });
      }
    }

    const interview = await Interview.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!interview) {
      return res.status(404).json({
        success: false,
        message: "Interview not found",
      });
    }

    // If status changed to cancelled, update candidature
    if (updateData.status === "cancelled") {
      await Candidature.findByIdAndUpdate(interview.candidature_id, {
        status: "en cours",
      });
    }

    res.status(200).json({
      success: true,
      data: interview,
    });
  } catch (error) {
    console.error("Error updating interview:", error);
    res.status(500).json({
      success: false,
      message: "Error updating interview",
    });
  }
};

// Delete interview
exports.deleteInterview = async (req, res) => {
  try {
    const interview = await Interview.findByIdAndDelete(req.params.id);

    if (!interview) {
      return res.status(404).json({
        success: false,
        message: "Interview not found",
      });
    }

    // Update the candidature status back to "en cours"
    await Candidature.findByIdAndUpdate(interview.candidature_id, {
      status: "en cours",
    });

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    console.error("Error deleting interview:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting interview",
    });
  }
};

exports.sendRefusEmail = async (req, res) => {
  let data = await sendRefusEmail(req.body);
  res.json({ data });
};
