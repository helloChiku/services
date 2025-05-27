import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  contact: { type: String , default: '000000000'},
  password: { type: String, required: true },
  profile:{type: String, default: "https://cdn-icons-png.flaticon.com/512/11478/11478365.png"}
}, { timestamps: true });

export const User = mongoose.model('User', userSchema);