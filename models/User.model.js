const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, minlength: 8 },
  role: { type: String, enum: ['User', 'Company'], default: 'User' },
  favorites: [{ type: Schema.Types.ObjectId, ref: 'Job' }],
}, {
  timestamps: true,
  versionKey: false
});


const UserModel = model("User", userSchema);

module.exports = UserModel;
