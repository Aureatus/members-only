const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  user_name: { type: String, required: true },
  given_name: { type: String, required: true },
  family_name: { type: String, required: true },
  password_name: { type: String, required: true },
  membership_status: { type: Boolean, required: true },
});

module.exports = mongoose.model("User", UserSchema);
