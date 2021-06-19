/**
 * Bookings CRON
 *
 * Se charge de mettre à jour l'état des réservations selon leur état actuel et la comparaison
 * de ses dates à la date du jour
 *
 */
const db = require("../../models");
const { Booking } = db.sequelize.models;
module.exports = async () => {
  const bookings = await Booking.findAll();
  bookings.forEach(async (booking) => {
    // Si le status est Validé et que la date du jour se situe entre les dates de début et de fin, on met le status à En cours
    if (booking.status === 4 && new Date(booking.startDate) < new Date() && new Date(booking.endDate) > new Date()) {
      booking.status = 2;
    // Si le status est En cours et que la date du jour est supéreur à la date de fin, on met le status à En retard
    } else if (booking.status === 2 && new Date(booking.endDate) < new Date()) {
      booking.status = 5;
    // Si le status est En attente de validation et que la date du jour se situe entre les dates de début et de fin, on met le status à Annulé
    } else if (booking.status === 1 && new Date(booking.startDate) < new Date() && new Date(booking.endDate) > new Date()) {
      booking.status = 6;
    }
    await booking.save();
  });
};
