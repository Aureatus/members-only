const { Schema, model } = require("mongoose");

const MessageSchema = new Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  timestamp: { type: Date, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

module.exports = mongoose.model("Message", MessageSchema);
