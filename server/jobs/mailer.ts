import * as nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'tjintest1@gmail.com',
    pass: 'checkpoints'
  },
  pool: true
} as any);

export function createMail(receivers: string, subject: string,  textBody: string, htmlBody: string){
  let mailOptions: nodemailer.SendMailOptions = {
    from: '"Checkpoints" <noreply@checkpoints.com>', // sender address
    to: receivers, // list of receivers
    subject: subject, // Subject line
    text: textBody, // plaintext body
    html: htmlBody // html body
  };

  sendMail(mailOptions);
}

function sendMail(mailOptions: nodemailer.SendMailOptions){
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      return console.log("error");
    }
    console.log('Message sent: ' + info.response);
  });
}