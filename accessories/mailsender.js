const nodemailer = require("nodemailer");

async function Mail(origin, clave, subject, html) {
  // Configura el transporte de correo electrónico
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL, // Cambia esto por tu dirección de correo electrónico de Gmail
      pass: process.env.MAIL_PASS, // Cambia esto por tu contraseña de Gmail o usa una contraseña de aplicación si la tienes configurada
    },
    authMethod: "PLAIN",
  });

  // Define el correo electrónico que quieres enviar
  const mailOptions = {
    from: process.env.MAIL,
    to: origin, // Cambia esto por la dirección de correo electrónico del destinatario
    subject: subject,
    html: html,
  };
  try {
    // Envía el correo electrónico
    await transporter.sendMail(mailOptions, (err, res) => {
      if (err) {
        console.error("Error al enviar el correo electrónico:", err);
      } else {
        console.log("Correo electrónico enviado con éxito:");
      }
    });
  } catch (error) {
    console.error("Error al enviar el correo electrónico:", error);
  }
}
module.exports = Mail;
