require("dotenv").config();

const fs = require("fs");

const base64 = process.env.GOOGLE_CREDENTIALS_JSON_BASE64;
if (base64) {
  const jsonString = Buffer.from(base64, "base64").toString("utf-8");
  const filePath = "./public/livingwater.json";
  fs.writeFileSync(filePath, jsonString);
  console.log(`Google credentials written to ${filePath}`);
} else {
  console.error(
    "GOOGLE_CREDENTIALS_JSON_BASE64 environment variable is not set",
  );
}
