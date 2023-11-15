// const speakeasy = require("speakeasy");
// const QRCode = require("qrcode");
// const qrCodeTerminal = require('qrcode-terminal');
// const fs = require('fs');
//
// function generateQRCodeURL(secret) {
//
//   return new Promise((resolve, reject) => {
//     QRCode.toDataURL(secret.otpauth_url, (err, dataURL) => {
//       if (err) {
//         reject(err);
//       } else {
//         console.log(secret.base32); // secret for verification
//
//         qrCodeTerminal.generate(secret.otpauth_url, { small: true }, function (qrcode) {
//           console.log(qrcode); // Display QR code in the console
//         });
//
//         resolve(secret.base32); // Resolve with secretKey
//       }
//     });
//   });
// }
//
// // Check if secret key already exists
// if (fs.existsSync('./secretKey.json')) {
//   const secretKeyData = fs.readFileSync('./secretKey.json');
//   const secretKey = JSON.parse(secretKeyData);
//   module.exports = { secretKey }; // Export the secretKey
//
// } else {
//   const secret = speakeasy.generateSecret({ length: 20 });
//
//   // Generate and store the secret key
//   generateQRCodeURL(secret)
//     .then((secretKey) => {
//       fs.writeFileSync('./secretKey.json', JSON.stringify(secretKey));
//       module.exports = { secretKey }; // Export the secretKey
//     })
//     .catch((err) => {
//       console.error("Error generating QR code:", err);
//     });
// }

const speakeasy = require("speakeasy");
const QRCode = require("qrcode");
const qrCodeTerminal = require('qrcode-terminal');
const fs = require('fs');

function generateQRCodeURL(secret, label) {
  const otpauth_url = speakeasy.otpauthURL({
    secret: secret.ascii,
    label: label, // Customize the label here
    issuer: 'YourIssuerName' // Optional: You can also set the issuer
  });

  return new Promise((resolve, reject) => {
    QRCode.toDataURL(otpauth_url, (err, dataURL) => {
      if (err) {
        reject(err);
      } else {
        console.log(secret.base32); // secret for verification

        qrCodeTerminal.generate(otpauth_url, { small: true }, function (qrcode) {
          console.log(qrcode); // Display QR code in the console
        });

        resolve(secret.base32); // Resolve with secretKey
      }
    });
  });
}

// Check if secret key already exists
if (fs.existsSync('./secretKey.json')) {
  const secretKeyData = fs.readFileSync('./secretKey.json');
  const secretKey = JSON.parse(secretKeyData);
  module.exports = { secretKey }; // Export the secretKey

} else {
  const label = 'gev.org'; // Change this to your desired label
  const secret = speakeasy.generateSecret({ length: 20 });

  // Generate and store the secret key
  generateQRCodeURL(secret, label)
      .then((secretKey) => {
        fs.writeFileSync('./secretKey.json', JSON.stringify(secretKey));
        module.exports = { secretKey }; // Export the secretKey
      })
      .catch((err) => {
        console.error("Error generating QR code:", err);
      });
}
