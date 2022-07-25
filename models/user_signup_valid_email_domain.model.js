const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const user_signup_valid_email_domainSchema = new Schema(
  {
    processing_completed_at: String,
    domain: String,
  },
  {
    collection: "user_signup_valid_email_domains",
  }
);

const user_sugnup_valid_email_domainModel = mongoose.model(
  "user_sugnup_valid_email_domain",
  user_signup_valid_email_domainSchema
);

module.exports = user_sugnup_valid_email_domainModel;
