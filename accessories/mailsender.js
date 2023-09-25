const nodemailer = require("nodemailer");

async function Mail(origin, clave, subjet, html) {
  // Configura el transporte de correo electrónico
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.MAIL, // Cambia esto por tu dirección de correo electrónico de Gmail
      pass: process.env.MAIL_PASS, // Cambia esto por tu contraseña de Gmail o usa una contraseña de aplicación si la tienes configurada
    },
  });

  // Define el correo electrónico que quieres enviar
  const mailOptions = {
    from: process.env.MAIL,
    to: origin, // Cambia esto por la dirección de correo electrónico del destinatario
    subject: subjet,
    html: html,
  };
  try {
    // Envía el correo electrónico
    const info = await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error al enviar el correo electrónico:", error);
      } else {
        console.log("Correo electrónico enviado con éxito:", info.response);
      }
    });
  } catch (error) {
    console.error("Error al enviar el correo electrónico:", error);
  }
}
module.exports = Mail;
