// DB Object
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const db = require("../models");

// Les Entités qu'on importe
const { User } = db.sequelize.models;

exports.sendMailUserCreationRequest = (mail, mailtype) => {
  console.log(mail);
  // async..await is not allowed in global scope, must use a wrapper
  async function main() {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = getGMailTransport();

    // send mail with defined transport object
    let info = await getMailInfoUser(transporter);

    let info2 = await getMailInfoAdministrateur(transporter);

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    console.log("Message sent: %s", info2.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  }

  main().catch(console.error);
};

exports.mailUser = async (req, res) => {
  const mail = req.params.mail;
};

getGMailTransport = () => {
  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: "infinix.supp@gmail.com", // generated ethereal user
      pass: "!nf!n!x$upp44", // generated ethereal password
    },
  });
};

getMailInfoUser = async (transporter) => {
  const company = "Infinix";
  return transporter.sendMail({
    from: '"Demande de création de compte - Infinix" <infinix.supp@gmail.com>', // sender address
    to: "mouradoujdari@gmail.com", // list of receivers
    subject: "Demande de création de compte", // Subject line
    text: "Demande de création de compte", // plain text body
    html: `<b>Bienvenue chez ${company} </b>
    <p>Nous avons bien reçus votre demande de compter. Un administrateur s'occupe de vous.</p>
    <p>Vous allez recevoir prochainement un mail avec vos identifiants de connexion.</p> 
    <p>L'équipe Infinix</p>`, // html body
  });
};

getMailInfoAdministrateur = async (transporter) => {
  const company = "Infinix";
  return transporter.sendMail({
    from:
      '"Demande de création de compte - Nom Prénom" <infinix.supp@gmail.com>', // sender address
    to: "infinix.supp@gmail.com", // list of receivers
    subject: "Demande de création de compte - Nom Prénom", // Subject line
    text: "Demande de création de compte - Nom Prénom", // plain text body
    html: `<b>Demande de création de compte - Nom Prénom </b>
    <p>Merci de traiter la demande de Nom Prenom en vous connecter sur l'application : www.infinix.com</p>`, // html body
  });
};
