const axios = require("axios");

const AUTH_URL = "http://4.224.186.213/evaluation-service/auth";
const LOG_URL = "http://4.224.186.213/evaluation-service/logs";

const credentials = {
  email: "24215a0512@gmail.com",
  name: "prathap reddy yakkanti",
  rollNo: "24215a512",
  accessCode: "ahXjvp",
  clientID: "5e52fa45-8b67-469f-8228-e707b78e2314",
  clientSecret: "nESjnfuMvChMaugE",
};

async function Log(stack, level, pkg, message) {
  try {
    const auth = await axios.post(AUTH_URL, credentials);

    const token = auth.data.access_token;
    const type = auth.data.token_type;

    await axios.post(
      LOG_URL,
      {
        stack,
        level,
        package: pkg,
        message,
      },
      {
        headers: {
          Authorization: `${type} ${token}`,
        },
      }
    );

    console.log("Log sent successfully");
  } catch (err) {
    console.log(err.response?.data || err.message);
  }
}

module.exports = Log;