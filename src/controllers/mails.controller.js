// DB Object
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const db = require("../models");
const UserController = require("./users.controller");

const SiteController = require("./sites.controller");

const VehiculeController = require("./vehicules.controller");

// Les Entités qu'on importe
const { User, Setting } = db.sequelize.models;

/**
 * Création d'un compte
 * Méthode qui envoi un mail à l'utilisateur pour l'informer que sa demande de compte a été prise en compte
 * @param {*} user
 * @param {*} mailtype
 */
exports.sendMailUserCreationRequest = (user) => {
  async function main() {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = getGMailTransport();

    // send mail with defined transport object
    let info = await getMailInfoUser(transporter, user);

    /*Récupération du flag pour le paramètre "Modification Reservation Utilisateur"*/
    const mailSetting = await Setting.findOne({
      where: { label: "Modification Reservation Utilisateur" },
    });

    if (mailSetting && Boolean(mailSetting.flag)) {
      let info2 = await getMailInfoAdministrateur(transporter, user);

      console.log("Message sent: %s", info2.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    }

    console.log("Message sent: %s", info.messageId);
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
    subject: "Demande de création de compte - " + company + "", // Subject line
    text: "Demande de création de compte - " + company + "", // plain text body
    html: `<b>Bienvenue chez ${company} </b>
    <p>Nous avons bien reçus votre demande de compte - ${user.name} ${user.surname}.</p>
    <p>Un administrateur va s'occupe de traiter la demande.</p>
    <p>Vous allez recevoir prochainement un mail de validation sur l'adresse mail  : ${user.email}</p>
    <p>Lien pour aller sur l’application Infinix : www.${company}.fr</p>
    <p>L'équipe ${company} </p>`, // html body
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
    <p>Merci de traiter la demande de ${user.name} ${user.surname} en vous connecter sur l'application : www.${company}.fr</p>`, // html body
  });
};

/**
 * Demande de réservation d'un véhicule
 * Méthode qui envoi un mail à l'utilisateur pour l'informer que sa demande de réservation a été prise en compte
 * @param {*} mail
 * @param {*} mailtype
 */
exports.sendMailUserVehicleRequest = (booking) => {
  // async..await is not allowed in global scope, must use a wrapper
  async function main() {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = getGMailTransport();

    // send mail with defined transport object
    let info = await getMailUserVehicleRequest(transporter, booking);

    let info2 = await getMailAdministrateurVehicleRequest(transporter, booking);
  }

  main().catch(console.error);
};

