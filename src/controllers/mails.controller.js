// DB Object
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const db = require("../models");

// Les Entités qu'on importe
const { User } = db.sequelize.models;

/**
 * Création d'un compte
 * Méthode qui envoi un mail à l'utilisateur pour l'informer que sa demande de compte a été prise en compte
 * @param {*} user
 * @param {*} mailtype
 */
exports.sendMailUserCreationRequest = (user) => {
  console.log(user.email);
  // async..await is not allowed in global scope, must use a wrapper
  async function main() {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = getGMailTransport();

    // send mail with defined transport object
    let info = await getMailInfoUser(transporter, user);

    let info2 = await getMailInfoAdministrateur(transporter, user);

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

getMailInfoUser = async (transporter, user) => {
  const company = "Infinix";
  return transporter.sendMail({
    from: '"Demande de création de compte - Infinix" <infinix.supp@gmail.com>', // sender address
    to: user.email, // list of receivers
    subject: "Demande de création de compte", // Subject line
    text: "Demande de création de compte", // plain text body
    html: `<b>Bienvenue chez ${company} </b>
    <p>Nous avons bien reçus votre demande de compte - ${user.name} ${user.surname}. Un administrateur va s'occupe de traiter la demande.</p>
    <p>Vous allez recevoir prochainement un mail de validation sur l'adresse mail  : ${user.email}</p>
    <p>L'équipe Infinix</p>`, // html body
  });
};

getMailInfoAdministrateur = async (transporter, user) => {
  const company = "Infinix";
  return transporter.sendMail({
    from:
      '"Demande de création de compte - " ' +
      user.name +
      " " +
      user.surname +
      " <infinix.supp@gmail.com>", // sender address
    to: "infinix.supp@gmail.com", // list of receivers
    subject:
      "Demande de création de compte - " + user.name + " " + user.surname, // Subject line`
    text: "Demande de création de compte - ${user.name} ${user.surname} ", // plain text body
    html: `<b>Demande de création de compte - ${user.name} ${user.surname} </b>
    <p>Merci de traiter la demande de ${user.name} ${user.surname} en vous connecter sur l'application : www.infinix.com</p>`, // html body
  });
};

/**
 * Demande de réservation d'un véhicule
 * Méthode qui envoi un mail à l'utilisateur pour l'informer que sa demande de réservation a été prise en compte
 * @param {*} mail
 * @param {*} mailtype
 */
exports.sendMailUserVehicleRequest = (reservation) => {
  console.log(reservation);
  // async..await is not allowed in global scope, must use a wrapper
  async function main() {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = getGMailTransport();

    // send mail with defined transport object
    let info = await getMailUserVehicleRequest(transporter, reservation);

    let info2 = await getMailAdministrateurVehicleRequest(
      transporter,
      reservation
    );

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

getMailUserVehicleRequest = async (transporter, reservation) => {
  const company = "Infinix";
  return transporter.sendMail({
    from:
      '"Demande de réservation de véhicule - Infinix" <infinix.supp@gmail.com>', // sender address
    to: "mouradoujdari@gmail.com", // list of receivers
    subject: "Demande de réservation de véhicule", // Subject line
    text: "Demande de réservation de véhicule", // plain text body
    html: `<b>Votre demande de réservation de véhicule a bien été envoyée à l'administrateur ${company} </b>
    <p>Numéro de demande de réservation : </p>
    <p>Date de début : </p>
    <p>Date de fin : </p>
    <p>Lieu : </p>
    <p>Vous allez recevoir un mail retour pour vous indiquez si un véhicule est disponible au date et heure choisie. </p>
    <p>Si un véhicule est disponible au date et heure choisie. Il vous restera à aller chercher les clés à l'administration  </p>
    <p>Sinon si aucun véhicule n'est disponible</p> 
    <p>L'équipe Infinix</p>`, // html body
  });
};

getMailAdministrateurVehicleRequest = async (transporter) => {
  const company = "Infinix";
  return transporter.sendMail({
    from:
      '"Demande de réservation de véhicule - Nom Prénom" <infinix.supp@gmail.com>', // sender address
    to: "infinix.supp@gmail.com", // list of receivers
    subject: "Demande de création de compte - Nom Prénom", // Subject line
    text: "Demande de création de compte - Nom Prénom", // plain text body
    html: `<b>Demande de création de compte - Nom Prénom </b>
    <p>Numéro de demande de réservation : </p>
    <p>Merci de traiter la demande de réservation Nom Prenom en vous connecter sur l'application : www.infinix.com</p>`, // html body
  });
};

/**
 *
 */
exports.sendMailUserVehicleRequest = (mail, mailtype) => {
  console.log(mail);
  // async..await is not allowed in global scope, must use a wrapper
  async function main() {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = getGMailTransport();

    // send mail with defined transport object
    let info = await getMailUserVehicleRequest(transporter);

    let info2 = await getMailAdministrateurVehicleRequest(transporter);

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
