const ndoemailer = require("nodemailer"); 
const dotenv = require("dotenv"); 

dotenv.config(); // Load environment variables from a .env file into process.env

// Function to create and configure a nodemailer transporter
function createTransporter(config) {
  const transporter = ndoemailer.createTransport(config); // Create a transporter with the provided configuration
  return transporter; // Return the configured transporter
}

// Configuration object for the email transporter
let configurations = {
  servcie: "gmail", // Specify the email service (misspelled, should be "service")
  host: "smtp.gmail.com", // SMTP server address for Gmail
  port: 587, // Port number for Gmail's SMTP server
  requireTLS: true, // Ensure TLS encryption is used
  auth: {
    user: process.env.EMAIL, 
    pass: process.env.PASSWORD, 
  },
};

// Async function to send an email
const sendMail = async (messageOption) => {
  const transporter = await createTransporter(configurations); // Create a transporter using the configurations
  await transporter.verify(); // Verify the connection to the SMTP server
  await transporter.sendMail(messageOption, (error, info) => {
    if (error) {
      console.log(error); 
    }
    console.log(info.response); 
  });
};


module.exports = sendMail;
