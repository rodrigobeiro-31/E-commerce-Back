const nodemailer = require("nodemailer");
require("dotenv").config();

async function Mail(origin, clave) {
  // Configura el transporte de correo electrónico
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "info.doppios@gmail.com", // Cambia esto por tu dirección de correo electrónico de Gmail
      pass: "oaxs rwok hbhq lqzr", // Cambia esto por tu contraseña de Gmail o usa una contraseña de aplicación si la tienes configurada
    },
  });

  // Define el correo electrónico que quieres enviar
  const mailOptions = {
    from: "info.doppios@gmail.com",
    to: origin, // Cambia esto por la dirección de correo electrónico del destinatario
    subject: "reset email from Doppio´s",
    html: ` <html>
        <body>
          <p>Hola, este es un correo con un botón por que algun banana se olvido la clave</p>
          <a href="https://localhost:3000/user/reset?password=${clave} " target="_blank">
            <button> doppios </button>
          </a>
        </body>
      </html>`,
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
