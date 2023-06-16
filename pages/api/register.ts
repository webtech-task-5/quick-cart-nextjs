import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../libs/dbConnect";
import User from "../../models/User";
import { sendMail } from "utils/mail";
export default async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect();
  const method = req.method;
  if (method == "POST") {
    let user = new User({
      ...req.body,
    });
    user.verificationCode = create4DigitCode();
    await user.save();
    const mail = createMail(user.verificationCode);
    await sendMail(user.email, mail);
    return res.status(200).json({
      message: "sucessful",
    });
  }
};
// Helper function 
const create4DigitCode = () => {
  let chars = "0123456789";
  let randomNumber = "";

  for (let i = 0; i < 4; i++) {
    randomNumber += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return randomNumber;
};
const createMail = (code: string) => {
  let mail = {
    subject: "Thanks for registering |  Cart-o",
    text: ` Your Verfication code is ${code}`,
  };
  let bodyHtml = ` <!DOCTYPE html>
<html>
<head>
  <title>Thanks for registering!</title>
  <style>
    body {
      font-family: sans-serif;
      font-size: 16px;
      line-height: 1.5;
      margin: 0;
      padding: 0;
    }
    
    h1 {
      font-size: 24px;
      margin-top: 0;
    }
    
    p {
      margin-bottom: 12px;
    }
    
    .verification-code {
      font-size: 18px;
      font-weight: bold;
    }
    
    .button {
      background-color: #000088;
      color: white;
      font-size: 16px;
      font-weight: bold;
      padding: 12px 24px;
      border: none;
      cursor: pointer;
    }
  </style>
</head>
<body>
  <h1>Thanks for registering with Cart O!</h1>
  <p>We're excited to have you on board. To complete your registration, please enter the following verification code:</p>
  <p class="verification-code">${code}</p>
  <p>You can enter this code on the complete registration page <a href="https://carto.com/register">registration page</a>.</p>
  <p>Thanks again for choosing Cart O!</p>
  <p><a href="https://carto.com/register" class="button">Continue to Cart O</a></p>
</body>
</html>`;
  return {
    ...mail,
    html: bodyHtml,
  };
};
