const UndergraduteApplicant = require("../models/undergraduateApplicant");
const asyncHandler = require("express-async-handler");
const HTML_TEMPLATE = require("../notifications/email/htmlTemplates.js");
const SENDMAIL = require("../notifications/email/mail.js");

//get all users
const getAllUndergraduateApplicants = asyncHandler(async (req, res) => {
  const undergraduteApplicant = await UndergraduteApplicant.find()
    .lean()
    .sort({ createdAt: -1 });
  // If no undergradute Applicant
  if (!undergraduteApplicant?.length) {
    return res.status(400).json({ message: "No applicant found" });
  }

  res.json(undergraduteApplicant);
});

const addNewApplicant = asyncHandler(async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    residence,
    role,
    recentSchool,
    applicationStatus,
    dateOfBirth,
    currentUniversity,
    yearOfCompletion,
    wassceText,
    wasscePdf,
    essayQuestion,
    essayAnswer,
    essayAnswerPdf,
    gender,
    phone,
    whatsappNumber,
    level,
  } = req.body;

  // Confirm data
  const wassceResult = !wasscePdf && !wassceText;
  const essayResult = !essayAnswerPdf && !essayAnswer;

  const anyEmptyField =
    !firstName ||
    !lastName ||
    !email ||
    !residence ||
    !role ||
    !recentSchool ||
    !dateOfBirth ||
    !gender ||
    !yearOfCompletion ||
    wassceResult ||
    !essayQuestion ||
    essayResult;

  console.log(anyEmptyField);

  if (anyEmptyField) {
    return res
      .status(400)
      .json({ message: "It seems you have not filled the required fields" });
  }

  // Check for duplicate title
  const duplicate = await UndergraduteApplicant.findOne({ email })
    .lean()
    .exec();

  if (duplicate) {
    return res
      .status(409)
      .json({ message: "It seems you have already applied" });
  }

  // Create and store the new user
  const undergraduteApplicant = await UndergraduteApplicant.create({
    firstName,
    lastName,
    email,
    residence,
    role,
    recentSchool,
    applicationStatus,
    dateOfBirth,
    currentUniversity,
    yearOfCompletion,
    wassceText,
    essayQuestion,
    essayAnswer,
    gender,
    phone,
    whatsappNumber,
    level,
    essayAnswerPdf,
    wasscePdf,
  });

  if (undergraduteApplicant) {
    const message = `
      Congratulations ${firstName}! Your application has been successfully submitted.

      Thank you for your interest in Ckodon. We appreciate your time and effort in completing the application. We will review your application carefully and get back to you as soon as possible.
      `;
    const options = {
      from: "Application <iamasum369@outlook.com>", // sender address
      to: email, // receiver email
      subject: "Application Recieved", // Subject line
      text: message,
      html: HTML_TEMPLATE(message),
    };

    SENDMAIL(options, (info) => {
      console.log("Email sent successfully");
      console.log("MESSAGE ID: ", info.messageId);
    });

    // Created
    return res
      .status(201)
      .json({
        message: "Your application has been submitted successfuly",
        isSuccess: true,
      });
  } else {
    return res.status(400).json({ message: "Invalid applicant data received" });
  }
});

const updateApplicant = asyncHandler(async (req, res) => {
  const { id, applicationStatus, email, firstName, password } = req.body;

  const anyEmptyField = !id || !applicationStatus;

  if (anyEmptyField) {
    return res.status(400).json({ message: "All field must be completed" });
  }

  const applicant = await UndergraduteApplicant.findById(id).exec();

  if (!applicant) {
    return res.status(400).json({ message: "applicant not found" });
  }

  applicant.applicationStatus = applicationStatus;

  const updatedApplicant = await applicant.save();

  if (applicationStatus === "admitted") {
    const message = `
    Dear ${firstName},
  
  I am pleased to inform you that your application to join the ckodon group has been accepted! Congratulations on this achievement. <br> <br>
  
  As a member of the ckodon group, you will have access to a wide range of resources and opportunities that will help you to develop your skills and build your network within the industry. <br> <br>
  
  To access your member portal, please use the following password: <strong>${password}</strong> . Please keep this password safe and secure, as it will enable you to log in to the member portal and access all of the benefits available to you. <br> <br>
  
  We look forward to welcoming you to the ckodon group and working with you to achieve your goals. <br> <br>
  
  If you have any questions or concerns, please don't hesitate to contact us. <br> <br>
  
  Best regards, <br> <br>
  
  admission committee
    `;
    const options = {
      from: "Application Decision <iamasum369@outlook.com>", // sender address
      to: email, // receiver email
      subject: "Ckodon Application Status", // Subject line
      text: message,
      html: HTML_TEMPLATE(message),
    };

    SENDMAIL(options, (info) => {
      console.log("Email sent successfully");
      console.log("MESSAGE ID: ", info.messageId);
    });
  }

  res.json({
    message: `${applicant.firstName} updated succesfully`,
    isSuccess: true,
  });
});

module.exports = {
  getAllUndergraduateApplicants,
  addNewApplicant,
  updateApplicant,
};
