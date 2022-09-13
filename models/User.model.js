const { Schema, model } = require("mongoose");
const bcrypt = require('bcrypt');
const { ROLES, USER } = require('../const/user.const');
const SALT = +process.env.SALT;

const userSchema = new Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 8 },
  role: { type: String, enum: ROLES, default: USER },
  favorites: [{ type: Schema.Types.ObjectId, ref: 'Job' }],
}, {
  timestamps: true,
  versionKey: false
});


userSchema.pre('save', function (next) {
  if (this.isNew) {
    const genSalt = bcrypt.genSaltSync(SALT);
    const hashPassword = bcrypt.hashSync(this.password, genSalt);
    this.password = hashPassword;
  }
  next();
})

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
}

const UserModel = model("User", userSchema);

module.exports = UserModel;
