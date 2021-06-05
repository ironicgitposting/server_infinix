const moment = require("moment");
const cron = require("node-cron");

const initRgpdCron = require("./rgpd");

module.exports = () => {
  // 0 2 * * * - Everyday at 2am
  // * * * * * - Every minute
  cron.schedule("* * * * *", () => {
    console.log(
      moment().format("MMMM Do YYYY, h:mm:ss a"),
      ":: STARTING RGPD CRON JOB"
    );
    initRgpdCron(24);
    console.log(
      moment().format("MMMM Do YYYY, h:mm:ss a"),
      ":: FINISHING RGPD CRON JOB"
    );
  });
};
