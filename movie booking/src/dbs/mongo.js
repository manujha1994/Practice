const mongoose = require("mongoose")
const logger = require('../utilities/logger')(__filename)

class MongoDB {
  constructor(conf) {
    this.conf = conf
  }

  initialize() {
    return new Promise((resolve, reject) => {
      mongoose.connect(`mongodb://${this.conf.db.HOST}:${this.conf.db.PORT}/${this.conf.db.DB}`, {
          useNewUrlParser: true,
          useUnifiedTopology: true
        })
        .then(() => {
          logger.info(`[sample_app][dbs][mongo][successfully][connected_on] ${this.conf.db.HOST}:${this.conf.db.PORT}/${this.conf.db.DB}`);
          resolve();
        })
        .catch(err => {
          logger.error("[sample_app][dbs][mongo][connection_error]", err);
          reject(err);
        })
    })
  }
}

module.exports = MongoDB