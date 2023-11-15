const verifyOTP = require("./verify");
const { secretKey } = require("./generate_qr_code");

// Extract OTP from command line arguments
const args = process.argv.slice(2);
const userOTP = args[0]; // Get OTP from command line argument

if (!userOTP) {
  console.error('Please provide the OTP as a command line argument.');
  process.exit(1);
}

const verificationResult = verifyOTP(secretKey, userOTP);

if (verificationResult) {
  console.log("OTP verification successful!");
} else {
  console.log("OTP verification failed!");
}