getMailUserVehicleRequest = async (transporter, booking) => {
  const company = "Infinix";

  const user = await UserController.getUserById(booking.driver);

  const departureSite = await SiteController.getSiteById(
    booking.departure_site
  );

  const arrivalSite = await SiteController.getSiteById(booking.arrival_site);

  //Date de création
  let dateDeCreation = new Date(booking.createdAt);

  let dateDeCreationReservation = dateDeCreation.toLocaleString("fr-FR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  //Date de Début
  let dateDeDebut = new Date(booking.startDate);

  let dateDebutReservation = dateDeDebut.toLocaleString("fr-FR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  //Date de Fin
  let dateDeFin = new Date(booking.endDate);

  let dateFinReservation = dateDeFin.toLocaleString("fr-FR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  d1 = booking.startDate.getTime() / 86400000;
  d2 = booking.endDate.getTime() / 86400000;
  NombreDeJours = new Number(d2 - d1).toFixed(0);

  return transporter.sendMail({
    from: '"Demande de réservation de véhicule - Infinix" <infinix.supp@gmail.com>', // sender address
    to: user.email, // list of receivers
    subject: "Demande de réservation de véhicule - " + company + "", // Subject line
    text: "Demande de réservation de véhicule - " + company + "", // plain text body
    html: `<b>Bonjour ${user.name} ${user.surname}, </b>
    <p>Votre demande de réservation de véhicule a bien été envoyée à l'administrateur : </p>
    <p>Référence - ${company} : ${booking.id} </p>
    <p>Création : ${dateDeCreationReservation} </p>
    <p>Déplacement : ${departureSite.label} -> ${arrivalSite.label}</p>
    <p>Période : ${NombreDeJours} jours</p>
        <ul>
            <li>${dateDebutReservation}</li>
            <li>Jusqu'au ${dateFinReservation}</li>
        </ul>
    </p>
    <p>Dans l’attente de vous confirmer dans un prochain message la mise à disposition d’un véhicule, après validation de l’administrateur en fonction des disponibilités.</p>
    <p>Lien pour aller sur l’application Infinix : www.${company}.fr</p>
    <p>L'équipe ${company} </p>`, // html body
  });
};

getMailAdministrateurVehicleRequest = async (transporter, booking) => {
  const company = "Infinix";
  const user = await UserController.getUserById(booking.driver);

  const departureSite = await SiteController.getSiteById(
    booking.departure_site
  );

  const arrivalSite = await SiteController.getSiteById(booking.arrival_site);

  //Date de création
  let dateDeCreation = new Date(booking.createdAt);

  let dateDeCreationReservation = dateDeCreation.toLocaleString("fr-FR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  //Date de Début
  let dateDeDebut = new Date(booking.startDate);

  let dateDebutReservation = dateDeDebut.toLocaleString("fr-FR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  //Date de Fin
  let dateDeFin = new Date(booking.endDate);

  let dateFinReservation = dateDeFin.toLocaleString("fr-FR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  d1 = booking.startDate.getTime() / 86400000;
  d2 = booking.endDate.getTime() / 86400000;
  NombreDeJours = new Number(d2 - d1).toFixed(0);

  return transporter.sendMail({
    from:
      '"Demande de réservation de véhicule - " ' +
      user.name +
      " " +
      user.surname +
      " <infinix.supp@gmail.com>", // sender address
    to: "infinix.supp@gmail.com", // list of receivers
    subject:
      "Demande de réservation de véhicule - " + user.name + " " + user.surname, // Subject line`
    text: "Demande de réservation de véhicule - ${user.name} ${user.surname} ", // plain text body
    html: `<b>Demande de réservation de véhicule - ${user.name} ${user.surname} </b>
    <p>Référence - ${company} : ${booking.id} </p>
    <p>Demandeur : ${user.name} ${user.surname}</p><p>
   <p>Création : ${dateDeCreationReservation} </p>
    <p>Déplacement : ${departureSite.label} -> ${arrivalSite.label}</p>
    <p>Période : ${NombreDeJours} jours </p>
        <ul>
            <li>${dateDebutReservation}</li>
            <li>Jusqu'au ${dateFinReservation}</li>
        </ul>
    </p>
    <p>Merci de traiter la demande de réservation en vous connecter sur l'application : www.infinix.com</p>`, // html body
  });
};

/**
 * Mail d'Activation de Compte
 * Méthode qui permet d'activer un compte utilisateur à partir du menu des utilisateur
 * La procédure est réalisée par l'administrateur
 */
exports.sendMailUserActiverCompte = (user) => {
  // async..await is not allowed in global scope, must use a wrapper
  async function main() {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = getGMailTransport();

    // send mail with defined transport object
    let info = await getMailUserActiverCompte(transporter, user);

    //let info2 = await getMailAdministrateurVehicleRequest(transporter);

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  }

  main().catch(console.error);
};

getMailUserActiverCompte = async (transporter, user) => {
  const company = "Infinix";
  return transporter.sendMail({
    from: '"Activation du compte - Infinix - Mail automatique" <infinix.supp@gmail.com>', // sender address
    to: user.email, // list of receivers
    subject: "Activation du compte - Mail automatique", // Subject line
    text: "Activation du compte - Mail automatique", // plain text body
    html: `<b>Bonjour ${user.name} ${user.surname}, </b>
    <p>Votre compte vient d'être activé, vous pouvez à présent vous connecter avec l'adresse mail  : ${user.email}</p>
    <p>Lien pour aller sur l’application Infinix : www.${company}.fr</p>
    <p>L'équipe Infinix</p>`, // html body
  });
};

/**
 * Mail Désasctivation de Compte
 */
exports.sendMailUserDesactiverCompte = (user) => {
  // async..await is not allowed in global scope, must use a wrapper
  async function main() {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = getGMailTransport();

    // send mail with defined transport object
    let info = await getMailUserDesactiverCompte(transporter, user);

    //let info2 = await getMailAdministrateurVehicleRequest(transporter);

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  }

  main().catch(console.error);
};

getMailUserDesactiverCompte = async (transporter, user) => {
  const company = "Infinix";
  return transporter.sendMail({
    from: '"Désactivation du compte - Infinix - Mail automatique" <infinix.supp@gmail.com>', // sender address
    to: user.email, // list of receivers
    subject: "Désactivation du compte - Mail automatique", // Subject line
    text: "Désactivation du compte - Mail automatique", // plain text body
    html: `<b>Bonjour ${user.name} ${user.surname}, </b>
    <p>Votre compte vient d'être désactivé : ${user.email}. </p>
    <p>Lien pour aller sur l’application Infinix : www.${company}.fr</p>
    <p>L'équipe Infinix</p>
    <p>PS : S’il s’agit d’une erreur, veuillez contacter le service administration de votre entreprise.</p>`,
  });
};

/**
 * Validation de réservation d'un véhicule
 * Méthode qui envoi un mail à l'utilisateur pour l'informer que sa demande de réservation a été validée
 * @param {*} mail
 * @param {*} mailtype
 */
exports.sendMailLoanValidation = (booking) => {
  // async..await is not allowed in global scope, must use a wrapper
  async function main() {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = getGMailTransport();

    // send mail with defined transport object
    let info = await getMailUserLoanValidation(transporter, booking);
  }

  main().catch(console.error);
};

getMailUserLoanValidation = async (transporter, booking) => {
  const company = "Infinix";

  const user = await UserController.getUserById(booking.driver);

  const departureSite = await SiteController.getSiteById(
    booking.departure_site
  );

  const arrivalSite = await SiteController.getSiteById(booking.arrival_site);

  const vehicule = await VehiculeController.getVehiculeById(
    booking.lentVehicule
  );

  //Date de création
  let dateDeCreation = new Date(booking.createdAt);

  let dateDeCreationReservation = dateDeCreation.toLocaleString("fr-FR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  //Date de Début
  let dateDeDebut = new Date(booking.startDate);

  let dateDebutReservation = dateDeDebut.toLocaleString("fr-FR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  //Date de Fin
  let dateDeFin = new Date(booking.endDate);

  let dateFinReservation = dateDeFin.toLocaleString("fr-FR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  d1 = booking.startDate.getTime() / 86400000;
  d2 = booking.endDate.getTime() / 86400000;
  NombreDeJours = new Number(d2 - d1).toFixed(0);

  return transporter.sendMail({
    from: '"Validation de la réservation de véhicule - Infinix - Mail automatique" <infinix.supp@gmail.com>', // sender address
    to: user.email, // list of receivers
    subject: "Validation de la réservation de véhicule - " + company + "", // Subject line
    text: "Validation de la réservation de véhicule - " + company + "", // plain text body
    html: `<b>Bonjour ${user.name} ${user.surname}, </b>
    <p> Votre demande de réservation de véhicule a bien été validée.</p>
    <p>Référence - ${company} : ${booking.id} </p>
    <p>Création : ${dateDeCreationReservation} </p>
    <p>Déplacement : ${departureSite.label} -> ${arrivalSite.label}</p>
    <p>Période : ${NombreDeJours} jours</p>
        <ul>
            <li>${dateDebutReservation}</li>
            <li>Jusqu'au ${dateFinReservation}</li>
        </ul>
    </p>
    <p> Véhicule de réservation :
       <ul>
            <li>Immatriculation : ${vehicule.immatriculation}</li>
            <li>Modèle : ${vehicule.model}</li>
        </ul>
    </p>
    <p>Veuillez passer à l'administration pour récupérer les clés du véhicule, la veille de votre date de réservation.</p>
    <p>Lien pour aller sur l’application Infinix : www.${company}.fr</p>
    <p>L'équipe ${company} </p>`, // html body
  });
};

/**
 * Annulation de réservation d'un véhicule
 * Méthode qui envoi un mail à l'utilisateur pour l'informer que sa demande de réservation a été annulée
 * @param {*} mail
 * @param {*} mailtype
 */
exports.sendMailLoanAnnulation = (booking) => {
  // async..await is not allowed in global scope, must use a wrapper
  async function main() {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = getGMailTransport();

    // send mail with defined transport object
    let info = await getMailUserLoanAnnulation(transporter, booking);
  }

  main().catch(console.error);
};

getMailUserLoanAnnulation = async (transporter, booking) => {
  const company = "Infinix";
  const user = await UserController.getUserById(booking.driver);

  const departureSite = await SiteController.getSiteById(
    booking.departure_site
  );

  const arrivalSite = await SiteController.getSiteById(booking.arrival_site);

  //Date de création
  let dateDeCreation = new Date(booking.createdAt);

  let dateDeCreationReservation = dateDeCreation.toLocaleString("fr-FR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  //Date de Début
  let dateDeDebut = new Date(booking.startDate);

  let dateDebutReservation = dateDeDebut.toLocaleString("fr-FR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  //Date de Fin
  let dateDeFin = new Date(booking.endDate);

  let dateFinReservation = dateDeFin.toLocaleString("fr-FR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  d1 = booking.startDate.getTime() / 86400000;
  d2 = booking.endDate.getTime() / 86400000;
  NombreDeJours = new Number(d2 - d1).toFixed(0);

  return transporter.sendMail({
    from: '"Annulation de la réservation de véhicule - Infinix - Mail automatique" <infinix.supp@gmail.com>', // sender address
    to: user.email, // list of receivers
    subject: "Annulation de la réservation de véhicule - " + company + "", // Subject line
    text: "Annulation de la réservation de véhicule - " + company + "", // plain text body
    html: `<b>Bonjour ${user.name} ${user.surname}, </b>
    <p>Votre réservation de véhicule : ${booking.id} a bien été annulée.</p>
    <p>Création : ${dateDeCreationReservation} </p>
    <p>Déplacement : ${departureSite.label} -> ${arrivalSite.label}</p>
    <p>Période : ${NombreDeJours} jours</p>
        <ul>
            <li>${dateDebutReservation}</li>
            <li>Jusqu'au ${dateFinReservation}</li>
        </ul>
    </p>
    <p>Lien pour aller sur l’application Infinix : www.${company}.fr</p>
    <p>L'équipe ${company} </p>`, // html body
  });
};

/**
 * Cloture de réservation d'un véhicule
 * Méthode qui envoi un mail à l'utilisateur pour l'informer que sa réservation a été cloturé
 * @param {*} mail
 * @param {*} mailtype
 */
exports.sendMailLoanCloture = (booking) => {
  // async..await is not allowed in global scope, must use a wrapper
  async function main() {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = getGMailTransport();

    // send mail with defined transport object
    let info = await getMailUserLoanCloture(transporter, booking);
  }

  main().catch(console.error);
};

getMailUserLoanCloture = async (transporter, booking) => {
  const company = "Infinix";

  const user = await UserController.getUserById(booking.driver);

  const departureSite = await SiteController.getSiteById(
    booking.departure_site
  );

  const arrivalSite = await SiteController.getSiteById(booking.arrival_site);

  const vehicule = await VehiculeController.getVehiculeById(
    booking.lentVehicule
  );

  //Date de création
  let dateDeCreation = new Date(booking.createdAt);

  let dateDeCreationReservation = dateDeCreation.toLocaleString("fr-FR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  //Date de Début
  let dateDeDebut = new Date(booking.startDate);

  let dateDebutReservation = dateDeDebut.toLocaleString("fr-FR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  //Date de Fin
  let dateDeFin = new Date(booking.endDate);

  let dateFinReservation = dateDeFin.toLocaleString("fr-FR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  d1 = booking.startDate.getTime() / 86400000;
  d2 = booking.endDate.getTime() / 86400000;
  NombreDeJours = new Number(d2 - d1).toFixed(0);

  return transporter.sendMail({
    from: '"Clôture de la réservation de véhicule - Infinix - Mail automatique" <infinix.supp@gmail.com>', // sender address
    to: user.email, // list of receivers
    subject: "Clôture de la réservation de véhicule - " + company + "", // Subject line
    text: "Clôture de la réservation de véhicule - " + company + "", // plain text body
    html: `<b>Bonjour ${user.name} ${user.surname}, </b>
    <p>Votre réservation de véhicule : ${booking.id} a bien été clôturée.</p>
    <p>Déplacement : ${departureSite.label} -> ${arrivalSite.label}</p>
    <p>Période : ${NombreDeJours} jours</p>
        <ul>
            <li>${dateDebutReservation}</li>
            <li>Jusqu'au ${dateFinReservation}</li>
        </ul>
    </p>

    <p>Concernant le véhicule :  Modèle : Immatriculation : ${vehicule.immatriculation} - Modèle : ${vehicule.model} </p>
      <ul>
        <li> L'état de l'essence : Plein </li>
        <li> Commentaire : Rien à signiler <li>
      </ul>
    </p>
    <p>Lien pour aller sur l’application Infinix : www.${company}.fr</p>
    <p>L'équipe ${company} </p>`, // html body
  });
};

/**
 * Modification de la réservation d'un véhicule
 * Méthode qui envoi un mail à l'utilisateur pour l'informer que sa réservation a été modifiée
 * @param {*} mail
 * @param {*} mailtype
 */
exports.sendMailLoanModification = (booking) => {
  // async..await is not allowed in global scope, must use a wrapper
  async function main() {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = getGMailTransport();

    // send mail with defined transport object
    let info = await getMailUserLoanModification(transporter, booking);
  }

  main().catch(console.error);
};

getMailUserLoanModification = async (transporter, booking) => {
  const company = "Infinix";

  const user = await UserController.getUserById(booking.driver);

  const departureSite = await SiteController.getSiteById(
    booking.departure_site
  );

  const arrivalSite = await SiteController.getSiteById(booking.arrival_site);

  //Date de création
  let dateDeCreation = new Date(booking.createdAt);

  let dateDeCreationReservation = dateDeCreation.toLocaleString("fr-FR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  //Date de Début
  let dateDeDebut = new Date(booking.startDate);

  let dateDebutReservation = dateDeDebut.toLocaleString("fr-FR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  //Date de Fin
  let dateDeFin = new Date(booking.endDate);

  let dateFinReservation = dateDeFin.toLocaleString("fr-FR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  d1 = booking.startDate.getTime() / 86400000;
  d2 = booking.endDate.getTime() / 86400000;
  NombreDeJours = new Number(d2 - d1).toFixed(0);

  return transporter.sendMail({
    from: '"Modification de la réservation de véhicule - Infinix - Mail automatique" <infinix.supp@gmail.com>', // sender address
    to: user.email, // list of receivers
    subject: "Modification de la réservation de véhicule - " + company + "", // Subject line
    text: "Modification de la réservation de véhicule - " + company + "", // plain text body
    html: `<b>Bonjour ${user.name} ${user.surname}, </b>
    <p>Votre réservation de véhicule : ${booking.id} a bien été modifiée.</p>
    <p>Déplacement : ${departureSite.label} -> ${arrivalSite.label}</p>
    <p>Période : ${NombreDeJours} jours</p>
        <ul>
            <li>${dateDebutReservation}</li>
            <li>Jusqu'au ${dateFinReservation}</li>
        </ul>
    </p>

    <p>Lien pour aller sur l’application Infinix : www.${company}.fr</p>
    <p>L'équipe ${company} </p>`, // html body
  });
};

/**
 * Mail Reset Password
 */

exports.sendResetPasswordForm = (user, tkn) => {
  console.log(user.email);
  // async..await is not allowed in global scope, must use a wrapper
  async function main() {
    // create reusable transporter object using the default SMTP transport
    let transporter = getGMailTransport();

    // send mail with defined transport object
    let info = await getMailPasswordReset(transporter, user, tkn);

    //let info2 = await getMailAdministrateurVehicleRequest(transporter);

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    //console.log("Message sent: %s", info2.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  }

  main().catch(console.error);
};

getMailPasswordReset = async (transporter, user, tkn) => {
  return transporter.sendMail({
    from: '"Réinitialisation mot de passe - Infinix" <infinix.supp@gmail.com>', // sender address
    to: user.email, // list of receivers
    subject: "Réinitialisation mot de passe", // Subject line
    text: "Réinitialisation mot de passe", // plain text body
    html: `<a href="http://localhost/reset/${user.id}/${tkn}">Réinitiation du mot de passe</a>`, // html body
  });
};
