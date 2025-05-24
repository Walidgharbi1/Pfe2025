const nodemailer = require("nodemailer");

/*

Identifiant : 8d40fa001@smtp-brevo.com
Mot de passe : dXI1Q0hUK9yDraYg


*/

// Configure your email transporter
const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: {
    user: "7516bb001@smtp-brevo.com",
    pass: "Y47HMxNK5DVT38gB",
  },
});

// Send interview email to candidate
exports.sendInterviewEmail = async ({
  candidate_email,
  offre_title,
  start_time,
  end_time,
  date,
}) => {
  try {
    // In a real app, you would fetch candidate details from database

    const mailOptions = {
      from: "gharbiwalid76@gmail.com",
      to: candidate_email,
      subject: "Invitation to Interview",
      html: `
        <p>Dear ${candidate_email},</p>
        <p>You have been scheduled for an interview with our team for the position ${offre_title}.</p>
        <p><strong>Details:</strong></p>
        <ul>
          <li>Date: ${new Date(date).toLocaleDateString()}</li>
          <li>Time: ${new Date(start_time).toLocaleTimeString()} - ${new Date(
        end_time
      ).toLocaleTimeString()}</li>
         
               <p>Best regards,<br/>The Hiring Team</p>
      `,
    };

    transporter.sendMail(mailOptions, function (err, data) {
      if (err) {
        console.error("Error sending interview email:", err);
      } else {
        console.log("Interview email sent successfully");
      }
    });
  } catch (error) {
    console.error("Error sending interview email:", error);
    throw error;
  }
};

exports.sendRefusEmail = async ({ candidate_email, reason, offerTitle }) => {
  try {
    const mailOptions = {
      from: "gharbiwalid76@gmail.com",
      to: candidate_email,
      subject: "Refus candidature",
      html: `
        <p>Dear ${candidate_email},</p>
        <p>You have been refused for  the offre ${offerTitle}</p>
        <p><strong>Reason : ${reason}</strong></p>
              `,
    };

    transporter.sendMail(mailOptions, function (err, data) {
      if (err) {
        console.log(err);
      } else {
        console.log("Interview email sent successfully");
      }
    });
  } catch (error) {
    console.error("Error sending interview email:", error);
    throw error;
  }
};
