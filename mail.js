import nodemailer   from "nodemailer";
import { checkPort } from "./checkPort.js";
console.log(process.env.NODE_ENV);
const  app_pass="qvaciaitrmuelaij"
checkPort(587)
// async..await is not allowed in global scope, must use a wrapper
export const sendMail=(recipient,title,message)=>{
    async function main() {
        // Generate test SMTP service account from ethereal.email
        // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465, //587,
    secure: true, // true for 465, false for other ports
    auth: {
      user: "espainvestment212@gmail.com", // generated ethereal user
      pass: app_pass, // generated ethereal password
    },
    socketTimeout:120000,
  });
//   transporter.verify(error)

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: 'ESPA', // sender address
    to: recipient, // list of receivers
    subject:title, // Subject line
    // text: "<img src='gs://koin-7ea67.appspot.com/ESPA2.png'/>", // plain text body
    html:message // html body
  });

  console.log("Message sent: %s", info.messageId);
  
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
//   console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}
main().catch(console.error);

}