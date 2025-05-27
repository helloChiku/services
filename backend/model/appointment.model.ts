import mongoose from 'mongoose';
const appointmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String },
  dateTime: { type: Date, required: true },
  duration: { type: Number, required: true },
 location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number], 
      required: true
    },
    address: {
      type: String, 
    }
  },
}, { timestamps: true });


appointmentSchema.index({ location: '2dsphere' })
export const Appointment = mongoose.model('Appointment', appointmentSchema);