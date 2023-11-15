const speakeasy = require("speakeasy");

function verifyOTP(secretKey, otp) {
  return speakeasy.totp.verify({
    secret: secretKey,
    encoding: "base32",
    token: otp,
  });
}

module.exports = verifyOTP;
